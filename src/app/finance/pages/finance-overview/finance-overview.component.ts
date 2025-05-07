import { Component } from '@angular/core';
import { RecordExpenseComponent } from '../../components/record-expense/record-expense.component';

@Component({
  selector: 'app-finance-overview',
  imports: [
    RecordExpenseComponent
  ],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.css'
})
export class FinanceOverviewComponent {

}
