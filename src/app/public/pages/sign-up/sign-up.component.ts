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

/**
 * Component representing the application's sign-up (registration) page.
 * Contains a reactive registration form with validation, and handles navigation
 * to the login page after successful account and academy creation.
 *
 * @remarks
 * This component also includes a language switcher for the app,
 * and is designed with Material Design.
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
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading: boolean = false;

  /**
   * Constructor initializes the form and injects required services.
   * It sets up form controls and validation rules.
   */

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private academyService: AcademyService
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
   * Handles form submission when the user attempts to register.
   * If valid, it registers the user and creates the associated academy.
   */

  onSubmit() {
    if (this.signUpForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formData = this.signUpForm.value;


      const newUser = new UserAccount({
        fullName: formData.name,
        email: formData.email,
        passwordHash: formData.password,
        role: 'ADMIN',
        status: 'ACTIVE'
      });

      this.userService.registerUser(newUser).subscribe({
        next: (userResponse: UserAccount) => {

          const newAcademy: Academy = {
            id: 0,
            userId: userResponse.id.toString(),
            periods: [],
            academy_name: formData.academy_name,
            ruc: formData.ruc
          };

          this.academyService.createAcademy(newAcademy).subscribe({
            next: () => {
              this.isLoading = false;
              this.router.navigate(['/login']);
            },
            error: (academyError) => {
              this.handlePartialRegistration(userResponse.id.toString(), academyError);
            }
          });
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
   * Handles the scenario where the user is registered but the academy fails to be created.
   * Deletes the user to maintain consistency and not leave orphaned records.
   *
   * @param userId - The ID of the user to delete
   * @param error - The error object from the failed academy creation
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
   * Displays an appropriate error message to the user if registration fails.
   *
   * @param error - The error response from the registration service
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
}
