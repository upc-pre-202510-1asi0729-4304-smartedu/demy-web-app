import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CreateInvoiceRequest } from '../../services/invoice.response';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../../shared/services/notification.service';

/**
 * Standalone form component for assigning/creating a new invoice for a student.
 */
@Component({
  standalone: true,
  selector: 'app-invoice-assign',
  templateUrl: './invoice-assign.component.html',
  styleUrl: './invoice-assign.component.css',
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
  ]
})
export class InvoiceAssignComponent {
  private invoiceService = inject(InvoiceService);
  private translate = inject(TranslateService);
  private notification = inject(NotificationService);

  dni = '';
  amount = 0;
  currency = 'PEN';
  dueDate: Date = new Date();

  currencies = ['PEN', 'USD', 'EUR'];

  message = '';

  onSubmit() {
    if (!this.dni.trim()) {
      this.notification.showError(this.translate.instant('common.required-dni'));
      return;
    }

    const request: CreateInvoiceRequest = {
      amount: this.amount,
      currency: this.currency,
      dueDate: this.dueDate.toISOString().split('T')[0]
    };

    this.invoiceService.createInvoice(this.dni.trim(), request).subscribe({
      next: () => {
        this.notification.showSuccess(this.translate.instant('payments.assign.success'));
      },
      error: () => {
        this.notification.showError(this.translate.instant('payments.assign.error'));
      }
    });
  }
}
