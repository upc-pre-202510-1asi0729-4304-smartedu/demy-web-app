import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Classroom } from '../../model/classroom.entity';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-classroom-modal',
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatLabel,
    MatError,
  ],
  templateUrl: './classroom-modal.component.html',
  styleUrl: './classroom-modal.component.css'
})
export class ClassroomModalComponent  {
  dialogTitle?: string;
  classroom: Classroom;
  mode: 'add' | 'edit' | 'delete';

  constructor(
    public dialogRef: MatDialogRef<ClassroomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.classroom = data.classroom || new Classroom({});

    if (this.mode === 'add') {
      this.dialogTitle = 'Add New Classroom';
    } else if (this.mode === 'edit') {
      this.dialogTitle = 'Edit Classroom';
    } else if (this.mode === 'delete') {
      this.dialogTitle = 'Confirm Deletion';
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.dialogRef.close(this.classroom);
  }

  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
