import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Student} from '../model/student.entity';
import {environment} from '../../../environments/environment';
import {catchError, Observable, retry} from 'rxjs';

/**
 * API endpoint path for students obtained from environment configuration.
 */
const studentsResourceEndpointPath = environment.studentsEndpointPath;

/**
 * Service responsible for managing course-related HTTP operations.
 * Extends BaseService to provide CRUD operations for Student entities.
 *
 * Available operations inherited from BaseService:
 * - GET    /api/students     - Retrieve all students
 * - GET    /api/students/:id - Retrieve a specific student
 * - POST   /api/students     - Create a new student
 * - PUT    /api/students/:id - Update an existing student
 * - DELETE /api/students/:id - Delete a student
 *
 * @example
 * ```typescript
 * constructor(private studentService: StudentService) {}
 *
 * // Get all courses
 * studentService.getAll().subscribe(students => {...});
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService<Student> {

  /**
   * Initializes the StudentService.
   * Service responsible for managing student-related HTTP operations.
   */
  constructor() {
    super();
    this.resourceEndpoint = studentsResourceEndpointPath;
  }

  public getByDni(dni: string): Observable<Student[]> {
    const url = `${this.resourcePath()}?dni=${dni}`;
    return this.http.get<Student[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
