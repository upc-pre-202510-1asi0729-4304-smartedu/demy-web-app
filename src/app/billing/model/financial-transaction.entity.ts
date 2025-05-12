import {Payment} from './payment.entity';

export class FinancialTransaction {
  id: number;
  source: PartyType;
  target: PartyType;
  type: string;
  concept: string;
  date: Date;
  reference: string;
  payment: Payment;

  constructor(financialTransaction: {id?: number, source?: PartyType, target?: PartyType, type?: string,
    concept?: string, date?: Date, reference?: string, payment: Payment } ) {
    this.id = financialTransaction.id || 0;
    this.source = financialTransaction.source || PartyType.ACADEMY;
    this.target = financialTransaction.target || PartyType.ACADEMY;
    this.type = financialTransaction.type || '';
    this.concept = financialTransaction.concept || '';
    this.date = financialTransaction.date || new Date();
    this.reference = financialTransaction.reference || '';
    this.payment = financialTransaction.payment;
  }
}

export enum PartyType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  ACADEMY = 'ACADEMY'
}
