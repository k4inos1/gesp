import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
        console.error('Error en AuthGuard:', error);
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
}
