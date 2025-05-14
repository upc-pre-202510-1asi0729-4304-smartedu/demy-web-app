export class Payment {
  id?: string;
  invoiceId: string | null;
  paidAt: Date;
  method: string;
  amount: number;

  constructor(Payment: {id?: string, invoiceId?: string, paidAt?: Date, method?: string, amount?: number}) {
    this.id = Payment.id || '';
    this.invoiceId = Payment.invoiceId || null;
    this.paidAt = Payment.paidAt || new Date();
    this.method = Payment.method || '';
    this.amount = Payment.amount || 0;
  }
}
