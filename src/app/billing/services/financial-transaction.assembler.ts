import { PaymentAssembler } from './payment.assembler';
import {FinancialTransaction} from '../model/financial-transaction.entity';

export class FinancialTransactionAssembler {
  static toEntityFromResource(resource: any): FinancialTransaction {
    return new FinancialTransaction({
      id: resource.id,
      type: resource.type,
      category: resource.category,
      concept: resource.concept,
      date: new Date(resource.date),
      payment: resource.payment
        ? PaymentAssembler.toEntityFromResource(resource.payment)
        : null
    });
  }
}
