import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course.entity';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Service responsible for retrieving course data from the backend API.
 * Used by components that require a list of available courses, such as dropdowns or selection forms.
 */
@Injectable({ providedIn: 'root' })
export class CourseService {
  /**
   * Base URL for the courses endpoint in the MockAPI backend.
   */
  private readonly apiUrl = `${environment.apiBaseUrl}${environment.coursesEndpointPath}`;
  /**
   * Constructs the service and injects Angular's HttpClient.
   *
   * @param http - Angular HttpClient used to perform HTTP requests.
   */
  constructor(private http: HttpClient) {}
  /**
   * Fetches all courses from the API and maps them to {@link Course} instances.
   *
   * @returns An {@link Observable} that emits an array of {@link Course} objects.
   */
  getAll(): Observable<Course[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(Course.fromJson))
    );
  }
}
