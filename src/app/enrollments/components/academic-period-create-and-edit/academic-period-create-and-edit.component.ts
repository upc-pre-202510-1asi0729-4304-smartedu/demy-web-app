import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Para el select de sexo
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { AcademicPeriodRegistrationResource } from '../../services/academic-period.response';
@Component({
  selector: 'app-academic-period-create-and-edit',
  imports: [
    FormsModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatSelectModule
  ],
  templateUrl: './academic-period-create-and-edit.component.html',
  styleUrl: './academic-period-create-and-edit.component.css'
})
export class AcademicPeriodCreateFormComponent extends BaseFormComponent{
  @Input() academicPeriodRegistration!: AcademicPeriodRegistrationResource;
  @Input() editMode: boolean = false;
  @Output() protected academicPeriodAddRequested = new EventEmitter<AcademicPeriodRegistrationResource>();
  @Output() protected academicPeriodUpdateRequested = new EventEmitter<AcademicPeriodRegistrationResource>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('academicPeriodForm', {static: false}) academicPeriodForm!: NgForm;
  constructor() {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.academicPeriodRegistration = {
      name: '',
      academy_id: '',
      start_date: '',
      end_date: '',
    };
  }

  protected resetForm() {
    this.initializeForm();
    this.editMode = false
    this.academicPeriodForm.reset();
  }

  private isValid = () => this.academicPeriodForm.valid
  protected isEditMode = () => this.editMode

  protected onSubmit() {
    if (this.isValid()) {
      if(this.academicPeriodRegistration.start_date && this.academicPeriodRegistration.end_date){
        // Asegúrate de que la fecha esté en formato ISO
        const startDateObj = new Date(this.academicPeriodRegistration.start_date);
        const endDateObj = new Date(this.academicPeriodRegistration.end_date);
        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
          this.academicPeriodRegistration.start_date = startDateObj.toISOString().split('T')[0];
          this.academicPeriodRegistration.end_date = endDateObj.toISOString().split('T')[0];
        }
      }
      this.academicPeriodAddRequested.emit({...this.academicPeriodRegistration});

      this.resetForm();
    }
    else{
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetForm();
  }
}

