import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { 
  Auth, 
  UserCredential, 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User,
  authState,
  user
} from '@angular/fire/auth';
import { doc, setDoc, getFirestore, getDoc, Firestore, collection, docData } from '@angular/fire/firestore';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  role?: string;
  [key: string]: any;
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
  private tokenExpirationTimer: any;

  private readonly afAuth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

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
    const userRef = doc(this.firestore, 'users', uid);
    return from(getDoc(userRef)).pipe(
      map(docSnap => docSnap.exists() ? docSnap.data() as Partial<UserData> : {}),
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

      // 3. Crear documento de usuario en Firestore
      console.log('Creando documento en Firestore...');
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: data.email,
        displayName: data.name,
        emailVerified: false,
        role: data.role || 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const userDocRef = doc(this.firestore, 'users', userCredential.user.uid);
      await setDoc(userDocRef, userData);
      
      console.log('Usuario registrado exitosamente:', userCredential.user.uid);
      return userCredential;
      
    } catch (error: any) {
      console.error('❌ Error en registro:', error);
      
      // Proporcionar mensajes de error más descriptivos
      let errorMessage = 'Error al registrar el usuario';
      
      if (error.code) {
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
          case 'auth/operation-not-allowed':
            errorMessage = 'La operación no está permitida';
            break;
          default:
            errorMessage = error.message || errorMessage;
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
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.code) {
      // Errores de Firebase
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
        case 'auth/wrong-password':
          errorMessage = 'Correo o contraseña incorrectos';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Por favor, inténtalo más tarde';
          break;
        default:
          errorMessage = `Error de autenticación: ${error.code}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
