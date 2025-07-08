import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { UserService } from '../../../iam-user/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogEmailComponent } from '../../components/success-dialog-email/success-dialog-email.component';
import { NotificationService } from '../../../shared/services/notification.service';


/**
 * Component for resetting a user's password.
 *
 * @summary
 * Allows users to reset their password by providing an email and a new password.
 * Validates required fields and displays success or error messages using a dialog.
 */
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  /**
   * User's email address input.
   */
  email: string = '';

  /**
   * New password input to be set for the account.
   */
  newPassword: string = '';

  private notification = inject(NotificationService);
  private translate = inject(TranslateService);

  /**
   * Initializes the component with injected services.
   *
   * @param router - Router service for navigation.
   * @param userService - Service handling user-related API requests.
   * @param dialog - Angular Material dialog service for feedback modals.
   */
  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  /**
   * Handles password reset operation.
   * Validates input, calls the service, and shows feedback to the user.
   */
  resetPassword(): void {
    if (!this.email || !this.newPassword) {
      this.notification.showError(this.translate.instant('reset-password.missing-fields'));
      return;
    }

    this.userService.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.notification.showSuccess(this.translate.instant('reset-password.success'));
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const fallback = this.translate.instant('reset-password.error');
        const msg = err?.error?.message ?? fallback;
        this.notification.showError(msg);
      }
    });
  }

  /**
   * Navigates the user back to the login page.
   */
  goBack(): void {
    this.router.navigate(['/login']);
  }
}

