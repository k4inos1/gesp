import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Si la solicitud es hacia una API externa que necesita autenticación
    if (request.url.startsWith('https://your-api-url.com')) {
      return from(this.auth.currentUser?.getIdToken() || Promise.resolve('')).pipe(
        switchMap(token => {
          if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }
          return next.handle(request);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.handleAuthError();
          }
          return throwError(() => error);
        })
      );
    }
    
    // Para otras solicitudes, simplemente continúa sin modificar
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleAuthError();
        }
        return throwError(() => error);
      })
    );
  }

  private handleAuthError(): void {
    // Redirigir al login
    this.router.navigate(['/auth/login']);
    
    // Mostrar mensaje al usuario
    this.snackBar.open('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
