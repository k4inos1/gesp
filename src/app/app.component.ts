import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <mat-spinner></mat-spinner>
    </div>
    <router-outlet *ngIf="!isLoading"></router-outlet>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 9999;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'gesapp-angular';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar autenticación al iniciar la aplicación
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoading = false;
      this.checkAuthStatus();
    });
    
    this.checkAuthStatus();
  }
  
  private checkAuthStatus(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath.includes('/auth');
    
    // Redirigir según el estado de autenticación
    if (isAuthenticated && isAuthPage) {
      this.router.navigate(['/dashboard']);
    } else if (!isAuthenticated && !isAuthPage) {
      this.router.navigate(['/auth/login']);
    }
  }
}