import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { GoogleAuthService } from '../../../../core/services/google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  googleLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
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
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } finally {
        this.loading = false;
      }
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'Por favor ingresa un email válido';
    }
    if (control?.hasError('minlength')) {
      return `La contraseña debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  async signInWithGoogle(): Promise<void> {
    try {
      this.googleLoading = true;
      
      // Iniciar sesión con Google
      const userCredential = await this.googleAuthService.signInWithGoogle();
      
      if (userCredential?.user) {
        // Mostrar mensaje de éxito
        this.snackBar.open('¡Inicio de sesión exitoso con Google!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        
        // Navegar al dashboard después de un breve retraso para que se vea el mensaje
        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      this.snackBar.open(
        'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.',
        'Cerrar',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        }
      );
    } finally {
      this.googleLoading = false;
    }
  }
}
