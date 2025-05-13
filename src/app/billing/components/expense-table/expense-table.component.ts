import { Component, Input, ViewChild, AfterViewInit, WritableSignal, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FinancialTransaction } from '../../model/financial-transaction.entity';
import { TranslatePipe } from '@ngx-translate/core';
import {DatePipe, DecimalPipe} from '@angular/common';

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
  @Input() set expenses(value: FinancialTransaction[]) {
    this.dataSource.data = value;
    this.total.set(this.calculateTotal(value));
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<FinancialTransaction>();
  readonly displayedColumns = ['date', 'category', 'concept', 'amount'];
  readonly total: WritableSignal<number> = signal(0);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private calculateTotal(data: FinancialTransaction[]): number {
    return data.reduce((sum, tx) => sum + (tx.amount || 0), 0);
  }
}
