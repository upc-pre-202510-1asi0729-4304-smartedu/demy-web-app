import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttendanceRecord } from '../model/attendance-record.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceRecordService {
  private readonly apiUrl = 'https://6820406072e59f922ef8198b.mockapi.io/api/v1/attendance-record';

  constructor(private http: HttpClient) {}

  save(record: AttendanceRecord): Observable<any> {
    return this.http.post(this.apiUrl, record.toJSON());
  }

  async saveMany(records: AttendanceRecord[]) {
    for (const record of records) {
      try {
        const res = await this.http.post(this.apiUrl, record.toJSON()).toPromise();
        console.log('Guardado correctamente:', res);
      } catch (err) {
        console.error('Error al guardar:', err);
      }
    }
  }


}
