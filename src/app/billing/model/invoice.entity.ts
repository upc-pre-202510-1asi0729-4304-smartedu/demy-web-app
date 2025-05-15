/**
 * Represents an invoice issued to a student.
 * May be linked to a subscription and includes payment status, due date, and total amount.
 */
export class Invoice {
  /**
   * Unique identifier of the invoice.
   */
  id: string;

  /**
   * Optional ID of the related subscription, or `null` if not applicable.
   */
  subscriptionId: number | null;

  /**
   * Total amount to be paid.
   */
  amount: number;

  /**
   * Due date for the payment, or `null` if no deadline is set.
   */
  dueDate: Date | null;

  /**
   * Payment status of the invoice (e.g., pending, paid, overdue).
   */
  status: PaymentStatus;

  /**
   * ID of the student associated with the invoice.
   */
  studentId: string;

  /**
   * Creates a new {@link Invoice} instance from a partial object.
   *
   * @param Invoice - Object containing optional invoice fields such as `id`, `subscriptionId`, `amount`, `dueDate`, `status`, and `studentId`.
   */
  constructor(Invoice: {id?: string, subscriptionId?: number, amount?: number,
    dueDate?: Date, status?: PaymentStatus, studentId?: string}) {
    this.id = Invoice.id || '';
    this.subscriptionId = Invoice.subscriptionId || null;
    this.amount = Invoice.amount || 0;
    this.dueDate = Invoice.dueDate || null;
    this.status = Invoice.status || PaymentStatus.PENDING;
    this.studentId = Invoice.studentId || '';
  }
}

/**
 * Enum representing the status of a payment.
 * Used to indicate whether an invoice has been paid, is pending, or is overdue.
 */
export enum PaymentStatus {
  /**
   * The payment has not been made yet.
   */
  PENDING = 'PENDING',

  /**
   * The invoice has been fully paid.
   */
  PAID = 'PAID',

  /**
   * The invoice has not been paid by the due date.
   */
  OVERDUE = 'OVERDUE'
}
