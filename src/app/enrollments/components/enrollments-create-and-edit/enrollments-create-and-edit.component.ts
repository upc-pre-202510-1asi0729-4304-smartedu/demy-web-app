import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import {Enrollment} from '../../model/enrollment.entity';
import {AcademicPeriod} from '../../model/academic-period.entity';
import {AcademicPeriodService} from '../../services/academic-period.service';
import {Student} from '../../model/student.entity';
import { StudentService } from '../../services/student.service';
import {TranslatePipe} from "@ngx-translate/core";

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
    TranslatePipe
  ],
  templateUrl: './enrollments-create-and-edit.component.html',
  styleUrls: ['./enrollments-create-and-edit.component.css']
})

export class EnrollmentsCreateFormComponent extends BaseFormComponent implements OnInit {
  @Input() enrollment!: Enrollment;
  @Input() editMode: boolean = false;
  @Output() protected enrollmentAddRequested = new EventEmitter<Enrollment>();
  @Output() protected enrollmentUpdateRequested = new EventEmitter<Enrollment>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('enrollmentForm', { static: false }) enrollmentForm!: NgForm;

  enrollmentStatusOptions = [
    { value: 'ACTIVE', viewValue: 'Activo' },
    { value: 'CANCELLED', viewValue: 'Cancelado' },
    { value: 'COMPLETED', viewValue: 'Completado' },
    { value: 'DELETED', viewValue: 'Eliminado' }
  ];
  paymentStatusOptions = [
    { value: 'PENDING', viewValue: 'Pendiente' },
    { value: 'PAID', viewValue: 'Pagado' },
    { value: 'REFUNDED', viewValue: 'Reembolsado' },
    { value: 'PARTIAL', viewValue: 'Parcial' }
  ];

  studentOptions: Student[] = []; // Aquí cargarás los estudiantes disponibles
  periodOptions: AcademicPeriod[] = []

  constructor(private academicPeriodService: AcademicPeriodService,
              private studentService: StudentService
  ) {
    super();
    this.enrollment = new Enrollment({});
  }

  ngOnInit(): void {
    this.loadAcademicPeriods();
    this.loadStudents();
  }

  private loadAcademicPeriods(): void {
    this.academicPeriodService.getAll().subscribe({
      next: (periods) => this.periodOptions = periods,
      error: (err) => console.error('Error al cargar períodos académicos', err)
    });
  }

  private loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (students) => this.studentOptions = students,
      error: (err) => console.error('Error al cargar estudiantes', err)
    });
  }

  protected resetEditState() {
    this.enrollment = new Enrollment({});
    this.editMode = false;
    this.enrollmentForm.reset();
  }

  private isValid = () => this.enrollmentForm.valid;
  protected isEditMode = () => this.editMode;

  protected onSubmit(): void {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.enrollmentUpdateRequested : this.enrollmentAddRequested;
      if (this.enrollment.createdAt) {
        const dateObj = new Date(this.enrollment.createdAt);
        if (!isNaN(dateObj.getTime())) {
          this.enrollment.createdAt = dateObj;
        }
      }
      emitter.emit(this.enrollment);
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
