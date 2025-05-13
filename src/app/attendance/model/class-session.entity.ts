import { AttendanceRecord } from './attendance-record.entity';

/**
 * Represents a class session that holds attendance records for students.
 */
export class ClassSession {
  /**
   * Creates a new ClassSession instance.
   *
   * @param id - The unique identifier for the session
   * @param attendance - An array of attendance records for this session
   * @param createdAt - The creation timestamp of the session (defaults to now)
   */
  constructor(
    public id: string,
    public attendance: AttendanceRecord[] = [],
    public createdAt: Date = new Date() //
  ) {}
  /**
   * Replaces the existing attendance records with a new set.
   *
   * @param records - The new attendance records to associate with the session
   */
  setAttendance(records: AttendanceRecord[]): void {
    this.attendance = records;
  }
  /**
   * Retrieves the attendance records associated with this session.
   *
   * @returns An array of `AttendanceRecord` objects
   */
  getAttendance(): AttendanceRecord[] {
    return this.attendance;
  }

  /**
   * Converts the class session into a plain JSON object.
   * Useful for serialization when saving or sending to a backend.
   *
   * @returns An object with `id`, `createdAt` (as ISO string), and `attendance` records
   */
  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      attendance: this.attendance.map(a => a.toJSON())
    };
  }
}
