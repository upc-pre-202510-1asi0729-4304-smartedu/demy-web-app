import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Course} from "../model/course.entity";
import {environment} from '../../../environments/environment';

/**
 * API endpoint path for courses obtained from environment configuration.
 */
const coursesResourceEndpointPath = environment.coursesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {

  /**
   * Initializes the CourseService.
   * Sets up the base URL endpoint for all course-related HTTP requests.
   */
  constructor() {
    super();
    this.resourceEndpoint = coursesResourceEndpointPath;
  }
}
