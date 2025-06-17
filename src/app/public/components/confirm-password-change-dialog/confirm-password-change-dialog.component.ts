import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-password-change-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    TranslatePipe,
    MatDialogModule
  ],
  templateUrl: './confirm-password-change-dialog.component.html',
  styleUrls: ['./confirm-password-change-dialog.component.css']
})
export class ConfirmPasswordChangeDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmPasswordChangeDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
