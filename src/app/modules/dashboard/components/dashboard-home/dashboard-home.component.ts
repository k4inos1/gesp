import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardStats, SystemHealth, ActivityLog } from '../../../../core/models/dashboard.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  stats$: Observable<DashboardStats | null>;
  systemHealth: SystemHealth | null = null;
  recentActivity: ActivityLog[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private dashboardService: DashboardService) {
    this.stats$ = this.dashboardService.getCurrentStats();
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadDashboardData(): void {
    // Cargar estadísticas iniciales
    const statsSub = this.dashboardService.getStats().subscribe();
    this.subscriptions.push(statsSub);

    // Cargar salud del sistema
    const healthSub = this.dashboardService.getSystemHealth().subscribe(
      health => this.systemHealth = health
    );
    this.subscriptions.push(healthSub);

    // Cargar actividad reciente
    const activitySub = this.dashboardService.getRecentActivity().subscribe(
      activity => this.recentActivity = activity
    );
    this.subscriptions.push(activitySub);
  }

  private setupAutoRefresh(): void {
    // Actualizar la salud del sistema cada minuto
    const healthRefresh = setInterval(() => {
      this.dashboardService.getSystemHealth().subscribe(
        health => this.systemHealth = health
      );
    }, 60000);

    // Limpiar el intervalo cuando el componente se destruye
    this.subscriptions.push(new Subscription(() => clearInterval(healthRefresh)));
  }

  getHealthStatusColor(status: string): string {
    switch (status) {
      case 'healthy': return 'green';
      case 'warning': return 'orange';
      case 'critical': return 'red';
      default: return 'gray';
    }
  }
}
