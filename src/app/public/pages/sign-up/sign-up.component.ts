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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private academyService: AcademyService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      academyName: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid && !this.isLoading) {
      this.isLoading = true;
      const formData = this.signUpForm.value;

      // 1. Crear el usuario primero
      const newUser = new UserAccount({
        fullName: formData.name,
        email: formData.email,
        passwordHash: formData.password,
        role: 'ADMIN',
        status: 'ACTIVE'
      });

      this.userService.registerUser(newUser).subscribe({
        next: (userResponse: UserAccount) => {
          // 2. Si el usuario se crea correctamente, crear la academia
          const newAcademy: Academy = {
            id: 0, // El backend asignará el ID
            userId: userResponse.id.toString(), // Convertir a string si es necesario
            periods: [], // Inicializar como array vacío
            academyName: formData.academyName,
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

  private handlePartialRegistration(userId: string, error: any) {
    this.isLoading = false;

    // Eliminar el usuario si falla la creación de la academia
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        alert('Error: No se pudo crear la academia. Tu cuenta de usuario ha sido eliminada. Por favor inténtalo nuevamente.');
      },
      error: (deleteError) => {
        console.error('Error al eliminar usuario:', deleteError);
        alert(`Error parcial: Tu cuenta (ID: ${userId}) fue creada pero la academia no. Contacta al soporte técnico.`);
      }
    });
  }

  private handleRegistrationError(error: any) {
    this.isLoading = false;
    console.error('Error en el registro:', error);

    let errorMessage = 'Error durante el registro. Por favor verifica tus datos e inténtalo nuevamente.';

    if (error.status === 409) {
      errorMessage = 'El correo electrónico ya está registrado. Por favor usa otro.';
    } else if (error.status === 400) {
      errorMessage = 'Datos inválidos. Por favor verifica la información ingresada.';
    }

    alert(errorMessage);
  }
}
