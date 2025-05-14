import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {BaseFormComponent} from '../../../shared/components/base-form/base-form.component';
import {Student} from '../../model/student.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-student-create-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatSelectModule,
    TranslatePipe
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
    this.student = new Student({});
  }

  protected resetEditState() {
    this.student = new Student({});
    this.editMode = false;
    this.studentForm.reset()
  }

  private isValid = () => this.studentForm.valid
  protected isEditMode = () => this.editMode

  protected onSubmit(): void {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.studentUpdateRequested : this.studentAddRequested
      emitter.emit(this.student);
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
