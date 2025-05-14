import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Para el select de sexo
import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import {AcademicPeriod} from '../../model/academic-period.entity';
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
  @Input() academicPeriod!: AcademicPeriod;
  @Input() editMode: boolean = false;
  @Output() protected academicPeriodAddRequested = new EventEmitter<AcademicPeriod>();
  @Output() protected academicPeriodUpdateRequested = new EventEmitter<AcademicPeriod>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('academicPeriodForm', {static: false}) academicPeriodForm!: NgForm;
  constructor() {
    super();
    this.academicPeriod = new AcademicPeriod({});
  }

  protected resetEditState() {
    this.academicPeriod = new AcademicPeriod({});
    this.editMode = false
    this.academicPeriodForm.reset();
  }

  private isValid = () => this.academicPeriodForm.valid
  protected isEditMode = () => this.editMode

  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.academicPeriodUpdateRequested : this.academicPeriodAddRequested;

      if(this.academicPeriod.startDate && this.academicPeriod.endDate){
        // Asegúrate de que la fecha esté en formato ISO
        const startDateObj = new Date(this.academicPeriod.startDate);
        const endDateObj = new Date(this.academicPeriod.endDate);
        if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
          this.academicPeriod.startDate = startDateObj;
          this.academicPeriod.endDate = endDateObj;
        }
      }
      emitter.emit(this.academicPeriod);
      this.resetEditState()
    }
    else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }
}

