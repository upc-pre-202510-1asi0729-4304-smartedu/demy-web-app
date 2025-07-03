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
import {TranslatePipe} from '@ngx-translate/core';
/**
 * Component for displaying a modal to add, edit, or delete a classroom.
 * Provides a form interface for adding or modifying classroom information,
 * as well as a confirmation dialog for deletion.
 */
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
    TranslatePipe
  ],
  templateUrl: './classroom-modal.component.html',
  styleUrls: ['./classroom-modal.component.css']
})
export class ClassroomModalComponent {

  /** Title of the dialog based on the mode (add/edit/delete) */
  dialogTitle?: string;

  /** The classroom object being added or edited */
  classroom: Classroom;

  /** The mode of the dialog - 'add', 'edit', or 'delete' */
  mode: 'add' | 'edit' | 'delete';

  /**
   * Initializes the component based on the dialog data
   * @param dialogRef - Reference to the dialog used to close the dialog when done
   * @param data - The data passed to the dialog, containing mode and classroom information
   */
  constructor(
    public dialogRef: MatDialogRef<ClassroomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.classroom = data.classroom || new Classroom({});

    // Set the dialog title based on the mode
    if (this.mode === 'add') {
      this.dialogTitle = 'Add New Classroom';
    } else if (this.mode === 'edit') {
      this.dialogTitle = 'Edit Classroom';
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
   * Closes the dialog and returns the classroom object for saving or updating
   */
  onSubmit(): void {
    this.dialogRef.close(this.classroom);
  }

  /**
   * Confirms the deletion action and closes the dialog with a true value
   */
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
