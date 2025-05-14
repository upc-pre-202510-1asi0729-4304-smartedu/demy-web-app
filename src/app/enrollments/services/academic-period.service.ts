import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {AcademicPeriod} from '../model/academic-period.entity';
import {environment} from '../../../environments/environment';

const academicPeriodResourceEndpointPath = environment.academicPeriodEndpointPath;
@Injectable({
  providedIn: 'root'
})
export class AcademicPeriodService extends BaseService<AcademicPeriod> {

  constructor() {
    super();
    this.resourceEndpoint = academicPeriodResourceEndpointPath;
  }
}
