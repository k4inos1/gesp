import { Environment } from './environment.type';

// Configuración para desarrollo local con emuladores
export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:4200/api',  // Ajusta según tu configuración de API
  firebase: {
    apiKey: 'demo-gesapp-key',  // Usamos una clave de demostración para desarrollo
    authDomain: 'localhost',
    projectId: 'demo-gesapp',
    storageBucket: 'demo-gesapp.appspot.com',
    messagingSenderId: '000000000000',
    appId: 'demo-gesapp-app-id',
    measurementId: 'G-XXXXXXXXXX'
  },
  mqtt: {
    host: 'localhost',
    port: 8883,
    path: '/mqtt'
  },
  recaptcha: {
    siteKey: '6LdaqFcrAAAAALAyH_t9NOfxd-N7wPB9GwAwCf7e' // Clave de sitio para desarrollo
  }
};

// Nota: Esta configuración es específica para desarrollo con emuladores locales
// Asegúrate de que los emuladores de Firebase estén en ejecución