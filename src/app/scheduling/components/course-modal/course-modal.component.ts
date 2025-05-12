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

/**
 * Component for displaying a modal to add, edit, or delete a course.
 * Provides a form interface for adding or modifying course information,
 * as well as a confirmation dialog for deletion.
 */
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
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent {

  /** Title of the dialog based on the mode (add/edit/delete) */
  dialogTitle?: string;

  /** The course object being added or edited */
  course: Course;

  /** The mode of the dialog - 'add', 'edit', or 'delete' */
  mode: 'add' | 'edit' | 'delete';

  /**
   * Initializes the component based on the dialog data
   * @param dialogRef - Reference to the dialog used to close the dialog when done
   * @param data - The data passed to the dialog, containing mode and course information
   */
  constructor(
    public dialogRef: MatDialogRef<CourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.course = data.course || new Course({});

    // Set the dialog title based on the mode
    if (this.mode === 'add') {
      this.dialogTitle = 'Add New Course';
    } else if (this.mode === 'edit') {
      this.dialogTitle = 'Edit Course';
    } else if (this.mode === 'delete') {
      this.dialogTitle = 'Confirm Deletion';
    }
  }

  /**
   * Closes the dialog without saving or making any changes
   */
  onCancel(): void {
    this.dialogRef.close(null);
  }

  /**
   * Closes the dialog and returns the course object for saving or updating
   */
  onSubmit(): void {
    this.dialogRef.close(this.course);
  }

  /**
   * Confirms the deletion action and closes the dialog with a true value
   */
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
