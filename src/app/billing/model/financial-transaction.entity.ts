export class FinancialTransaction {
  id: string;
  source: PartyType;
  target: PartyType;
  type: string;
  category: string;
  concept: string;
  date: Date;
  reference: string;
  paymentId?: string;
  amount: number;
  method: string;

  constructor(financialTransaction: {id?: string, source?: PartyType, target?: PartyType, type?: string,
    category?: string, concept?: string, date?: Date, reference?: string, paymentId?: string, amount?: number, method?: string } ) {
    this.id = financialTransaction.id || '';
    this.source = financialTransaction.source || PartyType.ACADEMY;
    this.target = financialTransaction.target || PartyType.ACADEMY;
    this.type = financialTransaction.type || '';
    this.category = financialTransaction.category || '';
    this.concept = financialTransaction.concept || '';
    this.date = financialTransaction.date || new Date();
    this.reference = financialTransaction.reference || '';
    this.paymentId = financialTransaction.paymentId;
    this.amount = financialTransaction.amount || 0;
    this.method = financialTransaction.method || '';
  }
}

export enum PartyType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  ACADEMY = 'ACADEMY',
  EXTERNAL = 'EXTERNAL'
}
