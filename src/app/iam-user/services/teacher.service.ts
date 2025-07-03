import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { UserAccount } from '../model/user.entity';
import { environment } from '../../../environments/environment';
import { Role } from '../model/role.model';

/**
 * Service responsible for managing teacher-related operations.
 * It communicates with the backend API to fetch, create, update, and delete teacher data.
 *
 * @remarks
 * This service leverages the `Role.TEACHER` constant to ensure that teachers are
 * assigned the correct role when creating a new teacher account.
 */
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = `${environment.apiBaseUrl}${environment.usersEndpointPath}`; // Usar las variables de entorno


  /**
   * Injects Angular's HttpClient for making API requests related to teachers.
   *
   * @param http - Angular HttpClient for handling HTTP requests
   */
  constructor(private http: HttpClient) { }
  /**
   * Retrieves all teachers from the backend.
   *
   * @returns An Observable that emits an array of UserAccount objects, each representing a teacher
   */

  //Look at this
  getTeachers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(`${this.baseUrl}/teachers`).pipe(
      map((users: UserAccount[]) => users.filter(user => user.role === 'TEACHER'))
    );
  }

  getTeacherById(id: string): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.baseUrl}/${id}`);
  }

  createTeacher(teacher: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${this.baseUrl}/teachers`, teacher);
  }

  /**
   * Updates an existing teacher's information.
   *
   * @param id - The ID of the teacher to update
   * @param teacherData - The updated teacher data to send (partial UserAccount object)
   * @returns An Observable that emits the updated UserAccount object representing the teacher
   */
  updateTeacher(id: number, teacherData: Partial<UserAccount>): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.baseUrl}/${id}`, teacherData);
  }

  /**
   * Deletes a teacher from the backend.
   *
   * @param id - The ID of the teacher to delete
   * @returns An Observable that completes when the teacher has been successfully deleted
   */
  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
