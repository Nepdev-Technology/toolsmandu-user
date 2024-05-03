import { generateSignature, generateUUID } from '../generateSingature';
import { fetchKhaltiData } from './fetch';

export interface Order {
  orderId: string;
  productId: number;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
export enum PAYMENT_GATEWAYS {
  ESEWA = 'ESEWA',
  KHALTI = 'KHALTI',
  IME_PAY = 'IMEPAY',
}

interface PaymentProcessor {
  pay(
    amount: number,
    orderId: string,
    productId: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string
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
      order.customerPhone
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
      failure_url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${productId}/verify/${PAYMENT_GATEWAYS.ESEWA}/${orderId}`,
      product_delivery_charge: '0',
      product_service_charge: '0',
      product_code: productCode,
      signature,
      signed_field_names: `total_amount,transaction_uuid,product_code`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${productId}/verify/${PAYMENT_GATEWAYS.ESEWA}/${orderId}`,
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

export class KhaltiPaymentProcessor implements PaymentProcessor {
  async pay(
    amount: number,
    orderId: string,
    productId: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string
  ): Promise<void> {
    const payload = {
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_KHALTI_URL}`,
      headers: {
        Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${productId}/verify/${PAYMENT_GATEWAYS.KHALTI}/${orderId}`,
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
