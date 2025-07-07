import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { AcademicPeriod } from '../../model/academic-period.entity';
import { TranslatePipe } from '@ngx-translate/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

/**
 * Component for creating and editing academic periods.
 * Provides a form interface with validation and emitters to notify parent components of actions.
 */
@Component({
  selector: 'app-academic-period-create-and-edit',
  imports: [
    FormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatSelectModule,
    TranslatePipe,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ],
  templateUrl: './academic-period-create-and-edit.component.html',
  styleUrl: './academic-period-create-and-edit.component.css'
})
export class AcademicPeriodCreateFormComponent extends BaseFormComponent {
  /** The academic period object to be created or edited */
  @Input() academicPeriod!: AcademicPeriod;

  /** Indicates whether the form is in edit mode */
  @Input() editMode: boolean = false;

  /** Emits when a new academic period creation is requested */
  @Output() protected academicPeriodAddRequested = new EventEmitter<AcademicPeriod>();

  /** Emits when an academic period update is requested */
  @Output() protected academicPeriodUpdateRequested = new EventEmitter<AcademicPeriod>();

  /** Emits when the form operation is cancelled */
  @Output() protected cancelRequested = new EventEmitter<void>();

  /** Template reference to the academic period form */
  @ViewChild('academicPeriodForm', { static: false }) academicPeriodForm!: NgForm;

  /**
   * Initializes the component and sets a default empty academic period.
   */
  constructor() {
    super();
    this.academicPeriod = new AcademicPeriod({});
  }

  /**
   * Resets the edit state and clears the form.
   * Used after submit or cancel actions.
   */
  protected resetEditState() {
    this.academicPeriod = new AcademicPeriod({});
    this.editMode = false;
    this.academicPeriodForm.resetForm();
  }

  /**
   * Checks if the form is valid.
   * @returns Whether the form is valid
   */
  private isValid = () => this.academicPeriodForm.valid;

  /**
   * Determines if the form is in edit mode.
   * @returns Whether the component is in edit mode
   */
  protected isEditMode = () => this.editMode;

  /**
   * Handles form submission for creating or updating academic periods.
   * Validates date fields and emits the appropriate event based on mode.
   */
  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.academicPeriodUpdateRequested : this.academicPeriodAddRequested;

      if (this.academicPeriod.startDate && this.academicPeriod.endDate) {
        const startDateObj = new Date(this.academicPeriod.startDate);
        const endDateObj = new Date(this.academicPeriod.endDate);
        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
          this.academicPeriod.startDate = startDateObj;
          this.academicPeriod.endDate = endDateObj;
        }
      }

      emitter.emit(this.academicPeriod);
      this.resetEditState();
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  /**
   * Handles the cancel action, emits cancellation event and resets form.
   */
  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }
}
