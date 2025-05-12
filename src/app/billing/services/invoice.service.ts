import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Invoice } from '../model/invoice.entity';
import { environment } from '../../../environments/environment';
import {catchError, map, Observable, retry} from 'rxjs';

const invoicesResourceEndpointPath = environment.invoicesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService<Invoice> {

  constructor() {
    super();
    this.resourceEndpoint = invoicesResourceEndpointPath;
  }

  public getByStudentId(studentId: string): Observable<Invoice[]> {
    const url = `${this.resourcePath()}?studentId=${studentId}`;
    return this.http.get<Invoice[]>(url, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
      // json-server retorna un array, aunque haya una sola factura
      // así que se toma la primera
      //map(invoices => invoices[0])
    );
  }
}
