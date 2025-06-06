import * as functions from 'firebase-functions';

/**
 * Configuración de la aplicación para Firebase Functions
 */

// Configuración de entorno
type ProcessEnv = {
  NODE_ENV?: string;
  LOG_LEVEL?: string;
  [key: string]: string | undefined;
};

const env: ProcessEnv = process.env;
export const ENV = env.NODE_ENV || 'development';

// Configuración de CORS
export const CORS_CONFIG = {
  origin: true, // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials: true
};

// Configuración de logs
const LOG_LEVEL = env.LOG_LEVEL || 'info';

export const logger = {
  info: (...args: unknown[]) => {
    if (['debug', 'info'].includes(LOG_LEVEL)) {
      // eslint-disable-next-line no-console
      console.info('[INFO]', ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (['debug', 'info', 'warn'].includes(LOG_LEVEL)) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args);
  },
  debug: (...args: unknown[]) => {
    if (LOG_LEVEL === 'debug') {
      // eslint-disable-next-line no-console
      console.debug('[DEBUG]', ...args);
    }
  }
};

// Configuración específica por entorno
const ENV_CONFIG = {
  development: {
    timeoutSeconds: 540, // 9 minutos (máximo permitido por Firebase)
    region: 'us-central1',
    firestore: {
      preventDestructiveWrites: true
    },
    auth: {
      allowedDomains: ['localhost']
    }
  },
  staging: {
    timeoutSeconds: 540,
    region: 'us-central1',
    firestore: {
      preventDestructiveWrites: true
    },
    auth: {
      allowedDomains: ['gesapp-staging.web.app', 'staging-gesapp.web.app']
    }
  },
  production: {
    timeoutSeconds: 540,
    region: 'us-central1',
    firestore: {
      preventDestructiveWrites: true
    },
    auth: {
      allowedDomains: ['gesapp-angular.web.app', 'tudominio.com']
    }
  }
};

// Configuración de la aplicación según el entorno actual
export const APP_CONFIG = {
  ...(ENV_CONFIG[ENV as keyof typeof ENV_CONFIG] || ENV_CONFIG.development),
  // Configuración común a todos los entornos
  environment: ENV,
  // Otras configuraciones globales
};

/**
 * Obtiene la configuración de la función HTTP con valores por defecto
 */
export function getFunctionConfig() {
  return {
    timeoutSeconds: 60,
    memory: '256MB',
    region: APP_CONFIG.region
  };
}

/**
 * Maneja errores de manera consistente en las funciones HTTP
 */
export interface AppError extends Error {
  code?: string;
  message: string;
}

export function handleError(error: AppError, response: functions.Response) {
  logger.error('Error en la función:', error);

  let statusCode = 500;
  let errorMessage = 'Error interno del servidor';
  let errorCode = 'internal/unknown-error';

  // Mapear errores comunes
  if (error.code === 'auth/email-already-exists') {
    statusCode = 409;
    errorMessage = 'El correo electrónico ya está en uso';
    errorCode = error.code;
  } else if (error.code === 'auth/user-not-found') {
    statusCode = 404;
    errorMessage = 'Usuario no encontrado';
    errorCode = error.code;
  } else if (error.code === 'auth/invalid-credential') {
    statusCode = 401;
    errorMessage = 'Credenciales inválidas';
    errorCode = error.code;
  } else if (error.code === 'permission-denied') {
    statusCode = 403;
    errorMessage = 'No tienes permiso para realizar esta acción';
    errorCode = error.code;
  } else if (error.code === 'not-found') {
    statusCode = 404;
    errorMessage = 'Recurso no encontrado';
    errorCode = error.code;
  } else if (error.code === 'validation-error') {
    statusCode = 400;
    errorMessage = error.message || 'Error de validación';
    errorCode = error.code;
  }

  // Enviar respuesta de error
  response.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: errorMessage,
      details: env.NODE_ENV === 'development' ? error.message : undefined
    },
    timestamp: new Date().toISOString()
  });
}
