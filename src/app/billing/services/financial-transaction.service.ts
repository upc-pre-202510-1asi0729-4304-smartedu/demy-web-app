import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { FinancialTransaction } from '../model/financial-transaction.entity';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { FinancialTransactionAssembler } from './financial-transaction.assembler';

const financialTransactionsResourceEndpointPath = environment.financialTransactionsEndpointPath;

/**
 * Service for managing {@link FinancialTransaction} entities via HTTP operations.
 *
 * Inherits standard CRUD functionality from {@link BaseService} and
 * configures the resource endpoint for financial transaction records.
 */
@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService extends BaseService<FinancialTransaction> {
  /**
   * Initializes the service and sets the API endpoint for financial transactions.
   */
  constructor() {
    super();
    this.resourceEndpoint = financialTransactionsResourceEndpointPath;
  }

  /**
   * Retrieves all financial transactions from the backend,
   * transforming each resource into a FinancialTransaction entity.
   *
   * @returns An Observable array of FinancialTransaction entities.
   */
  override getAll(): Observable<FinancialTransaction[]> {
    return super.getAll().pipe(
      map(resources =>
        resources.map(resource =>
          FinancialTransactionAssembler.toEntityFromResource(resource)
        )
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Registers a payment for a given invoice ID.
   *
   * @param invoiceId - The ID of the invoice.
   * @param method - The payment method.
   * @returns An Observable emitting the created FinancialTransaction.
   */
  registerPayment(invoiceId: number, method: string): Observable<FinancialTransaction> {
    const url = `${this.serverBaseUrl}${financialTransactionsResourceEndpointPath}/invoices/${invoiceId}/payment`;
    const body = { method };

    return this.http.post<any>(url, JSON.stringify(body), this.httpOptions).pipe(
      map(resource => FinancialTransactionAssembler.toEntityFromResource(resource)),
      catchError(this.handleError)
    );
  }

  registerExpense(expense: any): Observable<FinancialTransaction> {
    const url = `${this.serverBaseUrl}${financialTransactionsResourceEndpointPath}/expenses`;
    return this.http.post<FinancialTransaction>(url, JSON.stringify(expense), this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
