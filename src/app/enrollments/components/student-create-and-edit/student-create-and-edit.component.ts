import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {BaseFormComponent} from '../../../shared/components/base-form/base-form.component';
import {StudentRegistrationResource} from '../../services/students.response';
@Component({
  selector: 'app-student-create-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatSelectModule
  ],
  templateUrl: './student-create-and-edit.component.html',
  styleUrl: './student-create-and-edit.component.css'
})

export class StudentCreateFormComponent extends BaseFormComponent {
  @Input() studentRegistration!: StudentRegistrationResource;
  @Input() editMode: boolean = false;
  @Output() protected studentAddRequested = new EventEmitter<StudentRegistrationResource>();
  @Output() protected studentUpdateRequested = new EventEmitter<StudentRegistrationResource>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('studentForm', {static: false}) studentForm!: NgForm;

  sexOptions = [
    { value: 'MALE', viewValue: 'Masculino' },
    { value: 'FEMALE', viewValue: 'Femenino' }
  ];
  constructor() {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.studentRegistration = {
      dni: '',
      first_name: '',
      last_name: '',
      sex: 'MALE',
      birth_date: '',
      address: '',
      phone_number: ''
    };
  }

  protected resetEditState() {
    this.initializeForm();
    this.editMode = false;
    this.studentForm.reset()
  }

  private isValid = () => this.studentForm.valid
  protected isEditMode = () => this.editMode

  protected onSubmit(): void {
    if (this.isValid()) {
      // Formatea la fecha si es necesario antes de enviar
      if (this.studentRegistration.birth_date) {
        // Asegúrate de que la fecha esté en formato ISO
        const dateObj = new Date(this.studentRegistration.birth_date);
        if (!isNaN(dateObj.getTime())) {
          this.studentRegistration.birth_date = dateObj.toISOString().split('T')[0];
        }
      }

      // Emite el evento con los datos del estudiante
      this.studentAddRequested.emit({...this.studentRegistration});

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
