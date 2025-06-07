import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';
import { environment } from '../../../environments/environment';

interface EmulatorConfig {
  host?: string;
  port?: number;
}

interface FirebaseEmulatorsConfig {
  auth?: string | EmulatorConfig;
  firestore?: string | EmulatorConfig;
  storage?: string | EmulatorConfig;
  functions?: string | EmulatorConfig;
}

// Extender el tipo de environment para incluir los emuladores
declare module '../../../environments/environment' {
  interface Environment {
    firebase: {
      emulators?: FirebaseEmulatorsConfig;
      // Otras propiedades de Firebase
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId?: string;
    };
  }
}

// Inicializar Firebase
export const app = initializeApp(environment.firebase);

// Obtener instancias de los servicios de Firebase
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Función para obtener la configuración del host y puerto de un emulador
const getEmulatorConfig = (emulator: string | EmulatorConfig | undefined, defaultPort: number) => {
  if (!emulator) return null;
  
  if (typeof emulator === 'string') {
    return { host: 'localhost', port: defaultPort };
  }
  
  return {
    host: emulator.host || 'localhost',
    port: emulator.port || defaultPort
  };
};

// Configurar emuladores en desarrollo
if (!environment.production) {
  try {
    // Configurar emuladores
    if (environment.firebase.emulators) {
      const emulators = environment.firebase.emulators;
      
      // Auth emulator
      const authConfig = getEmulatorConfig(emulators.auth, 9099);
      if (authConfig) {
        try {
          connectAuthEmulator(
            auth, 
            `http://${authConfig.host}:${authConfig.port}`,
            { disableWarnings: true }
          );
          console.log(`✅ Auth emulator conectado en http://${authConfig.host}:${authConfig.port}`);
        } catch (error) {
          console.error('❌ Error conectando al emulador de Auth:', error);
        }
      }

      // Firestore emulator
      const firestoreConfig = getEmulatorConfig(emulators.firestore, 8080);
      if (firestoreConfig) {
        try {
          connectFirestoreEmulator(
            firestore,
            firestoreConfig.host,
            firestoreConfig.port
          );
          console.log(`✅ Firestore emulator conectado en http://${firestoreConfig.host}:${firestoreConfig.port}`);
        } catch (error) {
          console.error('❌ Error conectando al emulador de Firestore:', error);
        }
      }

      // Storage emulator
      const storageConfig = getEmulatorConfig(emulators.storage, 9199);
      if (storageConfig) {
        try {
          connectStorageEmulator(
            storage,
            storageConfig.host,
            storageConfig.port
          );
          console.log(`✅ Storage emulator conectado en http://${storageConfig.host}:${storageConfig.port}`);
        } catch (error) {
          console.error('❌ Error conectando al emulador de Storage:', error);
        }
      }
    }
    console.log('✅ Firebase emuladores configurados correctamente');
  } catch (error) {
    console.warn('⚠️ Error al conectar con los emuladores de Firebase:', error);
  }
}

// Las instancias ya están exportadas individualmente al inicio del archivo
