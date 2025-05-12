export class Payment {
  invoiceId: number | null;
  paidAt: Date;
  method: string;
  amount: number;

  constructor(Payment: {invoiceId?: number, paidAt?: Date, method?: string, amount?: number}) {
    this.invoiceId = Payment.invoiceId || null;
    this.paidAt = Payment.paidAt || new Date();
    this.method = Payment.method || '';
    this.amount = Payment.amount || 0;
  }
}
