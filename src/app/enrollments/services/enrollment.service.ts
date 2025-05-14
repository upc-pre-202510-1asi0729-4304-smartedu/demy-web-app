import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {environment} from '../../../environments/environment';
import {Enrollment} from '../model/enrollment.entity';

const enrollmentResourceEndpointPath = environment.enrollmentEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService<Enrollment> {

  constructor() {
    super()
    this.resourceEndpoint = enrollmentResourceEndpointPath;
  }

}
