import { Payment } from './payment.entity';

/**
 * Represents a financial transaction in the system.
 * Includes transaction details and associated payment.
 */
export class FinancialTransaction {
  /**
   * Unique identifier of the transaction.
   */
  id: number | null;

  /**
   * General type of transaction (e.g., INCOME, EXPENSE).
   */
  type: string;

  /**
   * Subcategory or classification of the transaction (e.g., tuition, salary, materials).
   */
  category: string;

  /**
   * Short description or label for the transaction's purpose.
   */
  concept: string;

  /**
   * Date on which the transaction was recorded.
   */
  date: Date;

  /**
   * Associated payment details.
   */
  payment?: Payment | null;

  /**
   * Creates a new {@link FinancialTransaction} instance from a partial object.
   *
   * @param financialTransaction - Partial object with optional transaction properties.
   */
  constructor(financialTransaction: {
    id?: number,
    type?: string,
    category?: string,
    concept?: string,
    date?: Date,
    payment?: Payment | null
  }) {
    this.id = financialTransaction.id ?? null;
    this.type = financialTransaction.type ?? '';
    this.category = financialTransaction.category ?? '';
    this.concept = financialTransaction.concept ?? '';
    this.date = financialTransaction.date ?? new Date();
    this.payment = financialTransaction.payment ?? null;
  }
}
