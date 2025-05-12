import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../model/user.entity';
import { environment } from '../../../environments/environment';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = `${environment.serverBaseUrl}${environment.usersEndpointPath}`;

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(`${this.baseUrl}`);
  }

  createTeacher(teacher: UserAccount): Observable<UserAccount> {
    const teacherData = {
      fullName: teacher.fullName,
      email: teacher.email,
      passwordHash: teacher.passwordHash,
      role: Role.TEACHER,
      status: 'ACTIVE'
    };
    return this.http.post<UserAccount>(this.baseUrl, teacherData);
  }

  updateTeacher(id: number, teacherData: Partial<UserAccount>): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${this.baseUrl}/${id}`, teacherData);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
