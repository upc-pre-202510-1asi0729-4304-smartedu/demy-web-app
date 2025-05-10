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

/**
 * Component representing the sign-up (registration) page of the application.
 * It provides a form to collect user and academy information with validations.
 * Includes language switching functionality and redirects to the login page on successful submission.
 *
 */

@Component({
  selector: 'app-sign-up',
  imports: [
    LanguageSwitcherComponent,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;

  /**
   * Constructor initializes the form using FormBuilder with proper validations.
   * @param fb - FormBuilder for creating the form
   * @param router - Router for navigation after successful sign-up
   */

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      academyName: ['', Validators.required],
      ruc:['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      terms: [false]
    });
  }

  /**
   * Handles form submission.
   * If the form is valid, logs the form data and navigates to the login page.
   * Otherwise, marks all fields as touched to show validation errors.
   */

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Formulario enviado:', this.signUpForm.value);
      this.router.navigate(['/login']);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
