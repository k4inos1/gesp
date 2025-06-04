import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  apiUrl: '/api',
  firebase: {
    apiKey: "AIzaSyAFCuTOFG2KYJICD2xNGTSj857FmZgtihI",
    authDomain: "gesapp-6fe80.firebaseapp.com",
    projectId: "gesapp-6fe80",
    storageBucket: "gesapp-6fe80.firebasestorage.app",
    messagingSenderId: "884687252315",
    appId: "1:884687252315:web:fe17c98f8d5ff9364c487e",
    measurementId: "G-MMNRM12MH9"
  },
  mqtt: {
    host: 'localhost',
    port: 8883,
    path: '/mqtt'
  }
};
