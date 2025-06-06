import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  /**
   * Ejecuta la verificación de reCAPTCHA v3
   * @param action Nombre de la acción a registrar en la consola de reCAPTCHA
   * @returns Observable con el token de verificación
   */
  execute(action: string): Observable<string> {
    return this.recaptchaV3Service.execute(action).pipe(
      switchMap(token => {
        // Aquí podrías validar el token en tu backend si es necesario
        return from(Promise.resolve(token));
      })
    );
  }

  /**
   * Verifica un token de reCAPTCHA con el backend
   * @param token Token a verificar
   * @param action Acción esperada
   * @returns Observable con la respuesta de verificación
   */
  verifyToken(token: string, action: string): Observable<boolean> {
    // Implementación de ejemplo - deberías reemplazarla con una llamada a tu backend
    // para verificar el token del lado del servidor
    return from(Promise.resolve(true));
  }
}
