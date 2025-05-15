import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { FinancialTransaction } from '../model/financial-transaction.entity';
import { environment } from '../../../environments/environment';

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
}
