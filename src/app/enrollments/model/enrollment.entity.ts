export class Enrollment {
  id: string
  studentId: string;
  periodId: string;
  amount: number;
  enrollmentStatus: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;

  constructor(enrollment: {id?: string, studentId?:string, periodId?: string, amount?: number, enrollmentStatus?: EnrollmentStatus, paymentStatus?: PaymentStatus, createdAt?: Date}) {
    this.id = enrollment.id || '';
    this.studentId = enrollment.studentId || '';
    this.periodId = enrollment.periodId || '';
    this.amount = enrollment.amount || 0;
    this.enrollmentStatus = enrollment.enrollmentStatus ?? EnrollmentStatus.ACTIVE;
    this.paymentStatus = enrollment.paymentStatus || PaymentStatus.PENDING;
    this.createdAt = enrollment.createdAt || new Date();
  }
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  PARTIAL = 'PARTIAL'
}
