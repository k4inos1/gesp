import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { 
  Auth, 
  UserCredential, 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from '@angular/fire/auth'; 

// Tipo para errores de autenticación
type FirebaseAuthError = Error & { code?: string; message: string; };
import { UserService } from './user.service';

// Interfaz para el objeto de preferencias del usuario
interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  language?: 'es' | 'en';
  notifications?: boolean;
  [key: string]: unknown;
}

export interface UserData {
  // Identificación
  uid: string;
  
  // Información básica
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  photoURL?: string | null;
  
  // Roles y permisos
  role?: 'user' | 'admin' | string;
  status?: 'active' | 'inactive' | 'suspended';
  
  // Metadatos
  createdAt?: string | Date;
  updatedAt?: string | Date;
  lastLogin?: string | Date;
  
  // Preferencias
  preferences?: UserPreferences;
  
  // Para propiedades adicionales
  [key: string]: unknown;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private authState: FirebaseUser | null = null;
  private destroy$ = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly afAuth = inject(Auth);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly userService = inject(UserService);

  constructor() {
    this.initAuthStateListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private initAuthStateListener(): void {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (user) {
          this.authState = user;
          this.getUserData(user.uid).subscribe(userData => {
            const userObj: UserData = {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              displayName: user.displayName,
              photoURL: user.photoURL,
              ...userData
            };
            this.currentUserSubject.next(userObj);
            // Guardar en localStorage para persistencia de sesión
            localStorage.setItem('user', JSON.stringify(userObj));
            
            // Configurar auto-logout si es necesario (ej. 24h)
            this.setAutoLogout(24 * 60 * 60 * 1000);
          });
        } else {
          this.authState = null;
          this.currentUserSubject.next(null);
          localStorage.removeItem('user');
        }
      });
    });
  }

  // Obtener datos adicionales del usuario desde Firestore
  private getUserData(uid: string): Observable<Partial<UserData>> {
    if (!uid) return of({});
    
    return this.userService.getUser(uid).pipe(
      map(user => user || {}),
      catchError(error => {
        console.error('Error al obtener datos del usuario:', error);
        return of({});
      })
    );
  }

  // Registrar un nuevo usuario
  async register(data: RegisterData): Promise<UserCredential> {
    console.log('Iniciando registro para:', data.email);
    
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        this.afAuth,
        data.email,
        data.password
      );
      
      console.log('Usuario creado en Auth:', userCredential.user?.uid);

      if (!userCredential.user) {
        throw new Error('No se pudo crear el usuario');
      }

      // 2. Actualizar perfil del usuario con el nombre
      console.log('Actualizando perfil del usuario...');
      await updateProfile(userCredential.user, {
        displayName: data.name,
        photoURL: null
      });

      // 3. Crear documento en Firestore usando UserService
      console.log('Creando documento en Firestore...');
      const now = new Date().toISOString();
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: data.email,
        displayName: data.name,
        emailVerified: false,
        role: data.role || 'user',
        status: 'active',
        createdAt: now,
        updatedAt: now,
        preferences: {
          theme: 'light',
          language: 'es',
          notifications: true
        }
      };

      // Usar UserService para crear el usuario
      await this.userService.createUser(userData);
      
      console.log('Usuario registrado exitosamente:', userCredential.user.uid);
      return userCredential;
      
    } catch (error: unknown) {
      console.error('❌ Error en registro:', error);
      
      // Proporcionar mensajes de error más descriptivos
      let errorMessage = 'Error al registrar el usuario';
      
      if (error instanceof Error) {
        // Si es un Error estándar, usar su mensaje
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        // Manejar errores de Firebase Auth
        const firebaseError = error as { code?: string; message?: string };
        
        if (firebaseError.code) {
          errorMessage = this.getFirebaseErrorMessage(firebaseError.code);
        } else if (firebaseError.message) {
          errorMessage = firebaseError.message;
        }
      }
      
      throw new Error(errorMessage);
    }
  }

  // Iniciar sesión con email y contraseña
  async login(data: LoginData): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.afAuth,
        data.email,
        data.password
      );
      return userCredential;
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await signOut(this.afAuth);
      this.clearAuthData();
      this.ngZone.run(() => {
        this.router.navigate(['/auth/login']);
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  // Enviar correo de restablecimiento de contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.afAuth, email);
    } catch (error) {
      console.error('Error al enviar correo de restablecimiento:', error);
      throw error;
    }
  }

  // Actualizar perfil del usuario
  async updateProfile(displayName?: string, photoURL?: string): Promise<void> {
    const user = this.afAuth.currentUser;
    if (!user) throw new Error('No hay usuario autenticado');

    try {
      await updateProfile(user, { displayName, photoURL });
      // Actualizar datos locales
      const currentUser = this.currentUserValue;
      if (currentUser) {
        currentUser.displayName = displayName || currentUser.displayName;
        currentUser.photoURL = photoURL || currentUser.photoURL;
        this.currentUserSubject.next(currentUser);
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  }

  // Obtener el usuario actual
  get currentUserValue(): UserData | null {
    return this.currentUserSubject.value;
  }

  // Verificar si el usuario está autenticado
  get isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user?.role === role;
  }

  // Verificar si el correo está verificado
  get isEmailVerified(): boolean {
    return this.currentUserValue?.emailVerified || false;
  }

  // Configurar auto-logout
  private setAutoLogout(expirationDuration: number): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Limpiar datos de autenticación
  private clearAuthData(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  // Manejar errores
  /**
   * Obtiene un mensaje de error legible a partir de un código de error de Firebase
   */
  private getFirebaseErrorMessage(code: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'El correo electrónico ya está en uso',
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/weak-password': 'La contraseña es demasiado débil',
      'auth/user-not-found': 'No existe un usuario con ese correo electrónico',
      'auth/wrong-password': 'La contraseña es incorrecta',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Por favor, inténtalo de nuevo más tarde',
      'auth/network-request-failed': 'Error de conexión. Por favor, verifica tu conexión a internet',
      'auth/requires-recent-login': 'Esta operación es sensible y requiere autenticación reciente. Inicia sesión nuevamente',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/operation-not-allowed': 'Esta operación no está permitida',
      'auth/account-exists-with-different-credential': 'Ya existe una cuenta con el mismo correo electrónico pero con credenciales diferentes',
      'auth/credential-already-in-use': 'Estas credenciales ya están en uso por otra cuenta',
    };
    
    return errorMessages[code] || 'Error de autenticación';
  }

  /**
   * Maneja errores HTTP y de Firebase
   */
  private handleError(error: HttpErrorResponse | FirebaseAuthError): Observable<never> {
    let errorMessage = 'Ha ocurrido un error';
    
    if (error instanceof HttpErrorResponse) {
      // Es un error HTTP
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        // Error del servidor
        errorMessage = `Error del servidor: ${error.status} - ${error.statusText || 'Error desconocido'}`;
      }
    } else if ('code' in error) {
      // Es un error de Firebase Auth
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El correo electrónico ya está en uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No existe un usuario con ese correo electrónico';
          break;
        case 'auth/wrong-password':
          errorMessage = 'La contraseña es incorrecta';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, inténtalo de nuevo más tarde';
          break;
        default:
          errorMessage = error.message || 'Error de autenticación';
      }
    } else if (error instanceof Error) {
      // Error genérico
      errorMessage = error.message;
    }
    
    console.error('Error en AuthService:', error);
    return throwError(() => new Error(errorMessage));
  }
}
