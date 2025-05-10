import {Student} from './student.entity';

export class Enrollment {
  id?: string
  studentId: string;
  period: string;
  enrollmentStatus: EnrollmentStatus;
  constructor(id = '', studentId = '', period = '', enrollmentStatus = EnrollmentStatus.ACTIVE) {
    this.id = id;
    this.studentId = studentId;
    this.period = period;
    this.enrollmentStatus = enrollmentStatus;
  }
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
}
