import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../iam-user/services/user.service';
import { ConfirmPasswordChangeDialogComponent } from '../../components/confirm-password-change-dialog/confirm-password-change-dialog.component';

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
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(private router: Router,    private userService: UserService, private dialog: MatDialog) {
    const nav = this.router.getCurrentNavigation();
    this.email = nav?.extras?.state?.['email'] || '';

  }

  resetPassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      alert('Please fill in both fields.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmPasswordChangeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.getUserByEmail(this.email).subscribe(users => {
          if (users.length > 0) {
            const user = users[0];
            this.userService.updatePasswordById(user.id, this.newPassword).subscribe({
              next: () => {
                alert('Password has been reset successfully.');
                this.router.navigate(['/login']);
              },
              error: (err) => {
                console.error('Error updating password:', err);
                alert('Failed to update password. Please try again.');
              }
            });
          } else {
            alert('User not found.');
          }
        });
      }
    });
  }





  goBack(): void {
    this.router.navigate(['/login']);
  }
}
