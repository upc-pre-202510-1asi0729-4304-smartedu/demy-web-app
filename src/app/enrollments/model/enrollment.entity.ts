import {Student} from './student.entity';
import {AcademicPeriod} from './academic-period.entity';

export class Enrollment {
  id?: string
  student: Student
  studentId: string;
  periodId: string;
  period: AcademicPeriod
  amount: number;
  enrollmentStatus: EnrollmentStatus;
  paymentStatus: PaymentStatus;
  constructor(id = '', student = new Student(), studentId = '', periodId = '', period = new AcademicPeriod(), enrollmentStatus = EnrollmentStatus.ACTIVE, amount = 0, paymentStatus = PaymentStatus.PENDING) {
    this.id = id;
    this.student = student;
    this.studentId = studentId;
    this.periodId = periodId;
    this.period = period;
    this.enrollmentStatus = enrollmentStatus;
    this.amount = amount;
    this.paymentStatus = paymentStatus;
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
