import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { Student } from '../../model/student.entity';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component for creating and editing student information.
 * Provides a form interface with validation and emits events for create, update, and cancel actions.
 */
@Component({
  selector: 'app-student-create-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatSelectModule,
    TranslatePipe,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './student-create-and-edit.component.html',
  styleUrl: './student-create-and-edit.component.css'
})
export class StudentCreateFormComponent extends BaseFormComponent {

  /** The student object to bind the form fields */
  @Input() student!: Student;

  /** Whether the form is in edit mode */
  @Input() editMode: boolean = false;

  /** Event emitted when a new student is created */
  @Output() protected studentAddRequested = new EventEmitter<Student>();

  /** Event emitted when an existing student is updated */
  @Output() protected studentUpdateRequested = new EventEmitter<Student>();

  /** Event emitted when the form is cancelled */
  @Output() protected cancelRequested = new EventEmitter<void>();

  /** Reference to the student form */
  @ViewChild('studentForm', {static: false}) studentForm!: NgForm;

  /** Options for the student's sex */
  sexOptions = [
    {value: 'MALE', viewValue: 'Masculino'},
    {value: 'FEMALE', viewValue: 'Femenino'}
  ];

  /**
   * Initializes a new student instance by default.
   */
  constructor() {
    super();
    this.student = new Student({});
  }

  /**
   * Resets the form state and exits edit mode.
   */
  protected resetEditState(): void {
    this.student = new Student({});
    this.editMode = false;
    this.studentForm.resetForm();
  }

  /**
   * Validates the form.
   * @returns True if the form is valid, false otherwise.
   */
  private isValid = () => this.studentForm.valid;

  /**
   * Determines whether the form is in edit mode.
   * @returns True if editing, false if creating.
   */
  protected isEditMode = () => this.editMode;

  /**
   * Handles form submission, emitting the appropriate event and resetting the form.
   */
  protected onSubmit(): void {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.studentUpdateRequested : this.studentAddRequested;
      emitter.emit(this.student);
      this.resetEditState();
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  /**
   * Handles the cancel action, emitting the cancel event and resetting the form.
   */
  protected onCancel(): void {
    this.cancelRequested.emit();
    this.resetEditState();
  }

}
