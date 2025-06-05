const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('=== Iniciando construcción en Render ===');

// Detectar el sistema operativo
const isWindows = os.platform() === 'win32';

// Función para ejecutar comandos de forma síncrona
function runCommand(command, options = {}) {
  console.log(`Ejecutando: ${command}`);
  try {
    const defaultOptions = { 
      stdio: 'inherit',
      shell: true,
      ...options
    };
    execSync(command, defaultOptions);
    return true;
  } catch (error) {
    console.error(`❌ Error al ejecutar: ${command}`, error);
    process.exit(1);
  }
}

// 1. Mostrar información del sistema
console.log('\n1. Información del sistema:');
runCommand('node -v');
runCommand('npm -v');

// 2. Limpiar todo
console.log('\n2. Limpiando instalación previa...');
if (isWindows) {
  runCommand('if exist node_modules rmdir /s /q node_modules');
  runCommand('if exist .angular rmdir /s /q .angular');
  runCommand('if exist package-lock.json del /f package-lock.json');
} else {
  runCommand('rm -rf node_modules .angular package-lock.json');
}
runCommand('npm cache clean --force');

// 3. Instalar Angular CLI globalmente
console.log('\n3. Instalando Angular CLI globalmente...');
runCommand('npm install -g @angular/cli@17 --no-fund --no-audit');

// 4. Instalar dependencias principales de Angular
console.log('\n4. Instalando dependencias principales de Angular...');
runCommand('npm install --save @angular/animations@17 @angular/common@17 @angular/compiler@17 @angular/core@17 @angular/forms@17 @angular/platform-browser@17 @angular/platform-browser-dynamic@17 @angular/router@17 --legacy-peer-deps --no-fund --no-audit');

// 5. Instalar dependencias de desarrollo críticas
console.log('\n5. Instalando dependencias de desarrollo críticas...');
runCommand('npm install --save-dev @angular-devkit/build-angular@17 @angular-devkit/core@17 @angular-devkit/schematics@17 @angular/cli@17 @angular/compiler-cli@17 typescript@~5.3.0 --legacy-peer-deps --no-fund --no-audit');

// 6. Instalar el resto de dependencias
console.log('\n6. Instalando el resto de dependencias...');
runCommand('npm install --legacy-peer-deps --no-fund --no-audit');

// 7. Verificar instalación de @angular-devkit/build-angular
console.log('\n7. Verificando instalación de @angular-devkit/build-angular...');
const buildAngularPath = path.join(process.cwd(), 'node_modules', '@angular-devkit', 'build-angular');
if (!fs.existsSync(buildAngularPath)) {
  console.log('@angular-devkit/build-angular no se instaló correctamente, intentando instalar de nuevo...');
  runCommand('npm install --save-dev @angular-devkit/build-angular@17 --no-fund --no-audit --legacy-peer-deps');
}

// 8. Construir la aplicación usando npx para asegurar que usamos el CLI local
console.log('\n8. Construyendo la aplicación...');
try {
  // Primero intentamos con npx
  runCommand('npx ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all');
} catch (error) {
  console.log('Error al construir con npx, intentando con npm run build...');
  // Si falla, intentamos con npm run build
  runCommand('npm run build:prod');
}

// 9. Crear archivo _redirects para SPA
console.log('\n9. Configurando redirecciones para SPA...');
const distPath = path.join(process.cwd(), 'dist', 'gesapp-angular');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Crear archivo _redirects para manejar rutas en SPA
fs.writeFileSync(
  path.join(distPath, '_redirects'),
  '/* /index.html 200'
);

console.log('\n✅ Construcción completada exitosamente');
console.log('📦 La aplicación está lista en la carpeta dist/gesapp-angular');
