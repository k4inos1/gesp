import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  apiUrl: '/api',
  firebase: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id'
  },
  mqtt: {
    host: 'localhost',
    port: 8883,
    path: '/mqtt'
  }
};
