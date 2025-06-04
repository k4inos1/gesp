const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Iniciando construcción en Render ===');

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

// 2. Limpiar caché de npm
console.log('\n2. Limpiando caché de npm...');
runCommand('npm cache clean --force');

// 3. Instalar Angular CLI globalmente primero
console.log('\n3. Instalando Angular CLI globalmente...');
runCommand('npm install -g @angular/cli@17 --no-fund --no-audit');

// 4. Instalar dependencias principales de Angular primero
console.log('\n4. Instalando dependencias principales de Angular...');
runCommand('npm install @angular/animations@17 @angular/common@17 @angular/compiler@17 @angular/core@17 @angular/forms@17 @angular/platform-browser@17 @angular/platform-browser-dynamic@17 @angular/router@17 --save --legacy-peer-deps --no-fund --no-audit');

// 5. Instalar dependencias de desarrollo
console.log('\n5. Instalando dependencias de desarrollo...');
runCommand('npm install --save-dev @angular-devkit/build-angular@17 @angular/cli@17 @angular/compiler-cli@17 typescript@~5.3.0 --legacy-peer-deps --no-fund --no-audit');

// 6. Instalar el resto de dependencias
console.log('\n6. Instalando el resto de dependencias...');
runCommand('npm install --legacy-peer-deps --no-fund --no-audit');

// 7. Construir la aplicación usando npx para asegurar que usamos el CLI local
console.log('\n7. Construyendo la aplicación...');
runCommand('npx ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all');

// 8. Crear archivo _redirects para SPA
console.log('\n8. Configurando redirecciones para SPA...');
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
