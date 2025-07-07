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
 * @summary
 * Supports adding, editing, and deleting teacher accounts.
 * Uses template-driven forms and returns a result upon confirmation.
 *
 * @remarks
 * The `data` injected via Angular Material Dialog determines the mode of operation
 * (`add`, `edit`, or `delete`) and provides optional teacher data for editing or deletion.
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
   * Reference to the form in the template.
   * Used for validation and state inspection.
   */
  @ViewChild('teacherForm') teacherForm!: NgForm;

  /**
   * Dynamic title displayed at the top of the modal.
   * Adjusted based on the modal mode.
   */
  dialogTitle: string;

  /**
   * Teacher account data used in the form.
   * Pre-filled if editing or deleting an existing teacher.
   */
  teacher: UserAccount;

  /**
   * Operation mode of the modal.
   * Determines the layout and available actions.
   * Can be `'add'`, `'edit'`, or `'delete'`.
   */
  mode: 'add' | 'edit' | 'delete';

  /**
   * Constructs a new instance of the {@link TeacherModalComponent}.
   *
   * @param dialogRef - Reference to the open dialog instance.
   * @param data - The injected data including `mode` and optional `teacher` data.
   */
  constructor(
    public dialogRef: MatDialogRef<TeacherModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.teacher = data.teacher || new UserAccount({
      fullName: '',
      email: '',
      passwordHash: '',
      role: Role.TEACHER,
      status: 'INACTIVE'
    });

    this.dialogTitle = this.mode === 'add' ? 'Add Teacher' :
      this.mode === 'edit' ? 'Edit Teacher' :
        'Delete Teacher';
  }

  /**
   * Cancels the modal and closes it without saving any changes.
   */
  onCancel(): void {
    this.dialogRef.close(null);
  }

  /**
   * Handles form submission and closes the modal with formatted teacher data.
   * Only triggered if the form is valid.
   *
   * @remarks
   * Splits the full name into first name and last name for consistency with backend models.
   * Preserves the ID in `edit` mode.
   */
  onSubmit(): void {
    if (this.teacherForm.valid) {
      const [firstName, ...lastParts] = this.teacher.fullName.trim().split(' ');
      const lastName = lastParts.join(' ');

      const result: any = {
        firstName,
        lastName,
        email: this.teacher.email,
        password: this.teacher.passwordHash,
        role: this.teacher.role
      };

      if (this.mode === 'edit') {
        result.id = this.teacher.id;
      }

      console.log("Datos que se envían:", result);
      this.dialogRef.close(result);
    }
  }

  /**
   * Confirms the teacher deletion and closes the modal with a `true` flag.
   * Only used in `delete` mode.
   */
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
