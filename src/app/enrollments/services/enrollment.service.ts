import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {environment} from '../../../environments/environment';
import {EnrollmentRegistrationResource} from './enrollment.response';


const enrollmentResourceEndpointPath = environment.enrollmentEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService<EnrollmentRegistrationResource> {

  constructor() {
    super()
    this.resourceEndpoint = enrollmentResourceEndpointPath;
  }

}
