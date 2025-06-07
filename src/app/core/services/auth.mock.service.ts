import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserData } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService {
  private readonly MOCK_USER: UserData = {
    uid: 'mock-user-123',
    email: 'usuario@demo.com',
    displayName: 'Usuario Demo',
    emailVerified: true,
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  private isAuthenticated = false;
  private user: UserData | null = null;

  constructor(private router: Router) {}

  // Iniciar sesión automáticamente en desarrollo
  autoLogin(): void {
    this.isAuthenticated = true;
    this.user = { ...this.MOCK_USER };
    localStorage.setItem('mockAuth', 'true');
  }

  // Simular inicio de sesión
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(_credentials: { email: string; password: string }): Observable<UserData> {
    return of(this.MOCK_USER).pipe(
      delay(500),
      tap(user => {
        this.isAuthenticated = true;
        this.user = { ...user };
        localStorage.setItem('mockAuth', 'true');
      })
    );
  }

  // Cerrar sesión
  logout(): Observable<void> {
    return of(undefined).pipe(
      delay(200),
      tap(() => {
        this.isAuthenticated = false;
        this.user = null;
        localStorage.removeItem('mockAuth');
        this.router.navigate(['/auth/login']);
      })
    );
  }

  // Obtener usuario actual
  getCurrentUser(): UserData | null {
    return this.user || (localStorage.getItem('mockAuth') ? { ...this.MOCK_USER } : null);
  }

  // Verificar autenticación
  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('mockAuth');
  }

  // Verificar rol
  hasRole(role: string): boolean {
    return (this.user?.role === role) || false;
  }

  // Resetear contraseña
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword(_email: string): Observable<void> {
    // El parámetro _email no se usa, pero es necesario para mantener la firma del método
    return of(undefined).pipe(delay(500));
  }
}
