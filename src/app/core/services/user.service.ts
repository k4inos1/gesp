import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  DocumentData,
  DocumentReference,
  DocumentSnapshot
} from '@angular/fire/firestore';
import { UserData } from './auth.service';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private readonly usersCollection = 'users';

  /**
   * Obtener un usuario por su ID
   * @param userId ID del usuario
   * @returns Observable con los datos del usuario o null si no existe
   */
  getUser(userId: string): Observable<UserData | null> {
    if (!userId) return of(null);
    
    const userDoc = doc(this.firestore, this.usersCollection, userId);
    return from(getDoc(userDoc)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          return { ...docSnap.data(), uid: docSnap.id } as UserData;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al obtener usuario:', error);
        return throwError(() => new Error('Error al obtener el usuario'));
      })
    );
  }

  /**
   * Crear un nuevo usuario en Firestore
   * @param userData Datos del usuario
   * @returns Promise con el resultado de la operación
   */
  async createUser(userData: Omit<UserData, 'id'>): Promise<void> {
    try {
      // Usar notación de corchetes para acceder a uid
      const uid = userData['uid'];
      if (!uid) {
        throw new Error('Se requiere un UID para crear un usuario');
      }
      
      // Crear una copia sin la propiedad uid
      const userDataCopy = { ...userData };
      delete userDataCopy['uid'];
      
      const userRef = doc(this.firestore, this.usersCollection, uid);
      await setDoc(userRef, userDataCopy);
      console.log('Usuario creado exitosamente en Firestore');
    } catch (error) {
      console.error('Error al crear usuario en Firestore:', error);
      throw error;
    }
  }

  /**
   * Actualizar un usuario existente
   * @param userId ID del usuario
   * @param userData Datos a actualizar
   * @returns Promise con el resultado de la operación
   */
  async updateUser(userId: string, userData: Partial<UserData>): Promise<void> {
    try {
      if (!userId) {
        throw new Error('Se requiere un ID de usuario para actualizar');
      }
      
      const userRef = doc(this.firestore, this.usersCollection, userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
      console.log('Usuario actualizado exitosamente en Firestore');
    } catch (error) {
      console.error('Error al actualizar usuario en Firestore:', error);
      throw error;
    }
  }

  /**
   * Eliminar un usuario
   * @param userId ID del usuario a eliminar
   * @returns Promise con el resultado de la operación
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      if (!userId) {
        throw new Error('Se requiere un ID de usuario para eliminar');
      }
      
      const userRef = doc(this.firestore, this.usersCollection, userId);
      await deleteDoc(userRef);
      console.log('Usuario eliminado exitosamente de Firestore');
    } catch (error) {
      console.error('Error al eliminar usuario de Firestore:', error);
      throw error;
    }
  }

  /**
   * Buscar usuarios por email
   * @param email Email a buscar
   * @returns Observable con el array de usuarios encontrados
   */
  findUserByEmail(email: string): Observable<UserData[]> {
    if (!email) return of([]);
    
    const usersRef = collection(this.firestore, this.usersCollection);
    const q = query(usersRef, where('email', '==', email));
    
    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        return querySnapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id
        } as UserData));
      }),
      catchError(error => {
        console.error('Error al buscar usuario por email:', error);
        return of([]);
      })
    );
  }

  /**
   * Verificar si un usuario es administrador
   * @param userId ID del usuario
   * @returns Observable con el resultado de la verificación
   */
  isAdmin(userId: string): Observable<boolean> {
    if (!userId) return of(false);
    
    return this.getUser(userId).pipe(
      map(user => user?.role === 'admin' || false)
    );
  }
}
