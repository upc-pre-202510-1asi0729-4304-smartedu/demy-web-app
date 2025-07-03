import { Component, Input, ViewChild, AfterViewInit, WritableSignal, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FinancialTransaction } from '../../model/financial-transaction.entity';
import { TranslatePipe } from '@ngx-translate/core';
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
    this.total.set(this.calculateTotal(value));
  }

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
  readonly displayedColumns = ['date', 'category', 'concept', 'amount'];

  /**
   * Writable signal holding the total amount of all listed expenses.
   */
  readonly total: WritableSignal<number> = signal(0);

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
  private calculateTotal(data: FinancialTransaction[]): number {
    return data.reduce((sum, tx) => sum + (tx.amount || 0), 0);
  }
}
