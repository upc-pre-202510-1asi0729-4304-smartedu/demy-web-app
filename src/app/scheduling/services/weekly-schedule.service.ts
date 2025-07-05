import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { ScheduleWeekly } from "../model/weekly-schedule.entity";
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Schedule} from '../model/schedule.entity';

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

  /**
   * Adds a schedule to a specific WeeklySchedule
   * POST /api/v1/weekly-schedules/{weeklyScheduleId}/schedules
   * @param weeklyScheduleId The ID of the WeeklySchedule
   * @param scheduleData The schedule data to be added
   * @returns Observable of the updated weekly schedule
   */
  addScheduleToWeeklySchedule(weeklyScheduleId: number, scheduleData: any): Observable<ScheduleWeekly> {
    return this.http.post<ScheduleWeekly>(
      `${this.resourcePath()}/${weeklyScheduleId}/schedules`,
      scheduleData,
      this.httpOptions
    );
  }

  /**
   * Removes a schedule from a weekly schedule
   * DELETE /api/v1/weekly-schedules/{weeklyScheduleId}/schedules/{scheduleId}
   * @param weeklyScheduleId - The ID of the weekly schedule
   * @param scheduleId - The ID of the schedule to remove
   * @returns Observable of the operation result
   */
  removeScheduleFromWeeklySchedule(weeklyScheduleId: number, scheduleId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.resourcePath()}/${weeklyScheduleId}/schedules/${scheduleId}`,
      this.httpOptions
    );
  }

  /**
   * Updates only the name of an existing weekly schedule
   * PUT /api/v1/weekly-schedules/{weeklyScheduleId}
   * @param weeklyScheduleId - The ID of the weekly schedule to update
   * @param data - The updated name
   * @returns Observable of the updated weekly schedule
   */
  updateName(weeklyScheduleId: number, data: { name: string }): Observable<any> {
    return this.http.put<any>(
      `${this.resourcePath()}/${weeklyScheduleId}`,
      data,
      this.httpOptions
    );
  }

  /**
   * Updates a specific schedule
   * PUT /api/v1/weekly-schedules/schedules/{scheduleId}
   * @param scheduleId - The ID of the schedule to update
   * @param scheduleData - The schedule data to update
   * @returns Observable of the updated schedule
   */
  updateSchedule(scheduleId: number, scheduleData: {
    classroomId: number;
    startTime: string;
    endTime: string;
    dayOfWeek: string;
  }): Observable<any> {
    return this.http.put<any>(
      `${this.serverBaseUrl}/weekly-schedules/schedules/${scheduleId}`,
      scheduleData,
      this.httpOptions
    );
  }

  /**
   * Retrieves weekly schedules for a specific teacher.
   *
   * @param teacherId - The ID of the teacher to get schedules for
   * @returns An Observable that emits an array of weekly schedules for the teacher
   */
  getSchedulesByTeacherId(teacherId: number): Observable<any[]> {
    return this.http.get<Schedule[]>(`${environment.apiBaseUrl}/weekly-schedules/by-teacher/${teacherId}`);
  }

}
