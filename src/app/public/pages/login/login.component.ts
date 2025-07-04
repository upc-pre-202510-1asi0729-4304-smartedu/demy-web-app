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
 *
 * @summary
 * Provides a reactive login form with validation and Material Design styling.
 * Upon successful authentication, the user is redirected to the appropriate route based on their role.
 *
 * @remarks
 * Includes language switching capabilities via {@link LanguageSwitcherComponent}.
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
  /**
   * Reactive form group for the login form.
   */
  loginForm: FormGroup;

  /**
   * Controls whether the password input is visible or hidden.
   */
  hidePassword = true;

  /**
   * Constructs the {@link LoginComponent} and initializes the form.
   *
   * @param fb - Angular FormBuilder used to build the reactive form
   * @param router - Angular Router used for navigation
   * @param userService - Service to interact with user-related backend operations
   * @param authenticationService - Service for performing authentication actions like sign-in
   */
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private authenticationService: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(0)]],
      remember: [false]
    });
  }

  /**
   * Handler for login form submission.
   *
   * @remarks
   * If the form is valid, calls the authentication service's `signIn` method.
   * Otherwise, marks all fields as touched to trigger validation messages.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authenticationService.signIn({ email, password });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  /**
   * Convenience getter to access form controls in the template.
   *
   * @returns A dictionary of form controls.
   */
  get f() {
    return this.loginForm?.controls || {};
  }

}
