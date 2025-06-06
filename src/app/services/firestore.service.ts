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
  where,
  WhereFilterOp,
  DocumentData,
  DocumentReference,
  WithFieldValue,
  CollectionReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Interfaz base para documentos de Firestore
export interface FirestoreDocument {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends FirestoreDocument> {
  constructor(protected firestore: Firestore) {}

  // Obtener todos los documentos de una colección
  getCollection(collectionName: string): Observable<T[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<T[]>;
  }

  // Obtener un documento por ID
  getDocument(collectionName: string, id: string): Observable<T | undefined> {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(documentRef, { idField: 'id' }) as Observable<T | undefined>;
  }

  // Agregar un documento
  async addDocument(
    collectionName: string, 
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<DocumentReference> {
    const collectionRef = collection(
      this.firestore, 
      collectionName
    ) as CollectionReference<DocumentData>;
    
    const now = new Date();
    const documentData: WithFieldValue<DocumentData> = {
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    return addDoc(collectionRef, documentData);
  }

  // Actualizar un documento
  async updateDocument(
    collectionName: string, 
    id: string, 
    data: Partial<Omit<T, 'id' | 'createdAt'>>
  ): Promise<void> {
    const documentRef = doc(this.firestore, collectionName, id);
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    return updateDoc(documentRef, updateData);
  }

  // Eliminar un documento
  async deleteDocument(collectionName: string, id: string): Promise<void> {
    const documentRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(documentRef);
  }

  // Consultas personalizadas
  queryCollection(
    collectionName: string, 
    field: string, 
    operator: WhereFilterOp, 
    value: unknown
  ): Observable<T[]> {
    const q = query(
      collection(this.firestore, collectionName),
      where(field, operator, value)
    );
    return collectionData(q, { idField: 'id' }) as Observable<T[]>;
  }
}