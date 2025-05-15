import { AttendanceRecord } from './attendance-record.entity';

/**
 * Represents a class session that holds attendance records for students.
 * Typically used to group attendance data by session date or schedule.
 */
export class ClassSession {
  /**
   * Creates a new ClassSession instance.
   *
   * @param id - The unique identifier for the session
   * @param attendance - An optional array of attendance records for this session (defaults to an empty array).
   * @param createdAt - The creation timestamp of the session (defaults to the current date and time).
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
   * @returns An array of {@link AttendanceRecord} objects.
   */
  getAttendance(): AttendanceRecord[] {
    return this.attendance;
  }

  /**
   * Converts the class session into a plain JSON object.
   * Useful for serialization when saving or sending data to a backend.
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
