/**
 * Represents a payment made by a student.
 * Linked to an invoice and includes metadata such as amount, method, and payment date.
 */
export class Payment {
  /**
   * Unique identifier of the payment.
   */
  id: number | null;

  /**
   * ID of the associated invoice.
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
   * Currency code (e.g., USD, PEN, EUR).
   */
  currency: string;

  /**
   * Creates a new {@link Payment} instance from a partial object.
   *
   * @param Payment - An object containing payment fields such as `id`, `invoiceId`, `paidAt`, `method`, `amount`, `currency`.
   */
  constructor(Payment: {
    id?: number,
    invoiceId?: number,
    paidAt?: Date,
    method?: string,
    amount?: number,
    currency?: string
  }) {
    this.id = Payment.id ?? null;
    this.invoiceId = Payment.invoiceId ?? null;
    this.paidAt = Payment.paidAt ?? new Date();
    this.method = Payment.method ?? '';
    this.amount = Payment.amount ?? 0;
    this.currency = Payment.currency ?? '';
  }
}
