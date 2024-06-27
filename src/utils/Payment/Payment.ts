import { HttpService } from '@/src/services';
import {
  generateSignature,
  generateSignatureForFonepay,
  generateUUID,
} from '../generateSingature';
import { fetchKhaltiData } from './fetch';

export interface Order {
  orderId: string;
  productId: number;
  slug: string;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
export enum PAYMENT_GATEWAYS {
  ESEWA = 'ESEWA',
  KHALTI = 'KHALTI',
  IME_PAY = 'IMEPAY',
  QR = 'QR',
}

interface PaymentProcessor {
  pay(
    amount: number,
    orderId: string,
    productId: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    slug: string
  ): void;
}

export class Store {
  constructor(public paymentProcessor: PaymentProcessor) {}

  purchaseItem(order: Order): void {
    const amount = order.price;
    this.paymentProcessor.pay(
      amount,
      order.orderId,
      order.productId,
      order.customerName,
      order.customerEmail,
      order.customerPhone,
      order.slug
    );
  }
}
export class EsewaPaymentProcessor implements PaymentProcessor {
  async pay(amount: number, orderId: string, productId: number): Promise<void> {
    const productCode = `${process.env.NEXT_PUBLIC_ESEWA_KEY}`;
    const transactionUuid = generateUUID();

    const signature = generateSignature({
      totalAmount: amount,
      transactionUuid: transactionUuid,
      productCode: productCode,
    });

    const payload = {
      amount: amount.toString(), // Convert amount to string
      failure_url: `${process.env.NEXT_PUBLIC_SITE_URL}/item/${productId}/verify/${PAYMENT_GATEWAYS.ESEWA}/${orderId}`,
      product_delivery_charge: '0',
      product_service_charge: '0',
      product_code: productCode,
      signature,
      signed_field_names: `total_amount,transaction_uuid,product_code`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/item/${productId}/verify/${PAYMENT_GATEWAYS.ESEWA}/${orderId}`,
      tax_amount: '0',
      total_amount: amount.toString(),
      transaction_uuid: transactionUuid,
    };
    const post = (payload: any) => {
      const form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('action', `${process.env.NEXT_PUBLIC_ESEWA_URL}`);

      for (let key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          const hiddenField = document.createElement('input');
          hiddenField.setAttribute('type', 'hidden');
          hiddenField.setAttribute('name', key);
          hiddenField.setAttribute('value', payload[key]);
          form.appendChild(hiddenField);
        }
      }

      document.body.appendChild(form);
      form.submit();
    };

    post(payload);
  }
  catch(error: any) {
    console.error('Error processing payment:', error);
  }
}

export class FonePayPaymentProcessor implements PaymentProcessor {
  async pay(amount: number, orderId: string, productId: number): Promise<void> {
    const productCode = `${process.env.NEXT_PUBLIC_ESEWA_KEY}`;
    const transactionUuid = generateUUID();
    const http = new HttpService();
    const payload = {
      RU: 'from env',
      PID: 'from env',
      PRN: productId,
      AMT: amount,
      CRN: 'NPR',
      DT: '01/27/2024',
      R1: 'Description',
      R2: 'Description 2',
      MD: 'P',
    };
    const signature = generateSignatureForFonepay(payload);
    http
      .get(
        `https://dev-clientapi.fonepay.com/api/merchantRequest?PID=${
          payload.PID
        }&MD=${payload.MD}&AMT=${payload.AMT}&RN=${payload.CRN}&DT=${
          payload.DT
        }&R1=${payload.R1}&R2=${
          payload.R2
        }&DV=${signature}&RU=${`${process.env.NEXT_PUBLIC_SITE_URL}/item/${productId}/verify/${PAYMENT_GATEWAYS.ESEWA}/${orderId}`}`
      )
      .then((response) => console.log(response));
  }
  catch(error: any) {
    console.error('Error processing payment:', error);
  }
}
export class KhaltiPaymentProcessor implements PaymentProcessor {
  async pay(
    amount: number,
    orderId: string,
    productId: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    slug: string
  ): Promise<void> {
    const payload = {
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_KHALTI_URL}`,
      headers: {
        Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/item/${slug}/verify/${PAYMENT_GATEWAYS.KHALTI}/${orderId}`,
        website_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        amount: amount * 100,
        purchase_order_id: orderId,
        purchase_order_name: 'Order Id: ' + orderId,
        customer_info: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
      }),
    };
    await fetchKhaltiData(payload.url, payload);
  }
  catch(error: any) {
    console.error('Error processing payment:', error);
  }
}
