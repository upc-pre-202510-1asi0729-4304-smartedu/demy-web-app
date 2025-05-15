/**
 * Represents a financial transaction in the system.
 * Used to track money flow between entities (e.g., student to academy, academy to teacher).
 */
export class FinancialTransaction {
  /**
   * Unique identifier of the transaction.
   */
  id: string;

  /**
   * Entity initiating the transaction (e.g., student, academy).
   */
  source: PartyType;

  /**
   * Entity receiving the transaction (e.g., academy, teacher).
   */
  target: PartyType;

  /**
   * General type of transaction (e.g., income, expense, refund).
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
   * External or internal reference for identifying the transaction (e.g., receipt number).
   */
  reference: string;

  /**
   * Optional ID of the associated payment, if any.
   */
  paymentId?: string;

  /**
   * Total amount of money involved in the transaction.
   */
  amount: number;

  /**
   * Payment method used (e.g., cash, card, bank transfer).
   */
  method: string;

  /**
   * Creates a new {@link FinancialTransaction} instance from a partial object.
   *
   * @param financialTransaction - Partial object with optional transaction properties.
   */
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

/**
 * Enum representing types of entities involved in financial transactions.
 */
export enum PartyType {
  /**
   * A student involved in the transaction.
   */
  STUDENT = 'STUDENT',

  /**
   * A teacher involved in the transaction.
   */
  TEACHER = 'TEACHER',

  /**
   * An administrative staff member involved in the transaction.
   */
  ADMIN = 'ADMIN',

  /**
   * The academy or institution itself.
   */
  ACADEMY = 'ACADEMY',

  /**
   * An external party (e.g., supplier, third-party payer).
   */
  EXTERNAL = 'EXTERNAL'
}
