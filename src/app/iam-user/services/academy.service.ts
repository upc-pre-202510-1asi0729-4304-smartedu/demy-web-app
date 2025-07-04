import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Academy } from '../model/academy.entity';
import { environment } from '../../../environments/environment';

/**
 * Service responsible for managing academy-related operations.
 *
 * @summary
 * This service interacts with the backend API to perform operations such as creating academies,
 * retrieving academies associated with a user, and fetching a single academy by ID.
 */
@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  /**
   * The base URL for academy-related API endpoints, built from environment variables.
   */
  private apiUrl = `${environment.apiBaseUrl}${environment.academyEndpointPath}`;

  /**
   * Constructs the AcademyService and injects Angular's HttpClient for making HTTP requests.
   *
   * @param http - Angular HttpClient used to send requests to the backend
   */
  constructor(private http: HttpClient) { }

  /**
   * Creates a new academy in the backend system.
   *
   * @summary
   * Sends a POST request to create an academy with provided name, RUC, associated user ID, and optional periods.
   *
   * @param academy - The {@link Academy} object containing the details of the academy to create
   * @returns An Observable that emits the created {@link Academy} object
   */
  createAcademy(academy: Academy): Observable<Academy> {
    return this.http.post<Academy>(this.apiUrl, {
      academy_name: academy.academy_name,
      ruc: academy.ruc,
      userId: academy.userId,
      periods: academy.periods || []
    });
  }

  /**
   * Retrieves all academies associated with a specific user ID.
   *
   * @summary
   * Sends a GET request filtered by user ID to retrieve all academies created by or linked to that user.
   *
   * @param userId - The ID of the user whose academies are being fetched
   * @returns An Observable that emits an array of {@link Academy} objects
   */
  getAcademiesByUserId(userId: string): Observable<Academy[]> {
    return this.http.get<Academy[]>(`${this.apiUrl}?userId=${userId}`);
  }

  /**
   * Retrieves a specific academy by its unique identifier.
   *
   * @summary
   * Sends a GET request to fetch a single academy by its ID.
   *
   * @param id - The unique identifier of the academy
   * @returns An Observable that emits the corresponding {@link Academy} object
   */
  getAcademyById(id: number): Observable<Academy> {
    return this.http.get<Academy>(`${this.apiUrl}/${id}`);
  }
}
