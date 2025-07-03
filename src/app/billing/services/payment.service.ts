import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Payment } from '../model/payment.entity';
import { environment } from '../../../environments/environment';

const paymentsResourceEndpointPath = environment.paymentsEndpointPath

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
}
