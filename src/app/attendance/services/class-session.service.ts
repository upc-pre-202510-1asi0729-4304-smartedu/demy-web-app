import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { ClassSession } from '../model/class-session.entity';
import { environment } from '../../../environments/environment';

const classSessionsResourceEndpointPath = environment.classSessionsEndpointPath;

/**
 * Service for managing {@link ClassSession} entities through HTTP requests.
 *
 * Inherits basic CRUD functionality from {@link BaseService}, and sets the appropriate resource endpoint.
 * This service is used to save and retrieve class session data from the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class ClassSessionService extends BaseService<ClassSession> {
  constructor() {
    super();
    this.resourceEndpoint = classSessionsResourceEndpointPath;
  }
}
