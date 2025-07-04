import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Student} from '../../../enrollments/model/student.entity';
import {FormsModule, NgForm} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { Invoice } from '../../model/invoice.entity';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';

/**
 * Standalone form component used to register a payment for a given invoice and student.
 *
 * Validates form inputs and emits payment data to the parent component upon submission.
 */
@Component({
  selector: 'app-payment-registration',
  standalone: true,
  imports: [
    TranslatePipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOption,
    MatSelect,
    NgForOf,
  ],
  templateUrl: './payment-registration.component.html',
  styleUrl: './payment-registration.component.css'
})
export class PaymentRegistrationComponent extends BaseFormComponent {
  /**
   * The student associated with the invoice being paid.
   */
  @Input() student!: Student;

  /**
   * The invoice for which the payment is being registered.
   */
  @Input() invoice!: Invoice;

  /**
   * Event emitted when a payment is successfully registered.
   * Emits an object containing the payment amount and date.
   */
  @Output() paymentRegistered = new EventEmitter<string>();

  /**
   * Template reference to the payment form for validation and reset operations.
   */
  @ViewChild('paymentForm', { static: false }) paymentForm!: NgForm;

  methods = ['CASH', 'CARD', 'TRANSFER', 'WALLET', 'OTHER'];
  selectedMethod = 'CASH';

  /**
   * Handles form submission. Emits the payment data if the form is valid,
   * and resets the form to its initial state.
   */
  onSubmit() {
    if (!this.paymentForm.valid) {
      console.warn('Invalid form');
      return;
    }

    this.paymentRegistered.emit(this.selectedMethod);

    this.paymentForm.resetForm({
      method: 'CASH'
    });
  }
}
