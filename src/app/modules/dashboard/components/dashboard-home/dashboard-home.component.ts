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
  private healthSubscription: Subscription;
  private activitySubscription: Subscription;

  constructor(private dashboardService: DashboardService) {
    this.stats$ = this.dashboardService.getCurrentStats();
    this.healthSubscription = new Subscription();
    this.activitySubscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.healthSubscription.unsubscribe();
    this.activitySubscription.unsubscribe();
  }

  private loadDashboardData(): void {
    // Cargar estadísticas iniciales
    this.dashboardService.getStats().subscribe();

    // Cargar salud del sistema
    this.healthSubscription = this.dashboardService.getSystemHealth().subscribe(
      health => this.systemHealth = health
    );

    // Cargar actividad reciente
    this.activitySubscription = this.dashboardService.getRecentActivity().subscribe(
      activity => this.recentActivity = activity
    );
  }

  private setupAutoRefresh(): void {
    // Actualizar la salud del sistema cada minuto
    const healthRefresh = setInterval(() => {
      this.healthSubscription = this.dashboardService.getSystemHealth().subscribe(
        health => this.systemHealth = health
      );
    }, 60000);

    // Actualizar actividad reciente cada 2 minutos
    const activityRefresh = setInterval(() => {
      this.activitySubscription = this.dashboardService.getRecentActivity().subscribe(
        activity => this.recentActivity = activity
      );
    }, 120000);

    // Limpiar los intervalos cuando el componente se destruye
    this.healthSubscription.add(() => clearInterval(healthRefresh));
    this.activitySubscription.add(() => clearInterval(activityRefresh));
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
