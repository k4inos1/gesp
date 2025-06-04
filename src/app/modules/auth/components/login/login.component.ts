import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.loading = true;
      try {
        await this.authService.login(this.loginForm.value);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.snackBar.open(error.message || 'Error al iniciar sesión', 'Cerrar', {
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
    if (this.loginForm.get(field)?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field === 'email' && this.loginForm.get('email')?.hasError('email')) {
      return 'Email inválido';
    }
    if (field === 'password' && this.loginForm.get('password')?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}
