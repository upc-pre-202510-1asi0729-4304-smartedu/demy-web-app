/**
 * Represents a student enrollment in an academic period.
 */
export class Enrollment {
  /** Enrollment ID */
  id: string;

  /** ID of the student */
  studentId: string;

  /** ID of the academic period */
  periodId: string;

  /** Payment amount */
  amount: number;

  /** Enrollment status */
  enrollmentStatus: EnrollmentStatus;

  /** Payment status */
  paymentStatus: PaymentStatus;

  /** Creation date */
  createdAt: Date;

  /**
   * Creates an Enrollment instance.
   *
   * @param enrollment - Partial data to initialize the entity
   */
  constructor(enrollment: {
    id?: string;
    studentId?: string;
    periodId?: string;
    amount?: number;
    enrollmentStatus?: EnrollmentStatus;
    paymentStatus?: PaymentStatus;
    createdAt?: Date;
  }) {
    this.id = enrollment.id || '';
    this.studentId = enrollment.studentId || '';
    this.periodId = enrollment.periodId || '';
    this.amount = enrollment.amount || 0;
    this.enrollmentStatus = enrollment.enrollmentStatus ?? EnrollmentStatus.ACTIVE;
    this.paymentStatus = enrollment.paymentStatus || PaymentStatus.PENDING;
    this.createdAt = enrollment.createdAt || new Date();
  }
}

/**
 * Status of an enrollment.
 */
export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED'
}

/**
 * Status of a payment.
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  PARTIAL = 'PARTIAL'
}
