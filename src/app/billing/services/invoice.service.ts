import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Invoice } from '../model/invoice.entity';
import { environment } from '../../../environments/environment';
import {catchError, Observable, retry} from 'rxjs';

const invoicesResourceEndpointPath = environment.invoicesEndpointPath;

/**
 * Service for managing {@link Invoice} entities via HTTP operations.
 *
 * Inherits basic CRUD functionality from {@link BaseService},
 * and sets the resource endpoint to the configured invoices path.
 */
@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService<Invoice> {
  /**
   * Initializes the service and sets the API endpoint for invoices.
   */
  constructor() {
    super();
    this.resourceEndpoint = invoicesResourceEndpointPath;
  }

  /**
   * Retrieves all invoices associated with a specific student.
   *
   * Performs a GET request using the `studentId` as a query parameter.
   * Applies automatic retry and centralized error handling.
   *
   * @param studentId - The unique identifier of the student.
   * @returns An {@link Observable} emitting an array of {@link Invoice} objects.
   */
  public getByStudentId(studentId: string): Observable<Invoice[]> {
    const url = `${this.resourcePath()}?studentId=${studentId}`;
    return this.http.get<Invoice[]>(url, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
