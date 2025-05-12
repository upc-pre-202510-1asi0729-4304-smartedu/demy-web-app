import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../model/user.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = `${environment.serverBaseUrl}${environment.teachersEndpointPath}`;

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.baseUrl);
  }

  create(teacher: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.baseUrl, teacher);
  }

  update(id: number, teacher: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.baseUrl}/${id}`, teacher);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
