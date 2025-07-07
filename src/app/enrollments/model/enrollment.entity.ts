/**
 * Represents a student enrollment in an academic period.
 */
export class Enrollment {
  /** Enrollment ID */
  id: number;

  /** ID of the student */
  studentId: number;

  /** ID of the academic period */
  academicPeriodId: number;

  /** Name of the weeklyScheduleName */
  weeklyScheduleName: string;

  /** Payment amount */
  amount: number;

  /** Currency of the payment */
  currency: string;

  /** Enrollment status */
  enrollmentStatus: EnrollmentStatus;

  /** Payment status */
  paymentStatus: PaymentStatus;

  /** Creation date */
  // createdAt: Date;

  /**
   * Creates an Enrollment instance.
   *
   * @param enrollment - Partial data to initialize the entity
   */
  constructor(enrollment: {
    id?: number;
    studentId?: number;
    academicPeriodId?: number;
    weeklyScheduleName?: string;
    amount?: number;
    currency?: string;
    enrollmentStatus?: string;
    paymentStatus?: string;
  }) {
    this.id = enrollment.id || 0;
    this.studentId = enrollment.studentId || 0;
    this.academicPeriodId = enrollment.academicPeriodId || 0;
    this.weeklyScheduleName = enrollment.weeklyScheduleName  ?? "";
    this.amount = enrollment.amount || 0;
    this.currency = enrollment.currency ?? 'PEN';
    this.enrollmentStatus = (enrollment.enrollmentStatus as EnrollmentStatus) ?? EnrollmentStatus.ACTIVE;
    this.paymentStatus = (enrollment.paymentStatus as PaymentStatus) ?? PaymentStatus.PAID;
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
