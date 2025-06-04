import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.loading = true;
      const { confirmPassword, ...registerData } = this.registerForm.value;
      
      try {
        await this.authService.register(registerData);
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.snackBar.open(error.message || 'Error al registrarse', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } finally {
        this.loading = false;
      }
    }
  }

  getErrorMessage(field: string): string {
    if (this.registerForm.get(field)?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field === 'email' && this.registerForm.get('email')?.hasError('email')) {
      return 'Email inválido';
    }
    if (field === 'password' && this.registerForm.get('password')?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (field === 'name' && this.registerForm.get('name')?.hasError('minlength')) {
      return 'El nombre debe tener al menos 3 caracteres';
    }
    if (field === 'confirmPassword' && this.registerForm.hasError('mismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
