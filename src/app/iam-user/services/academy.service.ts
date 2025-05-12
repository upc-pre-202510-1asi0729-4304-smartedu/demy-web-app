import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Academy } from '../model/academy.entity';

/**
 * Service responsible for managing academy-related operations.
 * It interacts with the backend API to create, retrieve, and manage academy data.
 *
 * @remarks
 * This service allows the creation of academies, fetching academies for a specific user,
 * and retrieving individual academy details by ID.
 */
@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  private apiUrl = 'http://localhost:3000/academies';

  /**
   * Injects Angular's HttpClient to handle API requests related to academies.
   *
   * @param http - Angular HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Creates a new academy in the backend.
   *
   * @param academy - The Academy object to be created, including academy name, RUC, user ID, and periods
   * @returns An Observable that emits the newly created Academy object
   */
  createAcademy(academy: Academy): Observable<Academy> {
    return this.http.post<Academy>(this.apiUrl, {
      academyName: academy.academyName,
      ruc: academy.ruc,
      userId: academy.userId,
      periods: academy.periods || []
    });
  }

  /**
   * Retrieves all academies associated with a specific user ID.
   *
   * @param userId - The ID of the user whose academies are being retrieved
   * @returns An Observable that emits an array of Academy objects
   */
  getAcademiesByUserId(userId: string): Observable<Academy[]> {
    return this.http.get<Academy[]>(`${this.apiUrl}?userId=${userId}`);
  }

  /**
   * Retrieves a specific academy by its ID.
   *
   * @param id - The ID of the academy to retrieve
   * @returns An Observable that emits the Academy object corresponding to the given ID
   */
  getAcademyById(id: number): Observable<Academy> {
    return this.http.get<Academy>(`${this.apiUrl}/${id}`);
  }
}
