// src/app/core/services/firestore.service.ts
import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData,
  addDoc, 
  updateDoc,
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // Obtener todos los documentos de una colección
  getCollection(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<any[]>;
  }

  // Obtener un documento por ID
  getDocument(collectionName: string, id: string): Observable<any> {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(documentRef, { idField: 'id' }) as Observable<any>;
  }

  // Agregar un documento
  async addDocument(collectionName: string, data: any) {
    const collectionRef = collection(this.firestore, collectionName);
    return await addDoc(collectionRef, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  // Actualizar un documento
  async updateDocument(collectionName: string, id: string, data: any) {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return await updateDoc(documentRef, {
      ...data,
      updatedAt: new Date()
    });
  }

  // Eliminar un documento
  async deleteDocument(collectionName: string, id: string) {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return await deleteDoc(documentRef);
  }

  // Consultas personalizadas
  queryCollection(collectionName: string, field: string, operator: any, value: any): Observable<any[]> {
    const q = query(
      collection(this.firestore, collectionName),
      where(field, operator, value)
    );
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}