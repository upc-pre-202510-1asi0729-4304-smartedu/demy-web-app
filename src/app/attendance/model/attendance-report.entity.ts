/**
 * Represents a single attendance record for a student.
 */
export class AttendanceReport {

  /**
   * Creates an instance of AttendanceReport.
   *
   * @param dni Student's DNI (national ID number).
   * @param studentName Full name of the student.
   * @param status Attendance status (e.g., "Present", "Absent").
   * @param date Date of the attendance record (ISO string).
   */
  constructor(
    public dni: string,
    public studentName: string,
    public status: string,
    public date: string
  ) {}

  get formattedDate(): string {
    return new Date(this.date).toLocaleDateString();
  }
}
/**
 * Represents an attendance report for a specific course session,
 * containing a list of attendance records for students.
 */
export class ClassSessionReport {
/**
 * Creates an instance of ClassSessionReport.
 *
 * @param courseId ID of the course session.
 * @param attendance Array of attendance records for the session.
 */
  constructor(
    public courseId: number,
    public attendance: AttendanceReport[]
  ) {}

}
