import { Injectable, inject, Inject } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  User as FirebaseUser
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { UserData } from './auth.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly userService = inject(UserService);
  private readonly googleProvider: GoogleAuthProvider;

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
  async signInWithGoogle(): Promise<FirebaseUser | null> {
    try {
      // Verificar si estamos en un entorno de navegador
      if (typeof this.document.defaultView === 'undefined') {
        throw new Error('No se puede iniciar sesión fuera de un navegador');
      }

      // Verificar si el proveedor está configurado correctamente
      if (!this.googleProvider) {
        throw new Error('Proveedor de Google no configurado correctamente');
      }

      console.log('Iniciando sesión con Google...');
      
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const user = result.user;
      
      if (user) {
        console.log('Usuario autenticado con Google:', user);
        
        // Verificar si el usuario ya existe en Firestore
        const userDoc = await this.userService.getUser(user.uid).toPromise();
        
        if (!userDoc) {
          console.log('Creando nuevo usuario en Firestore...');
          
          // Crear un nuevo usuario en Firestore si no existe
          const userData: Omit<UserData, 'id'> = {
            uid: user.uid,
            email: user.email,
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
      console.error('Error al iniciar sesión con Google:', error);
      this.snackBar.open(
        'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.',
        'Cerrar',
        { duration: 5000 }
      );
      return null;
    }
  }

  /**
   * Cerrar sesión
   */
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}
