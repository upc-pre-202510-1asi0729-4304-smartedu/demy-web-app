import {Component, signal} from '@angular/core';
import {FinancialTransactionService} from '../../services/financial-transaction.service';
import {FinancialTransaction, PartyType} from '../../model/financial-transaction.entity';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpenseFormComponent} from '../../components/expense-form/expense-form.component';
import {ExpenseTableComponent} from '../../components/expense-table/expense-table.component';

@Component({
  selector: 'app-expenses-page',
  imports: [
    MatCardModule,
    MatDividerModule,
    TranslatePipe,
    ExpenseFormComponent,
    ExpenseTableComponent
  ],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.css'
})
export class ExpensesPageComponent {
  readonly expenses = signal<FinancialTransaction[]>([]);

  constructor(private transactionService: FinancialTransactionService) {
    this.loadCurrentMonthExpenses()
  }

  loadCurrentMonthExpenses() {
    this.transactionService.getAll().subscribe((transactions) => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const expensesOfTheMonth = transactions.filter(tx =>
        tx.type === 'EXPENSE' &&
        new Date(tx.date).getMonth() === currentMonth &&
        new Date(tx.date).getFullYear() === currentYear
      );

      this.expenses.set(expensesOfTheMonth);
    });
  }

  handleRegister(expenseData: any) {
    const payload: FinancialTransaction = {
      id: 0,
      type: 'EXPENSE',
      source: PartyType.ACADEMY,
      target: PartyType.EXTERNAL,
      category: expenseData.category,
      concept: expenseData.concept,
      date: expenseData.date,
      reference: `TX-${Date.now()}`,
      payment: {
        invoiceId: null,
        paidAt: expenseData.date,
        method: 'CASH',
        amount: expenseData.amount
      }
    };

    this.transactionService.create(payload).subscribe(() => {
      this.loadCurrentMonthExpenses();
    });
  }

}
