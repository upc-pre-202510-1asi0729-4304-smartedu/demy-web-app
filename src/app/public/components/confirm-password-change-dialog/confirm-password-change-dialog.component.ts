import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

/**
 * Dialog component that confirms the user’s intention to change their password.
 *
 * @summary
 * This modal dialog presents the user with a confirmation message and two actions:
 * confirm (accept) or cancel the password change operation.
 */
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

  /**
   * Constructor for the confirmation dialog.
   *
   * @param dialogRef - Reference to the current open dialog, used to close it with a result.
   */
  constructor(private dialogRef: MatDialogRef<ConfirmPasswordChangeDialogComponent>) {}

  /**
   * Closes the dialog and confirms the action by returning `true`.
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Closes the dialog and cancels the action by returning `false`.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
