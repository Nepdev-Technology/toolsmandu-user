import { generateSignature, generateUUID } from '../generateSingature';

export interface Order {
  orderId: string;
  productId: number;
  price: number;
}

interface PaymentProcessor {
  pay(amount: number, orderId: string, productId: number): void;
}

export class Store {
  constructor(public paymentProcessor: PaymentProcessor) {}

  purchaseItem(order: Order): void {
    const amount = order.price;
    this.paymentProcessor.pay(amount, order.orderId, order.productId);
  }
}
export class EsewaPaymentProcessor implements PaymentProcessor {
  async pay(amount: number, orderId: string, productId: number): Promise<void> {
    const productCode = 'EPAYTEST';
    const transactionUuid = generateUUID();

    const signature = generateSignature({
      totalAmount: amount,
      transactionUuid: transactionUuid,
      productCode: productCode,
    });

    const payload = {
      amount: amount.toString(), // Convert amount to string
      failure_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${productId}/verify/${orderId}`,
      product_delivery_charge: '0',
      product_service_charge: '0',
      product_code: productCode,
      signature,
      signed_field_names: `total_amount,transaction_uuid,product_code`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${productId}/verify/${orderId}`,
      tax_amount: '0',
      total_amount: amount.toString(),
      transaction_uuid: transactionUuid,
    };
    const post = (payload: any) => {
      const form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute(
        'action',
        'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
      );

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
