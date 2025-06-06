import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Inicializar la aplicación de Firebase
admin.initializeApp();

// Configuración de entorno
const ENV = process.env['NODE_ENV'] || 'development';

// Interfaz para la configuración de Firebase
interface FirebaseConfig {
  functions: {
    region: string;
    memory: string;
    timeoutSeconds: number;
  };
  firestore: {
    instance: string;
  };
}

// Configuración específica por entorno
const ENV_CONFIG: Record<string, FirebaseConfig> = {
  development: {
    functions: {
      region: 'us-central1',
      memory: '256MB',
      timeoutSeconds: 540
    },
    firestore: {
      instance: 'default'
    }
  },
  staging: {
    functions: {
      region: 'us-central1',
      memory: '512MB',
      timeoutSeconds: 540
    },
    firestore: {
      instance: 'staging-instance'
    }
  },
  production: {
    functions: {
      region: 'us-central1',
      memory: '1GB',
      timeoutSeconds: 540
    },
    firestore: {
      instance: 'production-instance'
    }
  }
};

// Obtener configuración para el entorno actual
const CONFIG = ENV_CONFIG[ENV as keyof typeof ENV_CONFIG] || ENV_CONFIG['development'];

// Configuración de Firestore
const firestoreInstance = admin.firestore();
if (CONFIG.firestore?.instance) {
  firestoreInstance.settings({
    databaseId: CONFIG.firestore.instance
  });
}

// Importar configuración y utilidades
import {
  logger,
  handleError,
  AppError,
  APP_CONFIG,
  CORS_CONFIG,
} from './src/config';

// Interfaz para el perfil de usuario
interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string;
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
  roles: {
    [key: string]: boolean;
  };
}

/**
 * Función que se activa cuando se crea un nuevo usuario en Firebase Authentication
 * Crea automáticamente un documento en Firestore con la información del usuario
 */
export const createUserProfile = functions
  .region(APP_CONFIG.region)
  .auth.user()
  .onCreate(async (userRecord: admin.auth.UserRecord): Promise<void> => {
    logger.info(
      `Iniciando creación de perfil para usuario: ${userRecord.email}`
    );

    // Extraer información del usuario
    const { uid, email, displayName, photoURL, emailVerified } = userRecord;

    // Verificar si el correo electrónico está verificado
    if (!emailVerified) {
      logger.warn(`El correo electrónico ${email} no está verificado`);
      // Podrías enviar un correo de verificación aquí si lo deseas
    }
    try {
      // Crear objeto de perfil de usuario
      const userProfile: UserProfile = {
        uid,
        email: email || null,
        displayName: displayName || (email ? email.split('@')[0] : 'Usuario'),
        photoURL: photoURL || `https://ui-avatars.com/api/?name=${
          encodeURIComponent(displayName || email || 'U')
        }&background=random`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        roles: {
          user: true, // Rol por defecto para todos los usuarios
        },
      };

      // Guardar el perfil del usuario en Firestore
      await admin
        .firestore()
        .collection('users')
        .doc(uid)
        .set(userProfile, { merge: true });

      logger.info(`✅ Perfil de usuario creado exitosamente para: ${email}`);
    } catch (error: unknown) {
      logger.error('❌ Error al crear el perfil del usuario:', error);
      // Podrías enviar una notificación aquí si algo falla
      throw new functions.https.HttpsError(
        'internal',
        'Error al crear el perfil del usuario',
        error instanceof Error ? error.message : 'Error desconocido'
      );
    }
  });

/**
 * Función HTTP de ejemplo que devuelve un mensaje de bienvenida
 * Puedes acceder a ella en: https://us-central1-<project-id>.cloudfunctions.net/helloWorld
 */
export const helloWorld = functions
  .region(APP_CONFIG.region)
  .runWith({
    timeoutSeconds: 30,
    memory: '256MB',
  })
  .https.onRequest(async (request, response) => {
    // Configurar cabeceras CORS
    Object.entries(CORS_CONFIG).forEach(([key, value]) => {
      if (key === 'origin' && typeof value === 'boolean') {
        response.set('Access-Control-Allow-Origin', value ? '*' : '');
      } else if (Array.isArray(value)) {
        response.set(key, value.join(','));
      } else if (typeof value === 'string') {
        response.set(key, value);
      }
    });

    // Manejar solicitud de pre-vuelo (preflight) CORS
    if (request.method === 'OPTIONS') {
      response.status(204).send('');
      return;
    }

    try {
      // Validar método HTTP
      if (request.method !== 'GET') {
        response.status(405).json({
          success: false,
          error: {
            code: 'method-not-allowed',
            message: 'Método no permitido. Usa GET.',
          },
        });
        return;
      }

      // Obtener parámetros de consulta
      const { nombre = 'Mundo' } = request.query;

      // Registrar la solicitud
      logger.info(
        `Solicitud recibida de: ${request.ip} - ${request.headers['user-agent']}`
      );

      // Simular una operación asíncrona
      const resultado = await new Promise(resolve => {
        setTimeout(() => {
          resolve(`¡Hola, ${nombre}!`);
        }, 100);
      });

      // Enviar respuesta exitosa
      response.status(200).json({
        success: true,
        message: resultado,
        timestamp: new Date().toISOString(),
        environment: process.env['NODE_ENV'] || 'development',
        version: process.env['npm_package_version'] || '1.0.0',
      });
    } catch (error: unknown) {
      // Manejar errores de manera consistente
      const appError: AppError =
        error instanceof Error ? error : new Error('Error desconocido');
      handleError(appError, response);
    }
  });

/**
 * Función de ejemplo para obtener información del usuario actual
 * Requiere autenticación
 */
export const getUserProfile = functions
  .region(APP_CONFIG.region)
  .https.onCall(async (data, context) => {
    // Verificar autenticación
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Debes iniciar sesión para acceder a este recurso.'
      );
    }

    const userId = context.auth.uid;
    logger.info(`Obteniendo perfil del usuario: ${userId}`);

    try {
      // Obtener datos del usuario de Firestore
      const userDoc = await admin
        .firestore()
        .collection('users')
        .doc(userId)
        .get();

      if (!userDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'No se encontró el perfil del usuario.'
        );
      }

      // Obtener datos del usuario de Auth para asegurar que están actualizados
      const userRecord = await admin.auth().getUser(userId);
      const userData = userDoc.data();
      // Combinar datos de Auth y Firestore
      const profile = {
        uid: userRecord.uid,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        displayName:
          userData?.['displayName'] || userRecord.displayName || 'Usuario',
        photoURL: userData?.['photoURL'] || userRecord.photoURL,
        roles: userData?.['roles'] || { user: true },
        metadata: {
          creationTime: userRecord.metadata.creationTime,
          lastSignInTime: userRecord.metadata.lastSignInTime,
          lastRefreshTime: userRecord.metadata.lastRefreshTime,
        },
        // No incluir información sensible
      };

      return {
        success: true,
        data: profile,
      };
    } catch (error: unknown) {
      logger.error('Error al obtener el perfil del usuario:', error);
      let errorMessage = 'Error interno del servidor';
      if (process.env['NODE_ENV'] === 'development' && error instanceof Error) {
        errorMessage = error.message;
      }
      throw new functions.https.HttpsError(
        'internal',
        'Ocurrió un error al obtener el perfil del usuario.',
        errorMessage
      );
    }
  });
