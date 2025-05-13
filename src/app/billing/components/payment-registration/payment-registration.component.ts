import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Student} from '../../../enrollments/model/student.entity';
import {FormsModule, NgForm} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { Invoice } from '../../model/invoice.entity';

@Component({
  selector: 'app-payment-registration',
  imports: [
    TranslatePipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './payment-registration.component.html',
  styleUrl: './payment-registration.component.css'
})
export class PaymentRegistrationComponent extends BaseFormComponent {
  @Input() student!: Student;

  @Input() invoice!: Invoice;

  @Output() paymentRegistered = new EventEmitter<{
    amount: number;
    paidAt: Date;
  }>();

  @ViewChild('paymentForm', { static: false}) paymentForm!: NgForm;

  paidAt: Date = new Date();

  onSubmit() {
    if (!this.paymentForm.valid) {
      console.warn('Invalid form');
      return;
    }
    if (this.paymentForm.valid) {
      this.paymentRegistered.emit({
        amount: this.invoice.amount,
        paidAt: this.paidAt
      });
      this.paymentForm.resetForm({
        amount: 0,
        paidAt: new Date()
      })
    }
  }
}
