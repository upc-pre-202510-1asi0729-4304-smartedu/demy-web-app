/**
 * Represents a payment made by a student.
 * Linked to an invoice and includes metadata such as amount, method, and payment date.
 */
export class Payment {
  /**
   * Unique identifier of the payment (optional).
   */
  id?: string;

  /**
   * ID of the associated invoice, or `null` if not linked.
   */
  invoiceId: number | null;

  /**
   * Date and time when the payment was made.
   */
  paidAt: Date;

  /**
   * Payment method used (e.g., cash, card, transfer).
   */
  method: string;

  /**
   * Amount of money paid.
   */
  amount: number;

  /**
   * Creates a new {@link Payment} instance from a partial object.
   *
   * @param Payment - An object containing optional payment fields such as `id`, `invoiceId`, `paidAt`, `method`, and `amount`.
   */
  constructor(Payment: {id?: string, invoiceId?: number, paidAt?: Date, method?: string, amount?: number}) {
    this.id = Payment.id || '';
    this.invoiceId = Payment.invoiceId || null;
    this.paidAt = Payment.paidAt || new Date();
    this.method = Payment.method || '';
    this.amount = Payment.amount || 0;
  }
}
