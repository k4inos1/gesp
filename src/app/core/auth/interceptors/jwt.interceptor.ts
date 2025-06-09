import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly publicPaths = [
    '/assets/',
    '/auth/',
    '.js',
    '.mjs',
    'main-',
    'polyfills-',
    'runtime-',
    'styles-',
    'vendor-',
    'favicon.ico'
  ];

  constructor(private router: Router) {}

  private isPublicRequest(url: string): boolean {
    return this.publicPaths.some(path => url.includes(path));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // No interceptar solicitudes públicas
    if (this.isPublicRequest(request.url)) {
      return next.handle(request);
    }

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('access_token');
    
    // Si no hay token, permitir la solicitud pero no agregar el encabezado de autorización
    // Esto permite que las rutas públicas funcionen sin autenticación
    if (!token) {
      return next.handle(request);
    }

    // Clonar la solicitud y agregar el token de autenticación
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Manejar la respuesta
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el error es 401, redirigir al login
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
