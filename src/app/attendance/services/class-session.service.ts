import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassSession } from '../model/class-session.entity';
import { Observable } from 'rxjs';

/**
 * Service for managing `ClassSession` entities through HTTP requests.
 *
 * Provides methods for saving sessions and retrieving them from a remote API.
 */
@Injectable()
export class ClassSessionService {
  /**
   * Base URL for the class sessions endpoint on MockAPI.
   */
  private readonly baseUrl = 'https://6820406072e59f922ef8198b.mockapi.io/api/v1/class-sessions';

  /**
   * Initializes the service with an injected HttpClient.
   * @param http - Angular's HttpClient used to perform HTTP operations
   */
  constructor(private http: HttpClient) {}

  /**
   * Persists a new class session by sending a POST request to the API.
   * Converts the `ClassSession` object to JSON if needed.
   *
   * @param session - The class session to be saved
   * @returns An observable of the HTTP response
   */
  save(session: ClassSession): Observable<any> {
    const payload = session instanceof ClassSession ? session.toJSON() : session;
    console.log('Guardando en MockAPI:', payload);
    return this.http.post(this.baseUrl, payload);
  }

  /**
   * Fetches a single class session by its ID.
   *
   * @param id - The unique identifier of the session to retrieve
   * @returns An observable of the `ClassSession` data
   */
  getById(id: string): Observable<ClassSession> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  /**
   * Retrieves all class sessions from the backend.
   *
   * @returns An observable array of `ClassSession` objects
   */
  getAll(): Observable<ClassSession[]> {
    return this.http.get<ClassSession[]>(this.baseUrl);
  }

}
