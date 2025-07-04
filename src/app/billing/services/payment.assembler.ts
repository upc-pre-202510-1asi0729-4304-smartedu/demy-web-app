import {Payment} from '../model/payment.entity';

export class PaymentAssembler {
  static toEntityFromResource(resource: any): Payment {
    return new Payment({
      id: resource.id,
      invoiceId: resource.invoiceId,
      paidAt: new Date(resource.paidAt),
      method: resource.method,
      amount: resource.amount,
      currency: resource.currency
    });
  }
}
