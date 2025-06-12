import { Environment } from './environment.type';

/**
 * Configuración para producción
 * 
 * Nota: Esta configuración se utiliza al construir la aplicación para producción.
 * Asegúrate de que todas las URLs y credenciales sean las correctas para producción.
 */
export const environment: Environment = {
  production: true,
  envName: 'production',
  version: '1.0.0',
  apiUrl: 'https://gesapp-backend.onrender.com/api',
  httpTimeout: 60000, // 60 segundos
  
  // Configuración de Firebase
  firebase: {
    apiKey: "AIzaSyAFCuTOFG2KYJICD2xNGTSj857FmZgtihI",
    authDomain: "gesapp-6fe80.firebaseapp.com",
    projectId: "gesapp-6fe80",
    storageBucket: "gesapp-6fe80.appspot.com",
    messagingSenderId: "884687252315",
    appId: "1:884687252315:web:fe17c98f8d5ff9364c487e",
    measurementId: "G-MMNRM12MH9"
  },
  
  // Configuración de MQTT
  mqtt: {
    host: 'mqtt.gesapp.com',
    port: 8883,
    path: '/mqtt',
    // Nota: En producción, es recomendable usar autenticación
    // username: 'production-user',
    // password: 'your-secure-password',
    topicPrefix: 'gesapp/prod/'
  },
  
  // Configuración de reCAPTCHA
  recaptcha: {
    siteKey: '6LdaqFcrAAAAALAyH_t9NOfxd-N7wPB9GwAwCf7e', // Reemplaza con tu clave de producción
    theme: 'light',
    size: 'normal'
  },
  
  // Configuración de logs
  logging: {
    level: 2, // Solo errores y advertencias en producción
    console: false, // Deshabilitar logs en consola en producción
    remote: true // Habilitar envío de logs remotos
  },
  
  // Configuración de Google
  google: {
    clientId: '884687252315-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    hostedDomain: 'gesapp-6fe80.firebaseapp.com' // Dominio de Firebase Auth
  }
};