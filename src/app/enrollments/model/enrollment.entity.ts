export class Enrollment {
  id: string
  studentId: string;
  periodId: string;
  amount: number;
  enrollmentStatus: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  constructor(id = '', studentId = '', periodId = '', enrollmentStatus = EnrollmentStatus.ACTIVE, amount = 0, paymentStatus = PaymentStatus.PENDING, createdAt = new Date()) {
    this.id = id;
    this.studentId = studentId;
    this.periodId = periodId;
    this.enrollmentStatus = enrollmentStatus;
    this.amount = amount;
    this.paymentStatus = paymentStatus;
    this.createdAt = createdAt
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
