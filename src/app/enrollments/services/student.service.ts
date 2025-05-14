
import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {environment} from '../../../environments/environment';
import {Student} from '../model/student.entity';
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
   * Sets up the base URL endpoint for all course-related HTTP requests.
   */
  constructor() {
    super();
    this.resourceEndpoint = studentsResourceEndpointPath;
  }
}

