import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {environment} from '../../../environments/environment';
import {EnrollmentResourceRegistration} from './enrollment.response';


const enrollmentResourceEndpointPath = environment.enrollmentEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService<EnrollmentResourceRegistration> {

  constructor() {
    super()
    this.resourceEndpoint = enrollmentResourceEndpointPath;
  }
}
