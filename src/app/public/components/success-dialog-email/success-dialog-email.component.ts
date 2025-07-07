import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Dialog component that displays a translated success or error message related to email actions.
 *
 * @summary
 * This modal is used for displaying feedback to the user after email-based operations such as
 * password reset or email verification.
 */
@Component({
  selector: 'app-success-dialog-email',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './success-dialog-email.component.html',
  styleUrls: ['./success-dialog-email.component.css']
})
export class SuccessDialogEmailComponent {

  /**
   * Constructor for the success dialog component.
   *
   * @param data - Contains the translation key to be displayed in the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { messageKey: string }) {}
}
