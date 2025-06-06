import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
    console.warn('⚠️ StorageService está deshabilitado. Firebase Storage no está en uso.');
  }

  async uploadFile(file: File, path: string): Promise<string> {
    console.warn('⚠️ Intento de subir archivo deshabilitado:', path);
    throw new Error('El almacenamiento de archivos está deshabilitado');
  }

  async getFileUrl(path: string): Promise<string> {
    console.warn('⚠️ Intento de obtener URL deshabilitado:', path);
    throw new Error('El almacenamiento de archivos está deshabilitado');
  }

  async deleteFile(path: string): Promise<void> {
    console.warn('⚠️ Intento de eliminar archivo deshabilitado:', path);
    throw new Error('El almacenamiento de archivos está deshabilitado');
  }

  isAvailable(): boolean {
    return false; // Siempre falso ya que el almacenamiento está deshabilitado
  }
}
