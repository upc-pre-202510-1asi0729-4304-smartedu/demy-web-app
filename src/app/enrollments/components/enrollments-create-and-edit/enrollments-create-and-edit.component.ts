import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import {EnrollmentRegistrationResource} from '../../services/enrollment.response';
import {AcademicPeriodResource} from '../../services/academic-period.response';
import {StudentResource} from '../../services/students.response';

@Component({
  selector: 'app-enrollments-create-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatSelectModule,
  ],
  templateUrl: './enrollments-create-and-edit.component.html',
  styleUrls: ['./enrollments-create-and-edit.component.css']
})

export class EnrollmentsCreateFormComponent extends BaseFormComponent {
  @Input() enrollmentRegistration!: EnrollmentRegistrationResource;
  @Input() editMode: boolean = false;
  @Output() protected enrollmentAddRequested = new EventEmitter<EnrollmentRegistrationResource>();
  @Output() protected enrollmentUpdateRequested = new EventEmitter<EnrollmentRegistrationResource>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('enrollmentForm', { static: false }) enrollmentForm!: NgForm;

  studentOptions: StudentResource[] = []; // Aquí cargarás los estudiantes disponibles
  periodOptions: AcademicPeriodResource[] = [] // Aquí cargarás los periodos académicos disponibles

  enrollmentStatusOptions = [
    { value: 'ACTIVE', viewValue: 'Activo' },
    { value: 'COMPLETED', viewValue: 'Completado' },
    { value: 'CANCELLED', viewValue: 'Cancelado' },
    { value: 'DELETED', viewValue: 'Eliminado' }
  ];

  paymentStatusOptions = [
    { value: 'PAID', viewValue: 'Pagado' },
    { value: 'PENDING', viewValue: 'Pendiente' },
    { value: 'REFUNDED', viewValue: 'Reembolsado' },
    { value: 'PARTIAL', viewValue: 'Parcial' }
  ];

constructor() {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.enrollmentRegistration = {
      student_id: '',
      period_id: '',
      enrollment_date: '',
      amount: 0,
      status: 'ACTIVE',
      payment_status: 'UNPAID',
      date_created: new Date().toISOString().split('T')[0]
    };
  }

  protected resetEditState() {
    this.initializeForm();
    this.editMode = false;
    this.enrollmentForm.reset();
  }

  private isValid = () => this.enrollmentForm.valid;
  protected isEditMode = () => this.editMode;

  protected onSubmit(): void {
    if (this.isValid()) {
      // Formatea la fecha si es necesario antes de enviar
      if (this.enrollmentRegistration.enrollment_date) {
        // Asegúrate de que la fecha esté en formato ISO
        const dateObj = new Date(this.enrollmentRegistration.enrollment_date);
        if (!isNaN(dateObj.getTime())) {
          this.enrollmentRegistration.enrollment_date = dateObj.toISOString().split('T')[0];
        }
      }

      // Emite el evento con los datos de la inscripción
      this.enrollmentAddRequested.emit({ ...this.enrollmentRegistration });

      // Reinicia el formulario después de enviar
      this.resetEditState();
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  protected onCancel(): void {
    this.cancelRequested.emit();
    this.resetEditState();
  }
}
