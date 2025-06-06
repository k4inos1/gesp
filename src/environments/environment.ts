import { Environment } from './environment.type';

/**
 * Configuración para desarrollo local con emuladores
 * 
 * Nota: Esta configuración es específica para desarrollo con emuladores locales.
 * Asegúrate de que los emuladores de Firebase estén en ejecución.
 */
export const environment: Environment = {
  production: false,
  envName: 'development',
  version: '0.1.0-dev',
  apiUrl: 'http://localhost:4200/api',
  httpTimeout: 30000, // 30 segundos
  
  // Configuración de Firebase
  firebase: {
    apiKey: 'demo-gesapp-key', // Clave de demostración para desarrollo
    authDomain: 'localhost',
    projectId: 'demo-gesapp',
    storageBucket: 'demo-gesapp.appspot.com',
    messagingSenderId: '000000000000',
    appId: 'demo-gesapp-app-id',
    measurementId: 'G-XXXXXXXXXX',
    // Configuración de emuladores
    emulators: {
      auth: 'http://localhost:9099',
      firestore: { host: 'localhost', port: 8080 },
      storage: { host: 'localhost', port: 9199 },
      functions: { host: 'localhost', port: 5001 }
    }
  },
  
  // Configuración de MQTT
  mqtt: {
    host: 'localhost',
    port: 8883,
    path: '/mqtt',
    username: 'demo',
    password: 'demo123',
    topicPrefix: 'gesapp/dev/'
  },
  
  // Configuración de reCAPTCHA
  recaptcha: {
    siteKey: '6LdaqFcrAAAAALAyH_t9NOfxd-N7wPB9GwAwCf7e', // Clave de sitio para desarrollo
    theme: 'light',
    size: 'normal'
  },
  
  // Configuración de logs
  logging: {
    level: 4, // debug
    console: true,
    remote: false
  }
};