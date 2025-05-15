import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {BaseFormComponent} from '../../../shared/components/base-form/base-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Standalone form component used to create and register an expense.
 *
 * Provides form controls for amount, category, concept, and date.
 * Emits the completed form data to the parent component upon confirmation.
 */
@Component({
  selector: 'app-expense-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslatePipe,
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent extends BaseFormComponent {
  /**
   * Event emitted when the user submits a valid expense form.
   * Sends the form value as an object.
   */
  @Output() confirm = new EventEmitter<any>();

  /**
   * Reactive form group for managing expense input fields.
   */
  form: FormGroup;

  /**
   * Predefined categories available for expense classification.
   * Each category includes a `value` and a translation `labelKey`.
   */
  categories = [
    { value: 'Teacher Payment', labelKey: 'finance.category.teachers' },
    { value: 'Materials', labelKey: 'finance.category.materials' },
    { value: 'Services', labelKey: 'finance.category.services' },
    { value: 'Taxes', labelKey: 'finance.category.taxes' },
    { value: 'Maintenance', labelKey: 'finance.category.maintenance' },
    { value: 'Technology', labelKey: 'finance.category.technology' },
    { value: 'Other', labelKey: 'finance.category.others' }
  ];

  /**
   * Initializes the expense form with default validators and a current date.
   *
   * @param fb - FormBuilder service used to create the form group.
   */
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      concept: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  /**
   * Handles form submission. If valid, emits the form data and resets the form.
   * If invalid, marks all fields as touched to trigger validation messages.
   */
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.confirm.emit(this.form.value);
    this.form.reset();
  }
}

