import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
interface LoginResponse {
  access_token: string;
  expires_in: number; // Agrega aquí la propiedad de expiración del token
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000/api/auth"; // Ajusta según tu API

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión
  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          // Guardar el token en el almacenamiento local
          if (response && response.access_token) {
            localStorage.setItem("access_token", response.access_token);
            // Guardar la fecha de expiración
            const expirationDate = new Date();
            expirationDate.setSeconds(
              expirationDate.getSeconds() + response.expires_in
            );
            localStorage.setItem("token_expiration", expirationDate.toString());
          }
        })
      );
  }

  // Cerrar sesión
  logout(): void {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiration"); // Eliminar la fecha de expiración
    // Redirigir al login
    this.router.navigate(["/auth/login"]);
  }
  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    const expiration = localStorage.getItem("token_expiration");
    if (!token || !expiration) {
      return false;
    }
    return new Date() < new Date(expiration); // Comprobar si el token ha expirado
  }

  // Obtener el token de autenticación
  getToken(): string | null {
    return localStorage.getItem("access_token");
  }
}
