import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.error.set(null);

      const credentials: LoginRequest = this.loginForm.value;

      // Usar loginDemo para desarrollo, cambiar a login cuando tengas API real
      this.authService.loginDemo(credentials).subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error.set('Error en el servidor. Inténtalo de nuevo.');
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.error.set(error.message || 'Credenciales inválidas');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get emailErrors(): string | null {
    const control = this.loginForm.get('email');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'El email es requerido';
      if (control.errors['email']) return 'El email no es válido';
    }
    return null;
  }

  get passwordErrors(): string | null {
    const control = this.loginForm.get('password');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'La contraseña es requerida';
      if (control.errors['minlength']) return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  }
}
