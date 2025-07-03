import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { UserService } from '../../../iam-user/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogEmailComponent } from '../../components/success-dialog-email/success-dialog-email.component';

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
  email: string = '';
  newPassword: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  resetPassword(): void {
    if (!this.email || !this.newPassword) {
      this.dialog.open(SuccessDialogEmailComponent, {
        data: { messageKey: 'reset-password.missing-fields' }
      });
      return;
    }

    this.userService.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.dialog.open(SuccessDialogEmailComponent, {
          data: { messageKey: 'reset-password.success' }
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.dialog.open(SuccessDialogEmailComponent, {
          data: { messageKey: 'reset-password.error' }
        });
      }
    });

  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}

