import { AttendanceStatus } from './attendance-status.enum';

/**
 * Represents a single attendance record for a student.
 * Contains the student's identifier and their attendance status in a given session.
 */
export class AttendanceRecord {
  /**
   * Creates an instance of AttendanceRecord.
   *
   * @param studentId - The unique identifier of the student
   * @param status - The attendance status (e.g., PRESENT, ABSENT). Defaults to {@link AttendanceStatus.ABSENT}.
   */
  constructor(
    public readonly studentId: string,
    public status: AttendanceStatus = AttendanceStatus.ABSENT
  ) {}
  /**
   * Converts the attendance record to a plain JSON object.
   * Useful for serialization before sending data to an API.
   *
   * @returns An object with `studentId` and `status` properties
   */

  toJSON(): any {
    return {
      studentId: this.studentId,
      status: this.status
    };
  }
}

