import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StudentService } from '../../enrollments/services/student.service'; //
import { Student } from '../../enrollments/model/student.entity';
/**
 * Represents a student prepared for attendance tracking.
 */
export class AttendanceStudent {
  constructor(
    /**
     * Creates a new instance of AttendanceStudent.
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
 */
@Injectable({ providedIn: 'root' })
export class AttendanceStudentService {
  /**
   * Injects the StudentService used to fetch student data.
   * @param studentService - Service for fetching raw student entities.
   */
  constructor(private studentService: StudentService) {}
  /**
   * Retrieves all students and maps them into AttendanceStudent instances
   * with default attendance status set to false.
   *
   * @returns An observable stream of AttendanceStudent array.
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
