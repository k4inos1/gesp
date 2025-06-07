import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface RecaptchaVerificationResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  private readonly RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/v3/siteverify';
  private readonly MINIMUM_SCORE = 0.5; // Puntuación mínima aceptable (0.0 a 1.0)

  constructor(
    private http: HttpClient,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  /**
   * Ejecuta la verificación de reCAPTCHA v3
   * @param action Nombre de la acción a registrar en la consola de reCAPTCHA
   * @returns Observable con el token de verificación
   */
  execute(action: string): Observable<string> {
    // En desarrollo, devolver un token simulado
    if (environment.production === false) {
      return of('dev-recaptcha-dummy-token');
    }
    
    return this.recaptchaV3Service.execute(action).pipe(
      catchError(error => {
        console.error('Error al ejecutar reCAPTCHA:', error);
        throw new Error('Error de verificación de seguridad');
      })
    );
  }

  /**
   * Verifica un token de reCAPTCHA con el backend
   * @param token Token a verificar
   * @param action Acción esperada
   * @returns Observable con la respuesta de verificación
   */
  verifyToken(token: string, expectedAction: string): Observable<boolean> {
    // En desarrollo, siempre retornar verdadero
    if (environment.production === false) {
      return of(true);
    }

    // En producción, verificar con el backend
    return this.http.post<RecaptchaVerificationResponse>(
      `${environment.apiUrl}/auth/verify-recaptcha`,
      { token, action: expectedAction },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      map(response => {
        if (!response.success) {
          console.warn('reCAPTCHA verification failed:', response['error-codes']);
          return false;
        }

        // Verificar que la acción coincida
        if (response.action !== expectedAction) {
          console.warn(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${response.action}`);
          return false;
        }

        // Verificar puntuación mínima
        if (response.score && response.score < this.MINIMUM_SCORE) {
          console.warn(`reCAPTCHA score too low: ${response.score} < ${this.MINIMUM_SCORE}`);
          return false;
        }

        return true;
      }),
      catchError(error => {
        console.error('Error al verificar reCAPTCHA:', error);
        return of(false);
      })
    );
  }
}
