import { Injectable, inject } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly userService = inject(UserService);
  private readonly googleProvider = new GoogleAuthProvider();

  constructor() {
    // Configurar el proveedor de Google
    this.googleProvider.setCustomParameters({
      prompt: 'select_account' // Forzar a que siempre pida seleccionar cuenta
    });
  }

  /**
   * Iniciar sesión con Google
   */
  async signInWithGoogle(): Promise<FirebaseUser | null> {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const user = result.user;
      
      if (user) {
        // Verificar si el usuario ya existe en Firestore
        const userDoc = await this.userService.getUser(user.uid).toPromise();
        
        if (!userDoc) {
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
