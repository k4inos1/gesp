import { Injectable, inject, Inject, NgZone } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithRedirect,
  signInWithPopup,
  signOut,
  getRedirectResult,
  User as FirebaseUser
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { UserData } from './auth.service';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly userService = inject(UserService);
  private readonly ngZone = inject(NgZone);
  private readonly googleProvider: GoogleAuthProvider;
  private readonly isProcessingRedirect = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject('GOOGLE_CLIENT_ID') private googleClientId: string
  ) {
    // Inicializar el proveedor de Google
    this.googleProvider = new GoogleAuthProvider();
    
    // Configurar el proveedor de Google
    this.googleProvider.setCustomParameters({
      prompt: 'select_account', // Forzar a que siempre pida seleccionar cuenta
      hd: '*' // Limitar a dominios específicos si es necesario
    });
    
    // Agregar alcances adicionales si es necesario
    this.googleProvider.addScope('profile');
    this.googleProvider.addScope('email');
  }

  /**
   * Iniciar sesión con Google
   */
  async handleRedirectResult(): Promise<FirebaseUser | null> {
    try {
      this.isProcessingRedirect.next(true);
      const result = await getRedirectResult(this.auth);
      
      if (result?.user) {
        const user = result.user;
        console.log('Usuario autenticado con Google (redirect):', user);
        
        // Verificar si el usuario ya existe en Firestore
        const userDoc = await this.userService.getUser(user.uid).toPromise();
        
        if (!userDoc) {
          console.log('Creando nuevo usuario en Firestore...');
          
          // Crear un nuevo usuario en Firestore si no existe
          const userData: Omit<UserData, 'id'> = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || 'Usuario sin nombre',
            emailVerified: user.emailVerified,
            photoURL: user.photoURL || null,
            role: 'user',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            preferences: {
              theme: 'light',
              language: 'es',
              notifications: true
            }
          };
          
          await this.userService.createUser(userData);
        }
        
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Error al procesar la redirección de Google:', error);
      this.snackBar.open(
        'Error al procesar la autenticación. Por favor, inténtalo de nuevo.',
        'Cerrar',
        { duration: 5000 }
      );
      return null;
    } finally {
      this.isProcessingRedirect.next(false);
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      // Verificar si estamos en un entorno de navegador
      if (typeof this.document.defaultView === 'undefined') {
        throw new Error('No se puede iniciar sesión fuera de un navegador');
      }

      // Verificar si el proveedor está configurado correctamente
      if (!this.googleProvider) {
        throw new Error('Proveedor de Google no configurado correctamente');
      }

      console.log('Iniciando sesión con Google (redirección)...');
      
      // Usar redirección en lugar de popup
      await signInWithRedirect(this.auth, this.googleProvider);
      
    } catch (error) {
      console.error('Error al iniciar sesión con Google (redirección):', error);
      
      // Convertir el error a un objeto con propiedades estándar
      const errorObj = error instanceof Error 
        ? { code: 'auth/error', message: error.message }
        : { code: 'auth/unknown-error', message: 'Error desconocido' };
      
      // Si falla la redirección, intentar con popup como respaldo
      if (errorObj.message.includes('auth/popup-blocked')) {
        console.log('Redirección bloqueada, intentando con popup...');
        try {
          const result = await signInWithPopup(this.auth, this.googleProvider);
          if (result?.user) {
            await this.handleUserAfterAuth(result.user);
          }
        } catch (popupError) {
          const popupErrorObj = popupError instanceof Error 
            ? { code: 'auth/popup-error', message: popupError.message }
            : { code: 'auth/unknown-error', message: 'Error desconocido en popup' };
          this.handleAuthError(popupErrorObj);
          throw popupError;
        }
      } else {
        this.handleAuthError(errorObj);
        throw error;
      }
    }
  }
  
  private async handleUserAfterAuth(user: FirebaseUser): Promise<void> {
    try {
      console.log('Usuario autenticado con Google:', user);
      
      // Verificar si el usuario ya existe en Firestore
      const userDoc = await this.userService.getUser(user.uid).toPromise();
      
      if (!userDoc) {
        console.log('Creando nuevo usuario en Firestore...');
        
        // Crear un nuevo usuario en Firestore si no existe
        const userData: Omit<UserData, 'id'> = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || 'Usuario sin nombre',
          emailVerified: user.emailVerified,
          photoURL: user.photoURL || null,
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          preferences: {
            theme: 'light',
            language: 'es',
            notifications: true
          }
        };
        
        await this.userService.createUser(userData);
      }
      
      // Navegar al dashboard después de autenticación exitosa
      this.ngZone.run(() => {
        this.router.navigate(['/dashboard']);
      });
      
    } catch (error) {
      console.error('Error al manejar el usuario después de la autenticación:', error);
      throw error;
    }
  }
  
  private handleAuthError(error: unknown): void {
    // Función de ayuda para verificar si un objeto tiene las propiedades code y message
    const isErrorWithCodeAndMessage = (e: unknown): e is { code: unknown; message: unknown } => {
      return (
        e !== null &&
        typeof e === 'object' &&
        'code' in e &&
        'message' in e
      );
    };
    
    // Inicializar el mensaje de error por defecto
    let errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    
    // Procesar el error para obtener más información
    if (isErrorWithCodeAndMessage(error)) {
      const errorCode = String(error.code || 'auth/unknown-error');
      const errorMessageDetail = String(error.message || 'Error desconocido');
      
      console.error('Error de autenticación:', { code: errorCode, message: errorMessageDetail });
      
      // Mapear códigos de error a mensajes amigables
      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Ya existe una cuenta con el mismo correo electrónico pero con credenciales diferentes.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'La ventana de autenticación fue cerrada. Por favor, inténtalo de nuevo.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Solo se permite una solicitud de ventana emergente a la vez.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para este sitio.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Error de red. Por favor, verifica tu conexión a Internet.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, inténtalo de nuevo más tarde.';
          break;
        case 'auth/error':
        case 'auth/unknown-error':
        case 'auth/popup-error':
          // Usar el mensaje de error original si está disponible
          errorMessage = errorMessageDetail || errorMessage;
          break;
      }
    } else if (error instanceof Error) {
      // Si es un Error estándar, usar su mensaje
      console.error('Error de autenticación:', error);
      errorMessage = error.message || errorMessage;
    } else {
      // Cualquier otro tipo de error
      console.error('Error de autenticación desconocido:', error);
    }
    
    this.ngZone.run(() => {
      this.snackBar.open(errorMessage, 'Cerrar', { duration: 10000 });
    });
  }

  /**
   * Cerrar sesión
   */
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.ngZone.run(() => {
        this.router.navigate(['/auth/login']);
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al cerrar sesión';
      console.error('Error al cerrar sesión:', error);
      this.ngZone.run(() => {
        this.snackBar.open(
          `Error al cerrar sesión: ${errorMessage}`,
          'Cerrar',
          { duration: 5000 }
        );
      });
    }
  }
  
  // Obtener el estado de procesamiento de redirección
  get isProcessingRedirect$() {
    return this.isProcessingRedirect.asObservable();
  }
}
