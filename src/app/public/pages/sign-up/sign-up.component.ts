import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      academyName: ['', Validators.required],
      ruc:['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Formulario enviado:', this.signUpForm.value);
      this.router.navigate(['/login']);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
