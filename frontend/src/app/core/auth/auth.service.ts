import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}

  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/api/auth/login", credentials).pipe(
      tap((response) => {
        localStorage.setItem("token", response.token);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtService.isTokenExpired(token);
  }
}
