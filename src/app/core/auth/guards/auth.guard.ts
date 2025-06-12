import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar si el usuario está autenticado
    const isAuthenticated = !!localStorage.getItem('access_token');
    
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    return true;
  }
}
