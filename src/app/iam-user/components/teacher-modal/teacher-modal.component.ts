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
    MatError
  ],
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.css']
})
export class TeacherModalComponent {
  @ViewChild('teacherForm') teacherForm!: NgForm;

  dialogTitle: string;
  teacher: UserAccount;
  mode: 'add' | 'edit' | 'delete';

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

  onCancel(): void {
    this.dialogRef.close(null);
  }

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

  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
