import { Injectable, Optional } from '@angular/core';
import { Storage, getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(@Optional() private firebaseApp: FirebaseApp) {
    try {
      if (firebaseApp) {
        this.storage = getStorage(firebaseApp);
        console.log('Firebase Storage initialized successfully');
      } else {
        console.warn('Firebase App not available for Storage');
      }
    } catch (e) {
      console.error('Failed to initialize Firebase Storage', e);
    }
  }

  async uploadFile(file: File, path: string): Promise<string> {
    if (!this.storage) {
      throw new Error('Storage is not available');
    }

    const storageRef = ref(this.storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }

  async getFileUrl(path: string): Promise<string> {
    if (!this.storage) {
      throw new Error('Storage is not available');
    }

    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }

  async deleteFile(path: string): Promise<void> {
    if (!this.storage) {
      throw new Error('Storage is not available');
    }

    const storageRef = ref(this.storage, path);
    return deleteObject(storageRef);
  }

  isAvailable(): boolean {
    return this.storage !== null;
  }
}
