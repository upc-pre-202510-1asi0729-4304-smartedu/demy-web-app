import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MatLabel,
  MatError
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserAccount } from '../../model/user.entity';
import { Role } from '../../model/role.model';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Modal dialog component for managing teacher-related actions.
 *
 * Supports adding, editing, and deleting teacher accounts.
 * Uses template-driven forms and emits a result upon user confirmation.
 *
 * @remarks
 * The `data` input determines the mode of the modal (`add`, `edit`, or `delete`)
 * and optionally passes existing teacher data.
 */
@Component({
  selector: 'app-teacher-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatLabel,
    MatError,
    TranslatePipe
  ],
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.css']
})
export class TeacherModalComponent {
  /**
   * Reference to the teacher form in the template.
   * Used for validation and access to form state.
   */
  @ViewChild('teacherForm') teacherForm!: NgForm;

  /**
   * Title displayed at the top of the modal.
   * Computed based on the current mode.
   */
  dialogTitle: string;

  /**
   * Teacher account data being created or edited.
   */
  teacher: UserAccount;

  /**
   * Current mode of the modal: `add`, `edit`, or `delete`.
   */
  mode: 'add' | 'edit' | 'delete';

  /**
   * Initializes the modal with data passed via the Angular Material dialog.
   *
   * @param dialogRef - Reference to the open dialog.
   * @param data - Object containing the operation `mode` and optional `teacher` data.
   */
  constructor(
    public dialogRef: MatDialogRef<TeacherModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.teacher = data.teacher || new UserAccount({
      role: Role.TEACHER,
      status: 'INACTIVE'
    });

    this.dialogTitle = this.mode === 'add' ? 'Add Teacher' :
      this.mode === 'edit' ? 'Edit Teacher' :
        'Delete Teacher';
  }

  /**
   * Closes the modal dialog without saving any data.
   */
  onCancel(): void {
    this.dialogRef.close(null);
  }

  /**
   * Submits the form and closes the modal with the teacher data if the form is valid.
   * In `edit` mode, the `id` field is preserved.
   */
  onSubmit(): void {
    if (this.teacherForm.valid) {
      const result = {
        id: this.mode === 'edit' ? this.teacher.id : undefined,
        fullName: this.teacher.fullName,
        email: this.teacher.email,
        passwordHash: this.teacher.passwordHash,
        role: Role.TEACHER,
        status: 'ACTIVE'
      };
      this.dialogRef.close(result);
    }
  }

  /**
   * Confirms the deletion of the teacher and closes the modal with a `true` value.
   * Used in `delete` mode only.
   */
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
