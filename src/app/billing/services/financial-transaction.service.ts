import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { FinancialTransaction } from '../model/financial-transaction.entity';
import { environment } from '../../../environments/environment';

const financialTransactionsResourceEndpointPath = environment.financialTransactionsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService extends BaseService<FinancialTransaction> {

  constructor() {
    super();
    this.resourceEndpoint = financialTransactionsResourceEndpointPath;
  }
}
