/** import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttendanceRecord } from '../model/attendance-record.entity';
import { Observable } from 'rxjs';

/**
 * Service for managing {@link AttendanceRecord} entities via HTTP requests.
 * Provides methods to save single or multiple attendance records to the backend.
 */
/** @Injectable({ providedIn: 'root' })
export class AttendanceRecordService {
  /**
   * Base URL for the attendance record endpoint in the MockAPI backend.
   */
  /* private readonly apiUrl = 'https://6820406072e59f922ef8198b.mockapi.io/api/v1/attendance-record';

  /**
   * Initializes the service with Angular's HttpClient.
   *
   * @param http - The HttpClient used to send HTTP requests.
   */
 /* constructor(private http: HttpClient) {}

  /**
   * Saves a single attendance record to the backend.
   *
   * @param record - The {@link AttendanceRecord} to be saved.
   * @returns An {@link Observable} of the server response.
   */
  /*save(record: AttendanceRecord): Observable<any> {
    return this.http.post(this.apiUrl, record.toJSON());
  }

  /**
   * Saves multiple attendance records to the backend sequentially.
   * Each record is sent as an individual HTTP POST request.
   * Logs the result of each request to the console.
   *
   * @param records - An array of {@link AttendanceRecord} objects to save.
   * @returns A Promise that resolves when all records have been processed.
   */
 /* async saveMany(records: AttendanceRecord[]) {
    for (const record of records) {
      try {
        const res = await this.http.post(this.apiUrl, record.toJSON()).toPromise();
        console.log('Guardado correctamente:', res);
      } catch (err) {
        console.error('Error al guardar:', err);
      }
    }
  }
}   */
