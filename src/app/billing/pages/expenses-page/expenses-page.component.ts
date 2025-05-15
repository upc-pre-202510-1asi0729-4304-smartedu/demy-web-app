import {Component, signal} from '@angular/core';
import {FinancialTransactionService} from '../../services/financial-transaction.service';
import {FinancialTransaction, PartyType} from '../../model/financial-transaction.entity';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpenseFormComponent} from '../../components/expense-form/expense-form.component';
import {ExpenseTableComponent} from '../../components/expense-table/expense-table.component';

/**
 * Page component responsible for managing and displaying monthly expenses.
 *
 * Integrates a form to register new expenses and a table to list all
 * transactions of type `EXPENSE` for the current month.
 */
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
  /**
   * Signal that holds the list of financial transactions categorized as expenses
   * for the current month.
   */
  readonly expenses = signal<FinancialTransaction[]>([]);

  /**
   * Initializes the component and loads the current month's expenses.
   *
   * @param transactionService - Service used to retrieve and create transactions.
   */
  constructor(private transactionService: FinancialTransactionService) {
    this.loadCurrentMonthExpenses()
  }

  /**
   * Loads all transactions from the backend, filters those of type `EXPENSE`
   * and belonging to the current month, and updates the `expenses` signal.
   */
  loadCurrentMonthExpenses() {
    this.transactionService.getAll().subscribe((transactions) => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const expensesOfTheMonth = transactions.filter(tx =>
        tx.type === ('EXPENSE') &&
        new Date(tx.date).getMonth() === currentMonth &&
        new Date(tx.date).getFullYear() === currentYear
      );

      this.expenses.set(expensesOfTheMonth);
    });
  }

  /**
   * Handles the registration of a new expense.
   * Constructs a transaction payload based on the form data,
   * sends it to the backend, and reloads the list of expenses.
   *
   * @param expenseData - Object containing `amount`, `category`, `concept`, and `date`.
   */
  handleRegister(expenseData: any) {
    const payload: FinancialTransaction = {
      id: '',
      type: 'EXPENSE',
      source: PartyType.ACADEMY,
      target: PartyType.EXTERNAL,
      category: expenseData.category,
      concept: expenseData.concept,
      date: expenseData.date,
      reference: `TX-${Date.now()}`,
      method: 'CASH',
      amount: expenseData.amount
    };

    this.transactionService.create(payload).subscribe(() => {
      this.loadCurrentMonthExpenses();
    });
  }

}
