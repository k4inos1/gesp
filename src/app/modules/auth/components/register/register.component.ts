import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { GoogleAuthService } from '../../../../core/services/google-auth.service';
import { RecaptchaService } from '../../../../core/services/recaptcha.service';

// Función de validación personalizada para la coincidencia de contraseñas
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading = false;
  googleLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private recaptchaService: RecaptchaService,
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    try {
      // Ejecutar reCAPTCHA antes de registrar
      const token = await this.recaptchaService.execute('register').toPromise();
      
      if (!token) {
        throw new Error('No se pudo verificar el reCAPTCHA');
      }

      // Aquí podrías verificar el token con tu backend si es necesario
      // await this.recaptchaService.verifyToken(token, 'register').toPromise();
      
      const { name, email, password } = this.registerForm.value;
      await this.authService.register({ name, email, password });
      
      this.snackBar.open('¡Registro exitoso!', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['/dashboard']);
    } catch (error: unknown) {
      console.error('Error en el registro:', error);
      let errorMessage = 'Ocurrió un error al registrarse. Por favor, inténtalo de nuevo.';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = String(error.code);
        switch (errorCode) {
          case 'auth/email-already-in-use':
            errorMessage = 'El correo electrónico ya está en uso.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido.';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'La operación no está permitida. Contacta al administrador.';
            break;
        }
      }
      
      this.snackBar.open(errorMessage, 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } finally {
      this.loading = false;
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      this.googleLoading = true;
      const user = await this.googleAuthService.signInWithGoogle();
      
      if (user) {
        this.snackBar.open('¡Inicio de sesión exitoso con Google!', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      this.snackBar.open(
        'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.',
        'Cerrar',
        { 
          duration: 5000,
          panelClass: ['error-snackbar']
        }
      );
    } finally {
      this.googleLoading = false;
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    
    if (field === 'email' && control?.hasError('email')) {
      return 'Ingresa un correo electrónico válido';
    }
    
    if (field === 'password' && control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (field === 'confirmPassword' && this.registerForm.hasError('mismatch')) {
      return 'Las contraseñas no coinciden';
    }
    
    return '';
  }
}
