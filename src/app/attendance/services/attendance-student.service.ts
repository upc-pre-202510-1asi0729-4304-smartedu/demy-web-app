import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StudentService } from '../../enrollments/services/student.service'; //
import { Student } from '../../enrollments/model/student.entity';

/**
 * Represents a student prepared for attendance tracking.
 * This model is used to display student information in attendance interfaces,
 * including name, ID, and default attendance status.
 */
export class AttendanceStudent {
  constructor(
    /**
     * Creates a new instance of AttendanceStudent.
     *
     * @param id - Unique identifier of the student.
     * @param dni - National ID number of the student.
     * @param name - Full name of the student.
     * @param attended - Attendance status. Defaults to `false`.
     */
    public id: string,
    public dni: string,
    public name: string,
    public attended: boolean = false
  ) {}
}

/**
 * Service responsible for retrieving student data adapted for attendance tracking.
 * Fetches raw students from {@link StudentService} and maps them into {@link AttendanceStudent} objects.
 */
@Injectable({ providedIn: 'root' })
export class AttendanceStudentService {
  /**
   * Initializes the service with a reference to {@link StudentService}.
   *
   * @param studentService - Service for fetching raw student entities.
   */
  constructor(private studentService: StudentService) {}

  /**
   * Retrieves all students and maps them into {@link AttendanceStudent} instances
   * with attendance status set to `false` by default.
   *
   * @returns An {@link Observable} emitting an array of {@link AttendanceStudent} objects.
   */
  getForAttendance(): Observable<AttendanceStudent[]> {
    return this.studentService.getAll().pipe(
      map(students => students.map(s => ({
        id: s.id,
        dni: s.dni,
        name: `${s.firstName} ${s.lastName}`,
        attended: false
      })))
    );
  }
}
