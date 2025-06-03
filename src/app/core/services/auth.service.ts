import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logout(): Observable<void> {
    // Clear any stored authentication tokens
    localStorage.removeItem('auth_token');

    // For now, we'll return a successful observable
    // In a real app, you might want to make an HTTP request to a logout endpoint
    return of(void 0);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/login', credentials);
  }
}
