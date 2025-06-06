
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DashboardStats, SystemHealth, ActivityLog } from '../models/dashboard.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnDestroy {
  private apiUrl = `${environment.apiUrl}/dashboard`;
  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  private refreshInterval: number | null = null;

  constructor(private http: HttpClient) {
    this.startAutoRefresh();
  }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`).pipe(
      tap(stats => this.statsSubject.next(stats))
    );
  }

  getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.apiUrl}/health`);
  }

  getRecentActivity(limit: number = 10): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.apiUrl}/activity`, {
      params: { limit: limit.toString() }
    });
  }

  getCurrentStats(): Observable<DashboardStats | null> {
    return this.statsSubject.asObservable();
  }

  private startAutoRefresh(interval: number = 30000): void {
    this.stopAutoRefresh(); // Detener cualquier intervalo existente
    this.refreshInterval = window.setInterval(() => {
      this.getStats().subscribe();
    }, interval);
  }

  stopAutoRefresh(): void {
    if (this.refreshInterval !== null) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
  }
}
