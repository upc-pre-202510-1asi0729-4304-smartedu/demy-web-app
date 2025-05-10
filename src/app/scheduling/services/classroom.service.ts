import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Classroom} from "../model/classroom.entity";
import {environment} from '../../../environments/environment';

/**
 * API endpoint path for courses obtained from environment configuration.
 */
const classroomsResourceEndpointPath = environment.classroomsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class ClassroomService extends BaseService<Classroom> {

  /**
   * Initializes the CourseService.
   * Sets up the base URL endpoint for all course-related HTTP requests.
   */
  constructor() {
    super();
    this.resourceEndpoint = classroomsResourceEndpointPath;
  }
}
