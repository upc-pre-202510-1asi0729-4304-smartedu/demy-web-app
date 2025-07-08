import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Invoice } from '../model/invoice.entity';
import { InvoiceAssembler } from './invoice.assembler';
import { InvoiceResource, CreateInvoiceRequest } from './invoice.response';
import {catchError, map, Observable, retry} from 'rxjs';

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
    // With our environment set to /api/v1, we don't need further path here
    this.resourceEndpoint = '';
  }

  /**
   * Retrieves all invoices for a given student's DNI.
   *
   * @param dni - The student's DNI.
   */
  public getByDni(dni: string): Observable<Invoice[]> {
    const url = `${this.resourcePath()}/students/${dni}/invoices`;
    return this.http.get<InvoiceResource[]>(url, this.httpOptions).pipe(
      retry(2),
      map(resources => InvoiceAssembler.toEntitiesFromResources(resources)),
      catchError(this.handleError)
    );
  }

  /**
   * Creates a new invoice for a student.
   *
   * @param dni - The student's DNI.
   * @param data - The invoice creation payload.
   */
  public createInvoice(dni: string, data: CreateInvoiceRequest): Observable<Invoice> {
    const url = `${this.resourcePath()}/students/${dni}/invoices`;
    return this.http.post<InvoiceResource>(url, JSON.stringify(data), this.httpOptions).pipe(
      map(resource => InvoiceAssembler.toEntityFromResource(resource)),
      catchError(this.handleError)
    );
  }
}
