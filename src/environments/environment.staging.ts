import { Environment } from './environment.type';

/**
 * Configuración para staging (pre-producción)
 * 
 * Nota: Este entorno se utiliza para pruebas en un entorno similar a producción.
 * Utiliza servicios reales pero con datos de prueba.
 */
export const environment: Environment = {
  production: true, // true porque es un entorno de pre-producción
  envName: 'staging',
  version: '1.0.0-rc.1',
  apiUrl: 'https://staging.gesapp-backend.onrender.com/api',
  httpTimeout: 45000, // 45 segundos
  
  // Configuración de Firebase (proyecto de staging)
  firebase: {
    apiKey: "AIzaSyAFCuTOFG2KYJICD2xNGTSj857FmZgtihI", // Reemplaza con las credenciales de staging
    authDomain: "gesapp-staging.firebaseapp.com",
    projectId: "gesapp-staging",
    storageBucket: "gesapp-staging.appspot.com",
    messagingSenderId: "884687252315",
    appId: "1:884687252315:web:fe17c98f8d5ff9364c487e",
    measurementId: "G-XXXXXXXXXX"
  },
  
  // Configuración de MQTT
  mqtt: {
    host: 'staging-mqtt.gesapp.com',
    port: 8883,
    path: '/mqtt',
    username: 'staging-user',
    password: 'staging-password',
    topicPrefix: 'gesapp/staging/'
  },
  
  // Configuración de reCAPTCHA
  recaptcha: {
    siteKey: '6LcK3v8SAAAAAABsODqGqZaStZlDz9YwFHUh_mrZ', // Clave de staging
    theme: 'light',
    size: 'normal'
  },
  
  // Configuración de logs
  logging: {
    level: 3, // info, advertencias y errores
    console: true, // Habilitar logs en consola para depuración
    remote: true // Habilitar envío de logs remotos
  }
};
