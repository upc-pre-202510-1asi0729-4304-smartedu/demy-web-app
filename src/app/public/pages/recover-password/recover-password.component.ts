import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogEmailComponent } from '../../components/success-dialog-email/success-dialog-email.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { UserService } from '../../../iam-user/services/user.service';

@Component({
  selector: 'app-recover-password',
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
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

  email: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  goToNext() {
    if (!this.email) {
      this.dialog.open(SuccessDialogEmailComponent, {
        data: { messageKey: 'recover-password.empty-email' }
      });
      return;
    }

    this.userService.getUserByEmail(this.email).subscribe(users => {
      if (users.length > 0 && users[0].email === this.email) {
        this.dialog.open(SuccessDialogEmailComponent, {
          data: { messageKey: 'recover-password.success' }
        });

        this.router.navigate(['/reset-password'], {
          state: { email: this.email }
        });
      } else {
        this.dialog.open(SuccessDialogEmailComponent, {
          data: { messageKey: 'recover-password.not-registered' }
        });
      }
    }, () => {
      this.dialog.open(SuccessDialogEmailComponent, {
        data: { messageKey: 'recover-password.check-error' }
      });
    });
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }
}
