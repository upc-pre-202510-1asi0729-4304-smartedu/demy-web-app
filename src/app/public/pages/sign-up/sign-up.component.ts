import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '../../../iam-user/model/user.entity';
import { Academy } from '../../../iam-user/model/academy.entity';
import { UserService } from '../../../iam-user/services/user.service';
import { AcademyService } from '../../../iam-user/services/academy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationService } from '../../../iam-user/services/authentication.service';
import { SignUpRequest } from '../../../iam-user/model/sign-up.request';

/**
 * Component representing the application's sign-up (registration) page.
 *
 * @summary
 * Provides a form for registering new users along with their associated academy.
 * Includes validation, error handling, and navigation after success.
 */
@Component({
  selector: 'app-sign-up',
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
    MatProgressSpinnerModule,
    TranslateModule,
    MatCheckboxModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  /**
   * Reactive form group for sign-up input fields.
   */
  signUpForm: FormGroup;

  /**
   * Indicates whether a registration request is in progress.
   */
  isLoading: boolean = false;

  /**
   * Initializes the component with form controls and services.
   *
   * @param fb - FormBuilder for building reactive forms.
   * @param router - Router for navigation.
   * @param userService - Service for user-related operations.
   * @param academyService - Service for academy-related operations.
   * @param authenticationService - Service for authentication operations.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private academyService: AcademyService,
    private authenticationService: AuthenticationService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      academy_name: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  /**
   * Handles form submission for user registration.
   * If valid, creates a user account and academy, otherwise marks form fields as touched.
   */
  onSubmit() {
    if (this.signUpForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formData = this.signUpForm.value;

      const signUpRequest: SignUpRequest = {
        firstName: formData.name.split(' ')[0] || '',
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        password: formData.password,
        academyName: formData.academy_name,
        ruc: formData.ruc
      };

      this.authenticationService.signUpWithResponse(signUpRequest).subscribe({
        next: () => {
          this.isLoading = false;
          localStorage.setItem('user_name', formData.name);
          localStorage.setItem('user_email', formData.email);

          this.router.navigate(['/planSelect']);

        },
        error: (userError) => {
          this.isLoading = false;
          this.handleRegistrationError(userError);
        }
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }


  /**
   * Handles cleanup if the user was created but the academy failed.
   * Deletes the user account to avoid orphaned records.
   *
   * @param userId - ID of the user to be deleted.
   * @param error - Error object from the failed academy creation.
   */
  private handlePartialRegistration(userId: string, error: any) {
    this.isLoading = false;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        alert('Error: The academy could not be created. Your user account has been deleted. Please try again.');
      },
      error: (deleteError) => {
        console.error('Error deleting user:', deleteError);
        alert(`Error partial: Your account (ID: ${userId}) was created, but the academy hasn't. Contact technical support.`);
      }
    });
  }

  /**
   * Handles and displays error messages during registration failure.
   *
   * @param error - Error object returned by the authentication service.
   */
  private handleRegistrationError(error: any) {
    this.isLoading = false;
    console.error('Registration error:', error);

    let errorMessage = 'An error occurred during registration. Please verify your information and try again.';

    if (error.status === 409) {
      errorMessage = 'This email address is already registered. Please use another one.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid data. Please verify the information entered.';
    }

    alert(errorMessage);
  }

  /**
   * Getter for easy access to form controls in templates.
   */
  get f() {
    return this.signUpForm.controls;
  }
}
