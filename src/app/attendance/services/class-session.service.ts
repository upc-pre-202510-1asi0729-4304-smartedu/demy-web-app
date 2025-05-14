import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import {ClassSession} from '../model/class-session.entity';
import {environment} from '../../../environments/environment';

const classSessionsResourceEndpointPath = environment.classSessionsEndpointPath;

/**
 * Service for managing `ClassSession` entities through HTTP requests.
 *
 * Provides methods for saving sessions and retrieving them from a remote API.
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
