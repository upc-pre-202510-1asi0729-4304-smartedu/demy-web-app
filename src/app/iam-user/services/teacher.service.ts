import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { UserAccount } from '../model/user.entity';
import { environment } from '../../../environments/environment';

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
  /** Base URL for user-related endpoints */
  private baseUrl = `${environment.apiBaseUrl}${environment.usersEndpointPath}`;
  private teachersUrl = `${this.baseUrl}${environment.teachersPath}`;


  /**
   * Injects Angular's HttpClient for making API requests related to teachers.
   *
   * @param http - Angular HttpClient for handling HTTP requests
   */
  constructor(private http: HttpClient) { }


  /**
   * Retrieves all users with the teacher role from the backend.
   *
   * @returns An Observable that emits an array of {@link UserAccount} objects representing teachers
   */
  getTeachers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.teachersUrl).pipe(
      map((users: UserAccount[]) => users.filter(user => user.role === 'TEACHER'))
    );
  }

  /**
   * Retrieves a teacher's information by their ID.
   *
   * @param id - The ID of the teacher to retrieve
   * @returns An Observable that emits a {@link UserAccount} object representing the teacher
   */
  getTeacherById(id: number): Observable<UserAccount> {
    return this.http.get<{ message: string; user: UserAccount }>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.user)
    );
  }

  /**
   * Creates a new teacher account.
   *
   * @param teacher - An object containing the new teacher's information (first name, last name, email, and password)
   * @returns An Observable that emits the created {@link UserAccount} object
   */
  createTeacher(teacher: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.teachersUrl, teacher);
  }

  /**
   * Updates an existing teacher's information.
   *
   * @param id - The ID of the teacher to update
   * @param teacherData - A partial object containing the updated teacher fields
   * @returns An Observable that emits the updated {@link UserAccount} object
   */
  updateTeacher(id: number, teacherData: Partial<UserAccount>): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.baseUrl}/${id}`, teacherData);
  }

  /**
   * Deletes a teacher from the backend.
   *
   * @param id - The ID of the teacher to delete
   * @returns An Observable that completes when the deletion is successful
   */
  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
