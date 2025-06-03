import { Environment } from './environment.type';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://api.gesapp.com',
  firebase: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id'
  },
  mqtt: {
    host: 'mqtt.gesapp.com',
    port: 8883,
    path: '/mqtt'
  }
};
