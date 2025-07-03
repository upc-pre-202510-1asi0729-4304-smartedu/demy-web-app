import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../../iam-user/services/user.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from '../../../iam-user/services/authentication.service';

/**
 * Component representing the application's login page.
 * Contains a reactive login form with validation, and handles navigation
 * to the dashboard page after successful login.
 *
 * @remarks
 * This component also includes a language switcher for the app,
 * and is designed with Material Design.
 *
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitcherComponent,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
    TranslatePipe,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  /**
   * Constructor for the LoginComponent. Creates the reactive form with validation
   * and initializes the FormBuilder and Router services.
   *
   * @param fb - FormBuilder service for creating reactive forms
   * @param router - Router service for handling navigation
   * @param userService
   */

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private authenticationService: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(0)]],
      remember: [false]
    });
  }

  /**
   * Method executed when the form is submitted.
   * Validates the form and, if valid, navigates to the dashboard.
   * If invalid, marks all fields as touched to display errors.
   */

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authenticationService.signIn({ email, password });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() {
    return this.loginForm?.controls || {};
  }

}
