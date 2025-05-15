import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { AcademicPeriod } from '../model/academic-period.entity';
import { environment } from '../../../environments/environment';

/**
 * API endpoint path for academic period resource, configured via environment.
 */
const academicPeriodResourceEndpointPath = environment.academicPeriodEndpointPath;

/**
 * Service responsible for managing academic period-related HTTP operations.
 * Extends BaseService to provide standard CRUD operations for AcademicPeriod entities.
 *
 * Available operations inherited from BaseService:
 * - GET    /api/academic-periods     - Retrieve all academic periods
 * - GET    /api/academic-periods/:id - Retrieve a specific academic period
 * - POST   /api/academic-periods     - Create a new academic period
 * - PUT    /api/academic-periods/:id - Update an existing academic period
 * - DELETE /api/academic-periods/:id - Delete an academic period
 *
 * @example
 * ```ts
 * constructor(private academicPeriodService: AcademicPeriodService) {}
 *
 * // Fetch all academic periods
 * this.academicPeriodService.getAll().subscribe(periods => {...});
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AcademicPeriodService extends BaseService<AcademicPeriod> {

  /**
   * Initializes the AcademicPeriodService.
   * Sets the resource endpoint used for academic period-related API operations.
   */
  constructor() {
    super();
    this.resourceEndpoint = academicPeriodResourceEndpointPath;
  }
}
