export class Invoice {
  id: string;
  subscriptionId: number | null;
  amount: number;
  dueDate: Date | null;
  status: PaymentStatus;

  constructor(Invoice: {id?: string, subscriptionId?: number, amount?: number,
    dueDate?: Date, status?: PaymentStatus}) {
    this.id = Invoice.id || '';
    this.subscriptionId = Invoice.subscriptionId || null;
    this.amount = Invoice.amount || 0;
    this.dueDate = Invoice.dueDate || null;
    this.status = Invoice.status || PaymentStatus.PENDING;
  }
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}
