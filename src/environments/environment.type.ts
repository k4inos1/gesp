/**
 * Configuración para reCAPTCHA
 */
export interface RecaptchaConfig {
  /** Clave del sitio para reCAPTCHA */
  siteKey: string;
  /** (Opcional) Tema claro/oscuro */
  theme?: 'light' | 'dark';
  /** (Opcional) Tamaño del widget */
  size?: 'normal' | 'compact' | 'invisible';
}

/**
 * Configuración de MQTT
 */
interface MqttConfig {
  /** Host del servidor MQTT */
  host: string;
  /** Puerto del servidor MQTT */
  port: number;
  /** Ruta base para MQTT */
  path: string;
  /** (Opcional) Usuario para autenticación */
  username?: string;
  /** (Opcional) Contraseña para autenticación */
  password?: string;
  /** (Opcional) Prefijo para los tópicos */
  topicPrefix?: string;
}

/**
 * Configuración de Firebase
 */
interface FirebaseConfig {
  /** Clave API de Firebase */
  apiKey: string;
  /** Dominio de autenticación */
  authDomain: string;
  /** ID del proyecto */
  projectId: string;
  /** Bucket de almacenamiento */
  storageBucket: string;
  /** ID del remitente de mensajería */
  messagingSenderId: string;
  /** ID de la aplicación */
  appId: string;
  /** (Opcional) ID de medición para Analytics */
  measurementId?: string;
  /** (Opcional) Configuración de emuladores */
  emulators?: {
    auth?: string;
    firestore?: string | { host: string; port: number };
    storage?: string | { host: string; port: number };
    functions?: string | { host: string; port: number };
  };
}

/**
 * Configuración de Google
 */
interface GoogleConfig {
  /** ID de cliente de Google OAuth */
  clientId: string;
  /** (Opcional) Dominios permitidos para inicio de sesión */
  hostedDomain?: string;
}

/**
 * Configuración de la aplicación
 */
export interface Environment {
  /** Indica si la aplicación está en modo producción */
  production: boolean;
  /** URL base de la API */
  apiUrl: string;
  /** Configuración de Firebase */
  firebase: FirebaseConfig;
  /** Configuración de MQTT */
  mqtt: MqttConfig;
  /** Configuración de reCAPTCHA */
  recaptcha: RecaptchaConfig;
  /** (Opcional) Versión de la aplicación */
  version?: string;
  /** (Opcional) Entorno de despliegue */
  envName?: 'development' | 'staging' | 'production';
  /** (Opcional) Tiempo máximo de espera para peticiones HTTP (ms) */
  httpTimeout?: number;
  /** (Opcional) Configuración de logs */
  logging?: {
    /** Nivel de log (0 = desactivado, 1 = error, 2 = warn, 3 = info, 4 = debug) */
    level: number;
    /** Habilitar/deshabilitar logs en consola */
    console: boolean;
    /** Habilitar/deshabilitar logs remotos */
    remote: boolean;
  };
  
  /** Configuración de Google */
  google?: GoogleConfig;
}
