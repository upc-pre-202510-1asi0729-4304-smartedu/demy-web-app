import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { ScheduleWeekly } from "../model/weekly-schedule.entity";
import { environment } from '../../../environments/environment';

/**
 * API endpoint path for weekly schedules obtained from environment configuration.
 */
const weeklyScheduleResourceEndpointPath = environment.weeklyScheduleEndpointPath;

/**
 * Service responsible for managing weekly schedule-related HTTP operations.
 * Extends BaseService to provide CRUD operations for ScheduleWeekly entities.
 *
 * Available operations inherited from BaseService:
 * - GET    /api/weekly-schedules     - Retrieve all weekly schedules
 * - GET    /api/weekly-schedules/:id - Retrieve a specific weekly schedule
 * - POST   /api/weekly-schedules     - Create a new weekly schedule
 * - PUT    /api/weekly-schedules/:id - Update an existing weekly schedule
 * - DELETE /api/weekly-schedules/:id - Delete a weekly schedule
 *
 * @example
 * ```typescript
 * constructor(private weeklyScheduleService: WeeklyScheduleService) {}
 *
 * // Get all weekly schedules
 * weeklyScheduleService.getAll().subscribe(schedules => {...});
 */

@Injectable({
  providedIn: 'root'
})
export class WeeklyScheduleService extends BaseService<ScheduleWeekly> {

  /**
   * Initializes the WeeklyScheduleService.
   * Sets up the base URL endpoint for all weekly schedule-related HTTP requests.
   */
  constructor() {
    super();
    this.resourceEndpoint = weeklyScheduleResourceEndpointPath;
  }
}
