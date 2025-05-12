import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {AcademicPeriodRegistrationResource} from './academic-period.response';
import {environment} from '../../../environments/environment';

const academicPeriodResourceEndpointPath = environment.academicPeriodEndpointPath;
@Injectable({
  providedIn: 'root'
})
export class AcademicPeriodService extends BaseService<AcademicPeriodRegistrationResource> {

  constructor() {
    super();
    this.resourceEndpoint = academicPeriodResourceEndpointPath;
  }
}
