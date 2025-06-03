import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GesApp';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.notificationService.showSuccess('Sesión cerrada correctamente');
      },
      error: () => {
        this.notificationService.showError('Error al cerrar sesión');
      }
    });
  }
}
