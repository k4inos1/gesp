import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  DocumentData,
  docData,
  collectionData,
  QuerySnapshot
} from '@angular/fire/firestore';
import { UserData } from './auth.service';
import { Observable, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Interfaz para extender UserData con el campo uid
type UserWithUid = UserData & { uid: string };

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
    
    const userDoc = doc(collection(this.firestore, this.usersCollection), userId);
    return docData(userDoc, { idField: 'uid' }) as Observable<UserData | null>;
  }

  /**
   * Obtener todos los usuarios
   * @returns Observable con el array de usuarios
   */
  getAllUsers(): Observable<UserWithUid[]> {
    const usersCollection = collection(this.firestore, this.usersCollection);
    
    return collectionData(usersCollection, { idField: 'uid' }).pipe(
      map((users: unknown[]) => users as UserWithUid[])
    );
  }

  /**
   * Crear un nuevo usuario en Firestore
   * @param userData Datos del usuario
   * @returns Promise con el resultado de la operación
   */
  async createUser(userData: Omit<UserData, 'id'>): Promise<void> {
    try {
      const userWithUid = userData as UserWithUid;
      const { uid, ...userDataWithoutUid } = userWithUid;
      
      if (!uid) {
        throw new Error('Se requiere un UID para crear un usuario');
      }
      
      const userRef = doc(this.firestore, this.usersCollection, uid);
      await setDoc(userRef, userDataWithoutUid);
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
   * @returns Observable con el usuario encontrado o null si no existe
   */
  getUserByEmail(email: string): Observable<UserData | null> {
    if (!email) return of(null);
    
    const usersCollection = collection(this.firestore, this.usersCollection);
    const q = query(usersCollection, where('email', '==', email));
    
    return from(getDocs(q)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          return { ...doc.data(), uid: doc.id } as UserWithUid;
        }
        return null;
      }),
      catchError((error: Error) => {
        console.error('Error al buscar usuario por email:', error);
        return of(null);
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
