// Declaración de tipos para variables de entorno
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'staging' | 'production';
    GOOGLE_APPLICATION_CREDENTIALS: string;
    LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';

    // Configuración de emuladores
    FIRESTORE_EMULATOR_HOST?: string;
    FIREBASE_AUTH_EMULATOR_HOST?: string;
    FIREBASE_STORAGE_EMULATOR_HOST?: string;
    FUNCTIONS_EMULATOR_HOST?: string;

    // Otras variables de entorno personalizadas
    [key: string]: string | undefined;
  }
}

// Extender el objeto global si es necesario
declare global {
  namespace NodeJS {
    interface Global {
      // Agregar propiedades globales aquí si es necesario
    }
  }
}
