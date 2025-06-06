# GesApp - Sistema de Gestión

Aplicación web desarrollada con Angular 17 y Firebase para la gestión integral de procesos.

## 🌍 Entornos

La aplicación soporta múltiples entornos de despliegue:

- **Desarrollo (development)**: Para desarrollo local con emuladores
- **Staging (staging)**: Entorno de pre-producción para pruebas
- **Producción (production)**: Entorno de producción

Cada entorno tiene su propia configuración de Firebase, reglas de seguridad y opciones de despliegue.

## 🔧 Configuración de Entornos

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Entorno (development, staging, production)
NODE_ENV=development

# Configuración de Firebase
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu-proyecto
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
FIREBASE_MEASUREMENT_ID=tu_measurement_id

# Configuración de API
API_URL=http://localhost:5001/tu-proyecto/us-central1/api
```

### Configuración de Firebase

1. Inicia sesión en Firebase:
   ```bash
   firebase login
   ```

2. Inicializa Firebase (si es necesario):
   ```bash
   firebase init
   ```

3. Selecciona las características necesarias (Hosting, Functions, Firestore, etc.)

## 🚀 Empezando

### Prerrequisitos

- Node.js >= 20.0.0
- npm >= 10.0.0
- Angular CLI >= 17.0.0
- Firebase CLI (opcional, para emuladores)

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/gesapp-angular.git
   cd gesapp-angular
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar entornos:
   - Copiar `.env.example` a `.env` y configurar las variables necesarias
   - Asegurarse de que los archivos de entorno estén configurados correctamente

## 🛠️ Desarrollo

### Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start
# o
npm run dev

# Construir para desarrollo
npm run build

# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas e2e
npm run e2e

# Lint del código
npm run lint
```

### Comandos de Despliegue

```bash
# Construir para producción
npm run build:prod

# Desplegar a Firebase Hosting (producción)
npm run deploy:prod:hosting

# Desplegar solo las funciones (producción)
npm run deploy:prod:functions

# Desplegar todo (hosting + funciones) a producción
npm run deploy:prod

# Desplegar a Staging
npm run deploy:staging
```

### Emuladores

```bash
# Iniciar emuladores de Firebase
npm run emulators

# Iniciar emuladores con depuración
npm run emulators:all
```

### Comandos útiles

- **Iniciar servidor de desarrollo**:
  ```bash
  npm start
  # o
  npm run dev
  ```

- **Construir para desarrollo**:
  ```bash
  npm run build
  ```

- **Ejecutar pruebas**:
  ```bash
  npm test
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

## 🌐 Entornos

### Desarrollo

Para desarrollo local con emuladores de Firebase:

```bash
# Iniciar emuladores de Firebase
firebase emulators:start

# En otra terminal, iniciar la aplicación
npm run dev
```

### Staging

Para probar en un entorno similar a producción:

```bash
# Construir para staging
npm run build:staging

# Servir la versión de staging
npm run staging
```

### Producción

Para construir y servir la versión de producción:

```bash
# Construir para producción
npm run build:prod

# Servir la versión de producción (solo para pruebas locales)
npm run preview:prod
```

## 🔒 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Firebase
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Otras configuraciones
API_URL=http://localhost:3000/api
RECAPTCHA_SITE_KEY=tu_clave_recaptcha
```

## 🧪 Pruebas

### Ejecutar pruebas unitarias

```bash
npm test
```

### Ejecutar pruebas E2E

```bash
npm run e2e
```

## 🚀 Despliegue en Producción

### Requisitos previos

1. Asegúrate de tener instalado:
   - Node.js >= 20.0.0
   - Firebase CLI (`npm install -g firebase-tools`)
   - Estar autenticado en Firebase (`firebase login`)

### Configuración de Firebase

1. Inicializa Firebase en tu proyecto (si no lo has hecho):
   ```bash
   firebase init
   ```
   
   Selecciona:
   - Hosting: Configure files for Firebase Hosting
   - Firestore: Configure security rules and indexes files
   - Storage: Configure security rules
   - Functions: Configure a Cloud Functions directory

### Variables de entorno de producción

Asegúrate de que el archivo `src/environments/environment.prod.ts` tenga las credenciales correctas de Firebase y otras configuraciones de producción.

### Script de despliegue automatizado

Hemos preparado un script para facilitar el despliegue:

1. Dale permisos de ejecución al script (solo una vez):
   ```bash
   chmod +x deploy-prod.sh
   ```

2. Ejecuta el script de despliegue:
   ```bash
   ./deploy-prod.sh
   ```

   Este script realizará las siguientes acciones:
   - Construir la aplicación para producción
   - Desplegar en Firebase Hosting
   - Desplegar reglas e índices de Firestore
   - Desplegar reglas de Storage
   - Desplegar funciones de Firebase (si existen)

### Despliegue manual

Si prefieres desplegar manualmente, sigue estos pasos:

1. Construir la aplicación para producción:
   ```bash
   npm run build:prod
   ```

2. Desplegar en Firebase:
   ```bash
   # Solo hosting
   firebase deploy --only hosting
   
   # Solo Firestore (reglas e índices)
   firebase deploy --only firestore
   
   # Solo Storage (reglas)
   firebase deploy --only storage
   
   # Solo funciones
   firebase deploy --only functions
   
   # Todo
   firebase deploy
   ```

### Verificación después del despliegue

1. Abre la URL de producción: https://gesapp-6fe80.web.app
2. Verifica la consola del navegador en busca de errores
3. Prueba las funcionalidades clave:
   - Autenticación de usuarios
   - Lectura/escritura en Firestore
   - Subida de archivos a Storage
   - Llamadas a funciones de Firebase

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

1. Haz un Fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
