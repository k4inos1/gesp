import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Auth, user } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecaptchaService } from '../services/recaptcha.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private recaptchaService: RecaptchaService
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Si es desarrollo, omitir reCAPTCHA
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.checkAuth();
    }
    
    // En producción, verificar reCAPTCHA primero
    return this.verifyRecaptcha();
  }

  private verifyRecaptcha(): Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      this.recaptchaService.execute('auth_verification')
        .pipe(
          switchMap(token => this.recaptchaService.verifyToken(token, 'auth_verification')),
          switchMap(isValid => {
            if (!isValid) {
              this.showErrorMessage('Error de verificación de seguridad');
              return of(this.router.createUrlTree(['/auth/login']));
            }
            return this.checkAuth();
          }),
          catchError(error => {
            console.error('Error en verificación reCAPTCHA:', error);
            this.showErrorMessage('Error de seguridad. Por favor, recarga la página.');
            return of(this.router.createUrlTree(['/auth/login']));
          })
        ).subscribe(result => {
          resolve(result);
        });
    });
  }

  private checkAuth(): Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      this.user$.pipe(
        take(1)
      ).subscribe(user => {
        if (user) {
          resolve(true);
        } else {
          this.showLoginMessage();
          resolve(this.router.createUrlTree(['/auth/login']));
        }
      }, error => {
        console.error('Error en verificación de autenticación:', error);
        this.showLoginMessage();
        resolve(this.router.createUrlTree(['/auth/login']));
      });
    });
  }

  private showLoginMessage(): void {
    this.snackBar.open('Por favor, inicia sesión para acceder a esta página', 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
