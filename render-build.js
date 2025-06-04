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

// 3. Instalar dependencias con --legacy-peer-deps para evitar conflictos
console.log('\n3. Instalando dependencias...');
runCommand('npm install --legacy-peer-deps --no-fund --no-audit');

// 4. Instalar angular/cli globalmente si no está instalado
console.log('\n4. Verificando Angular CLI...');
const angularCliPath = path.join(process.cwd(), 'node_modules', '@angular', 'cli', 'bin', 'ng');
if (!fs.existsSync(angularCliPath)) {
  console.log('Angular CLI no encontrado, instalando...');
  runCommand('npm install -g @angular/cli@17 --no-fund --no-audit');
}

// 5. Verificar instalación de angular-devkit/build-angular
console.log('\n5. Verificando @angular-devkit/build-angular...');
const buildAngularPath = path.join(process.cwd(), 'node_modules', '@angular-devkit', 'build-angular');
if (!fs.existsSync(buildAngularPath)) {
  console.log('@angular-devkit/build-angular no encontrado, instalando...');
  runCommand('npm install --save-dev @angular-devkit/build-angular@17 --no-fund --no-audit');
}

// 6. Instalar dependencias de pares
console.log('\n6. Instalando dependencias de pares...');
runCommand('npm install --legacy-peer-deps');

// 7. Construir la aplicación
console.log('\n7. Construyendo la aplicación...');
runCommand('ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all');

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
