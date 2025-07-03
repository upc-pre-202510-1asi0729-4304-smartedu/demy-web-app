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
 * Component for managing teacher-related actions via a modal dialog.
 * It can be used to add, edit, or delete a teacher.
 *
 * @remarks
 * The modal allows creating a new teacher, editing an existing one, or confirming deletion.
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
  @ViewChild('teacherForm') teacherForm!: NgForm;

  dialogTitle: string;
  teacher: UserAccount;
  mode: 'add' | 'edit' | 'delete';

  /**
   * Constructor to initialize the modal with passed data (mode, teacher data).
   *
   * @param dialogRef - Reference to the dialog
   * @param data - Data passed to the dialog (mode, teacher)
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
   * Closes the dialog without saving any changes.
   */
  onCancel(): void {
    this.dialogRef.close(null);
  }

  /**
   * Submits the form and closes the dialog with the teacher data if the form is valid.
   * For 'edit' mode, the teacher ID is also included in the result.
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
   * Confirms the deletion of the teacher and closes the dialog with a 'true' value.
   */
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
