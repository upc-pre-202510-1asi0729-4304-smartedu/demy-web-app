import { AttendanceRecord } from './attendance-record.entity';

/**
 * Represents a class session with embedded attendance records.
 */
export class ClassSession {
  /**
   * Creates a new ClassSession instance.
   *
   * @param courseId - ID of the course associated with this session.
   * @param date - Date of the session in ISO string (yyyy-MM-dd).
   * @param attendance - Array of attendance records.
   * @param id - Optional unique identifier assigned by backend.
   */
  constructor(
    public courseId: number,
    public date: string,
    public attendance: AttendanceRecord[] = [],
    public id?: number
  ) {}

  /**
   * Converts the class session into a plain JSON object.
   * Useful for serialization when sending data to the backend.
   *
   * @returns An object with `courseId`, `date`, `attendance` and optional `id`.
   */
  toJSON() {
    return {
      courseId: this.courseId,
      date: this.date,
      attendance: this.attendance.map(a => a.toJSON()),
      ...(this.id !== undefined && { id: this.id })
    };
  }
}
