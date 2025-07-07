import {Money} from '../../shared/model/money.entity';
import {DateTime} from '../../shared/model/date-time.entity';
import {Currency} from '../../shared/model/currency.entity';

/**
 * Represents an invoice issued to a student.
 * May be linked to a subscription and includes payment status, due date, and total amount.
 */
export class Invoice {
  /**
   * Unique identifier of the invoice.
   */
  id: number;

  /**
   * DNI of the student associated with the invoice.
   */
  dni: string;

  /**
   * Full name of the student.
   */
  name: string;

  /**
   * Total amount to be paid.
   */
  amount: Money;

  /**
   * Due date for the payment, or `null` if no deadline is set.
   */
  dueDate: DateTime;

  /**
   * Payment status of the invoice (e.g., pending, paid, overdue).
   */
  status: PaymentStatus;

  /**
   * Creates a new {@link Invoice} instance from a partial object.
   *
   * @param invoice - Object containing optional invoice fields such as `id`, `subscriptionId`, `amount`, `dueDate`, `status`, and `studentId`.
   */
  constructor(invoice: {id?: number, dni?: string, name?: string, amount?: number, currency?: string,
    dueDate?: string, status?: string}) {
    this.id = invoice.id || 0;
    this.dni = invoice.dni || "";
    this.name = invoice.name || "";
    this.amount = new Money(invoice.amount || 0, new Currency((invoice.currency || "PEN") as any));
    this.dueDate = new DateTime(invoice.dueDate ?? new Date());
    this.status = (invoice.status as PaymentStatus) || PaymentStatus.PENDING;
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
