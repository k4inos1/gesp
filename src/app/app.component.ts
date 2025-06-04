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
  loading = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  async onLogout(): Promise<void> {
    this.loading = true;
    try {
      await this.authService.logout();
      this.notificationService.showSuccess('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.notificationService.showError('Error al cerrar sesión');
    } finally {
      this.loading = false;
    }
  }
}
