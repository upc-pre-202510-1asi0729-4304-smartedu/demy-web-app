import {Component, signal} from '@angular/core';
import {FinancialTransactionService} from '../../services/financial-transaction.service';
import {FinancialTransaction} from '../../model/financial-transaction.entity';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ExpenseFormComponent} from '../../components/expense-form/expense-form.component';
import {ExpenseTableComponent} from '../../components/expense-table/expense-table.component';
import { NotificationService } from '../../../shared/services/notification.service';


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
    ExpenseTableComponent,
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

  /** All transactions loaded from backend (not filtered) */
  allTransactions: FinancialTransaction[] = [];

  /** Currently selected month (0-11) */
  selectedMonth: number;

  /** Currently selected year (e.g. 2024) */
  selectedYear: number;

  /** Convenience Date object for datepicker input */
  selectedDate: Date;

  /**
   * Initializes the component with current month/year.
   * Loads all financial transactions from the backend.
   */
  constructor(private transactionService: FinancialTransactionService,
              private notificationService: NotificationService,
              private translate: TranslateService) {
    const now = new Date();
    this.selectedMonth = now.getMonth();
    this.selectedYear = now.getFullYear();
    this.selectedDate = new Date(this.selectedYear, this.selectedMonth, 1);

    this.loadAllTransactions();
  }

  /**
   * Loads all transactions from the backend and filters them to the selected month/year.
   */
  loadAllTransactions() {
    this.transactionService.getAll().subscribe((transactions) => {
      this.allTransactions = transactions;
      this.applyDateFilter();
    });
  }

  /**
   * Filters all loaded transactions to the selected month and year.
   */
  applyDateFilter() {
    const filtered = this.allTransactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate.getMonth() === this.selectedMonth && txDate.getFullYear() === this.selectedYear;
    });
    this.expenses.set(filtered);
  }

  /**
   * Handles the selection of month and year from the datepicker.
   *
   * @param normalizedDate - The selected month and year
   * @param datepicker - Reference to the datepicker to close it
   */
  setMonthAndYear(normalizedDate: Date, datepicker: any) {
    this.selectedMonth = normalizedDate.getMonth();
    this.selectedYear = normalizedDate.getFullYear();
    this.selectedDate = new Date(this.selectedYear, this.selectedMonth, 1);
    datepicker.close();

    this.applyDateFilter();
  }

  /**
   * Loads all transactions from the backend, filters those of type `EXPENSE`
   * and belonging to the current month, and updates the `expenses` signal.
   */
  loadCurrentMonthExpenses() {
    this.transactionService.getAll().subscribe((transactions) => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const transactionsOfTheMonth = transactions.filter(tx =>
        new Date(tx.date).getMonth() === currentMonth &&
        new Date(tx.date).getFullYear() === currentYear
      );

      this.expenses.set(transactionsOfTheMonth);
    });
  }

  /**
   * Handles the registration of a new expense from the form.
   * Posts to backend and reloads all transactions.
   *
   * @param expenseData - Data emitted from ExpenseFormComponent
   */
  handleRegister(expenseData: any) {
    const payload = {
      category: expenseData.category,
      concept: expenseData.concept,
      method: expenseData.method,
      currency: expenseData.currency,
      amount: expenseData.amount,
      paidAt: expenseData.date
    };

    this.transactionService.registerExpense(payload).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.translate.instant('finance.notifications.expenseRegistered')
        );
        this.loadAllTransactions();
      },
      error: () => {
        this.notificationService.showError(
          this.translate.instant('finance.notifications.errorRegistering')
        );
      }
    });
  }
}
