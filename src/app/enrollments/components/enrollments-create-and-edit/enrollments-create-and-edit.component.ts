import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { Enrollment } from '../../model/enrollment.entity';
import { AcademicPeriod } from '../../model/academic-period.entity';
import { AcademicPeriodService } from '../../services/academic-period.service';
import { Student } from '../../model/student.entity';
import { StudentService } from '../../services/student.service';
import {WeeklyScheduleService} from '../../../scheduling/services/weekly-schedule.service';
import {ScheduleWeekly} from '../../../scheduling/model/weekly-schedule.entity';
import { TranslatePipe } from "@ngx-translate/core";

/**
 * Component responsible for creating and editing student enrollments.
 * Provides a form interface with validation and emits events for creation, update, and cancellation.
 */
@Component({
  selector: 'app-enrollments-create-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatSelectModule,
    TranslatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './enrollments-create-and-edit.component.html',
  styleUrls: ['./enrollments-create-and-edit.component.css']
})
export class EnrollmentsCreateFormComponent extends BaseFormComponent implements OnInit {

  /** Current enrollment being created or edited */
  @Input() enrollment!: Enrollment;

  /** Indicates whether the component is in edit mode */
  @Input() editMode: boolean = false;

  /** Event emitted when a new enrollment is submitted */
  @Output() protected enrollmentAddRequested = new EventEmitter<Enrollment>();

  /** Event emitted when an existing enrollment is updated */
  @Output() protected enrollmentUpdateRequested = new EventEmitter<Enrollment>();

  /** Event emitted when the user cancels the form operation */
  @Output() protected cancelRequested = new EventEmitter<void>();

  /** Reference to the form object used for validation and resetting */
  @ViewChild('enrollmentForm', { static: false }) enrollmentForm!: NgForm;

  /** List of enrollment status options */
  enrollmentStatusOptions = [
    { value: 'ACTIVE', viewValue: 'enrollment.status.active' },
    { value: 'CANCELLED', viewValue: 'enrollment.status.cancelled' },
    { value: 'COMPLETED', viewValue: 'enrollment.status.completed' }
  ];

  /** List of payment status options */
  paymentStatusOptions = [
    { value: 'PENDING', viewValue: 'enrollment.payment.pending' },
    { value: 'PAID', viewValue: 'enrollment.payment.paid' },
    { value: 'REFUNDED', viewValue: 'enrollment.payment.refunded' }
  ];

  /** List of students to select from */
  studentOptions: Student[] = [];

  /** List of academic periods to select from */
  periodOptions: AcademicPeriod[] = [];

  /**  List of weekly schedules to select from */
  weeklyScheduleOptions: ScheduleWeekly[] = [];

  /**
   * Initializes the component and its dependencies.
   * @param academicPeriodService - Service used to fetch academic periods
   * @param studentService - Service used to fetch students
   * @param  weeklyScheduleService - Service used to fetch students
   */
  constructor(
    private academicPeriodService: AcademicPeriodService,
    private studentService: StudentService,
    private weeklyScheduleService: WeeklyScheduleService
  ) {
    super();
    this.enrollment = new Enrollment({});
  }

  /**
   * Lifecycle hook called on component initialization.
   * Loads academic periods and students for selection.
   */
  ngOnInit(): void {
    this.loadAcademicPeriods();
    this.loadStudents();
    this.loadWeeklySchedules();
  }

  /**
   * Loads academic periods from the service and updates the options.
   */
  private loadAcademicPeriods(): void {
    this.academicPeriodService.getAll().subscribe({
      next: (periods) => this.periodOptions = periods,
      error: (err) => console.error('Error al cargar períodos académicos', err)
    });
  }

  /**
   * Loads students from the service and updates the options.
   */
  private loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (students) => this.studentOptions = students,
      error: (err) => console.error('Error al cargar estudiantes', err)
    });
  }

  private loadWeeklySchedules(): void {
    this.weeklyScheduleService.getAll().subscribe({
      next: (schedules) => this.weeklyScheduleOptions = schedules,
      error: (err)      => console.error('Error al cargar weekly schedules', err)
    });
  }

  /**
   * Resets the form and exits edit mode.
   * Clears the current enrollment data.
   */
  protected resetEditState(): void {
    this.enrollment = new Enrollment({});
    this.editMode = false;
    this.enrollmentForm.resetForm();
  }

  /**
   * Checks whether the current form is valid.
   * @returns `true` if form is valid, otherwise `false`
   */
  private isValid = () => this.enrollmentForm.valid;

  /**
   * Determines if the component is in edit mode.
   * @returns `true` if editing, otherwise `false`
   */
  protected isEditMode = () => this.editMode;

  /**
   * Handles the form submission. Emits an event to create or update enrollment.
   */
  protected onSubmit(): void {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.enrollmentUpdateRequested : this.enrollmentAddRequested;

      emitter.emit(this.enrollment);
      this.resetEditState();
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  /**
   * Handles the cancel action. Emits an event and resets the form state.
   */
  protected onCancel(): void {
    this.cancelRequested.emit();
    this.resetEditState();
  }
}
