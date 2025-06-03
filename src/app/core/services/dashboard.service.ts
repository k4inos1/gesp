import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DashboardStats, SystemHealth, ActivityLog } from '../models/dashboard.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;
  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  private refreshInterval: any;

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

  private startAutoRefresh(): void {
    this.refreshInterval = setInterval(() => {
      this.getStats().subscribe();
    }, 30000); // Actualizar cada 30 segundos
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}
