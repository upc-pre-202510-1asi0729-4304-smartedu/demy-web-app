import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


}
