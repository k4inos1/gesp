import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { HTTP_SERVICE } from '../core.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(HTTP_SERVICE) private httpService: HttpService) {}

  logout(): Observable<void> {
    // Clear any stored authentication tokens
    localStorage.removeItem('auth_token');

    // For now, we'll return a successful observable
    // In a real app, you might want to make an HTTP request to a logout endpoint
    return of(void 0);
  }

  login(credentials: any): Observable<any> {
    return this.httpService.post(environment.apiUrl + '/auth/login', credentials);
  }
}
