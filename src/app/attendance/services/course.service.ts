import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course.entity';
import { map, Observable } from 'rxjs';
/**
 * Service responsible for retrieving course data from the backend API.
 * Used by components that require a list of available courses.
 */
@Injectable({ providedIn: 'root' })
export class CourseService {
  /**
   * Base URL for the courses endpoint in the MockAPI backend.
   */
  private readonly apiUrl = 'https://6820406072e59f922ef8198b.mockapi.io/api/v1/courses';
  /**
   * Constructs the service and injects Angular's HttpClient.
   *
   * @param http - Angular HttpClient used to perform HTTP requests.
   */
  constructor(private http: HttpClient) {}
  /**
   * Fetches all courses from the API and maps them to Course instances.
   *
   * @returns An observable that emits an array of Course objects.
   */
  getAll(): Observable<Course[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(Course.fromJson))
    );
  }
}
