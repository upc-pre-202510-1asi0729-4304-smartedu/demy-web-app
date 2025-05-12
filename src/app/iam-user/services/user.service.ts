import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../model/user.entity';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  registerUser(user: Omit<UserAccount, 'id'>): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.apiUrl, user);
  }

  getUserByEmail(email: string): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(`${this.apiUrl}?email=${email}`);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
