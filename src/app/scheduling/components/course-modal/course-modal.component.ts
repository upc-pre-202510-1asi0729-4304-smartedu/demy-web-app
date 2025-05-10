import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Course } from '../../model/course.entity';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-course-modal',
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
    MatError
  ],
  templateUrl: './course-modal.component.html',
  styleUrl: './course-modal.component.css'
})
export class CourseModalComponent {
  dialogTitle?: string;
  course: Course;
  mode: 'add' | 'edit' | 'delete';

  constructor(
    public dialogRef: MatDialogRef<CourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.course = data.course || new Course({});

    if (this.mode === 'add') {
      this.dialogTitle = 'Add New Course';
    } else if (this.mode === 'edit') {
      this.dialogTitle = 'Edit Course';
    } else if (this.mode === 'delete') {
      this.dialogTitle = 'Confirm Deletion';
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.dialogRef.close(this.course);
  }

  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
