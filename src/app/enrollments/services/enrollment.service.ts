import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../model/enrollment.entity';
import {catchError, Observable, retry} from 'rxjs';

/**
 * API endpoint path for enrollment resource, configured via environment.
 */
const enrollmentResourceEndpointPath = environment.enrollmentEndpointPath;

/**
 * Service responsible for managing enrollment-related HTTP operations.
 * Extends BaseService to provide standard CRUD operations for Enrollment entities.
 *
 * Available operations inherited from BaseService:
 * - GET    /api/enrollments     - Retrieve all enrollments
 * - GET    /api/enrollments/:id - Retrieve a specific enrollment
 * - POST   /api/enrollments     - Create a new enrollment
 * - PUT    /api/enrollments/:id - Update an existing enrollment
 * - DELETE /api/enrollments/:id - Delete an enrollment
 *
 * @example
 * ```ts
 * constructor(private enrollmentService: EnrollmentService) {}
 *
 * // Fetch all enrollments
 * this.enrollmentService.getAll().subscribe(enrollments => {...});
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService<Enrollment> {

  /**
   * Initializes the EnrollmentService.
   * Sets the resource endpoint used for enrollment-related API operations.
   */
  constructor() {
    super();
    this.resourceEndpoint = enrollmentResourceEndpointPath;
  }

  /**
   * @param studentId - the DNI of the student to search for enrollments
   * @returns An observable with the list of enrollments for the student
   */
  public getByStudentId(studentId: number): Observable<Enrollment[]> {
    const url = `${this.resourcePath()}/student/${studentId}`;
    return this.http
      .get<Enrollment[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
