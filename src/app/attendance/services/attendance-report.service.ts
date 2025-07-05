import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassSessionReport } from '../model/attendance-report.entity';
import { environment } from '../../../environments/environment';


/**
 * Service responsible for fetching attendance report data from the backend API.
 * Provides methods to retrieve attendance reports filtered by student DNI, course ID, and date range.
 *
 * @example
 * constructor(private attendanceReportService: AttendanceReportService) {}
 *
 * this.attendanceReportService.getReport('12345678', 1, '2024-01-01', '2024-01-31')
 *   .subscribe(report => console.log(report));
 */
@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {

  private readonly apiUrl = environment.attendanceReportEndpointPath;

  constructor(private http: HttpClient) { }
  /**
   * Retrieves an attendance report for a specific student, course, and date range.
   *
   * @param dni Student DNI (national ID number).
   * @param courseId ID of the selected course.
   * @param startDate Start date of the report range (YYYY-MM-DD).
   * @param endDate End date of the report range (YYYY-MM-DD).
   * @returns An Observable emitting the attendance report data.
   */
  getReport(dni: string, courseId: number, startDate: string, endDate: string): Observable<ClassSessionReport> {
    const params = new HttpParams()
      .set('dni', dni)
      .set('courseId', courseId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<ClassSessionReport>(this.apiUrl, { params });
  }
}
