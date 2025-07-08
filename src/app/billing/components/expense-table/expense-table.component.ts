import { Component, Input, ViewChild, AfterViewInit, WritableSignal, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FinancialTransaction } from '../../model/financial-transaction.entity';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {DatePipe, DecimalPipe} from '@angular/common';


/**
 * Standalone component that displays a paginated table of expense transactions.
 *
 * Automatically calculates and displays the total amount of expenses provided via input.
 */
@Component({
  selector: 'app-expense-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    TranslatePipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent implements AfterViewInit {
  /**
   * Sets the list of financial transactions to be displayed in the table.
   * Automatically updates the data source and recalculates the total amount.
   *
   * @param value - Array of {@link FinancialTransaction} representing expenses.
   */
  @Input() set expenses(value: FinancialTransaction[]) {
    this.dataSource.data = value;
    this.calculateTotals(value);
  }

  @Input() currency = 'S/';

  /**
   * Reference to the Angular Material paginator.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Data source for the table, containing the list of expenses.
   */
  dataSource = new MatTableDataSource<FinancialTransaction>();

  /**
   * Column identifiers used in the expense table.
   */
  readonly displayedColumns = ['date', 'type', 'category', 'concept', 'amount', 'paymentMethod'];

  /**
   * Writable signal holding the total amount of all listed expenses.
   */
  readonly total: WritableSignal<number> = signal(0);

  readonly totalIncomePEN = signal(0);

  readonly totalIncomeUSD = signal(0);

  readonly totalExpensePEN = signal(0);

  readonly totalExpenseUSD = signal(0);

  constructor(private translate: TranslateService) {}

  /**
   * Lifecycle hook called after the view has been initialized.
   * Binds the paginator to the data source.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Calculates the total amount of a list of expenses.
   *
   * @param data - Array of {@link FinancialTransaction} items.
   * @returns The total sum of `amount` fields.
   */
  private calculateTotals(data: FinancialTransaction[]): void {
    let incomePEN = 0;
    let incomeUSD = 0;
    let expensePEN = 0;
    let expenseUSD = 0;

    data.forEach(tx => {
      const amount = tx.payment?.amount ?? 0;
      const currency = tx.payment?.currency ?? 'PEN';

      if (tx.type === 'INCOME') {
        if (currency === 'USD') incomeUSD += amount;
        else incomePEN += amount;
      }

      if (tx.type === 'EXPENSE') {
        if (currency === 'USD') expenseUSD += amount;
        else expensePEN += amount;
      }
    });

    this.totalIncomePEN.set(incomePEN);
    this.totalIncomeUSD.set(incomeUSD);
    this.totalExpensePEN.set(expensePEN);
    this.totalExpenseUSD.set(expenseUSD);
  }

  getTranslatedConcept(transaction: FinancialTransaction): string {
    if (
      transaction.concept === 'Paid student invoice' &&
      transaction.category === 'STUDENTS'
    ) {
      return this.translate.instant('finance.concept.paidStudentInvoice');
    }
    return transaction.concept;
  }
}
