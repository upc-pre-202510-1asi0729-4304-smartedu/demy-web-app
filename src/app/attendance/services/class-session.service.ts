import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassSession } from '../model/class-session.entity';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassSessionService {
  private readonly apiUrl = environment.classSessionsEndpointPath;

  constructor(private http: HttpClient) {}

  /**
   * Creates a new class session with embedded attendance records.
   * @param session The class session to create
   * @returns Observable with the created session
   */
  create(session: ClassSession): Observable<ClassSession> {
    return this.http.post<ClassSession>(this.apiUrl, session);
  }

}

