import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Academy } from '../model/academy.entity';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  private apiUrl = 'http://localhost:3000/academies';

  constructor(private http: HttpClient) { }

  createAcademy(academy: Academy): Observable<Academy> {
    return this.http.post<Academy>(this.apiUrl, {
      academyName: academy.academyName,
      ruc: academy.ruc,
      userId: academy.userId,
      periods: academy.periods || []
    });
  }

  getAcademiesByUserId(userId: string): Observable<Academy[]> {
    return this.http.get<Academy[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getAcademyById(id: number): Observable<Academy> {
    return this.http.get<Academy>(`${this.apiUrl}/${id}`);
  }
}
