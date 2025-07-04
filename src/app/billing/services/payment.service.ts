import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Payment } from '../model/payment.entity';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable } from 'rxjs';

const paymentsResourceEndpointPath = environment.paymentsEndpointPath;
const financialTransactionsResourceEndpointPath = environment.financialTransactionsEndpointPath;

/**
 * Service for managing {@link Payment} entities via HTTP operations.
 *
 * Inherits standard CRUD functionality from {@link BaseService},
 * and sets the resource endpoint to the configured payments path.
 */
@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService<Payment> {
  /**
   * Initializes the service and sets the API endpoint for payments.
   */
  constructor() {
    super();
    this.resourceEndpoint = paymentsResourceEndpointPath;
  }

  /**
   * Registers a payment for a given invoice ID.
   * @param invoiceId - The ID of the invoice.
   * @param method - The payment method used.
   * @returns An Observable emitting the created Payment.
   */
  registerPayment(invoiceId: number, method: string): Observable<Payment> {
    const url = `${this.serverBaseUrl}${financialTransactionsResourceEndpointPath}/invoices/${invoiceId}/payment`;
    const body = { method };

    return this.http.post<any>(url, JSON.stringify(body), this.httpOptions).pipe(
      map(resource => {
        if (!resource || !resource.payment) {
          throw new Error('Payment data missing in response');
        }
        return new Payment({
          id: resource.payment.id,
          invoiceId: resource.payment.invoiceId,
          amount: resource.payment.amount,
          currency: resource.payment.currency,
          method: resource.payment.method,
          paidAt: new Date(resource.payment.paidAt)
        });
      }),
      catchError(this.handleError)
    );
  }
}
