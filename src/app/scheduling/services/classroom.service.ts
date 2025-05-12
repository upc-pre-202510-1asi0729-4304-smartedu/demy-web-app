import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { Classroom } from "../model/classroom.entity";
import { environment } from '../../../environments/environment';

/**
 * API endpoint path for classrooms obtained from environment configuration.
 */
const classroomsResourceEndpointPath = environment.classroomsEndpointPath;

/**
 * Service responsible for managing classroom-related HTTP operations.
 * Extends BaseService to provide CRUD operations for Classroom entities.
 *
 * Available operations inherited from BaseService:
 * - GET    /api/classrooms      - Retrieve all classrooms
 * - GET    /api/classrooms/:id  - Retrieve a specific classroom
 * - POST   /api/classrooms      - Create a new classroom
 * - PUT    /api/classrooms/:id  - Update an existing classroom
 * - DELETE /api/classrooms/:id  - Delete a classroom
 *
 * @example
 * ```typescript
 * constructor(private classroomService: ClassroomService) {}
 *
 * // Get all classrooms
 * classroomService.getAll().subscribe(classrooms => {...});
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ClassroomService extends BaseService<Classroom> {

  /**
   * Initializes the ClassroomService.
   * Sets up the base URL endpoint for all classroom-related HTTP requests.
   */
  constructor() {
    super();
    this.resourceEndpoint = classroomsResourceEndpointPath;
  }
}
