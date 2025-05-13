import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {BaseFormComponent} from '../../../shared/components/base-form/base-form.component';
import {Student, Sex} from '../../model/student.entity';
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
  @Input() student!: Student;
  @Input() editMode: boolean = false;
  @Output() protected studentAddRequested = new EventEmitter<Student>();
  @Output() protected studentUpdateRequested = new EventEmitter<Student>();
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
    this.student = new Student(
      '',
      '',
      '',
      '',
      Sex.MALE,
      new Date(),
      '',
      ''
    );
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
      // Emite el evento con la entidad del estudiante
      if (this.editMode) {
        this.studentUpdateRequested.emit({...this.student});
      } else {
        this.studentAddRequested.emit({...this.student});
      }

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
