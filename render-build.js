const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Iniciando construcción en Render ===');

// Función para ejecutar comandos de forma síncrona
function runCommand(command) {
  console.log(`Ejecutando: ${command}`);
  try {
    const output = execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error al ejecutar: ${command}`, error);
    process.exit(1);
  }
}

// 1. Mostrar información del sistema
console.log('\n1. Información del sistema:');
runCommand('node -v');
runCommand('npm -v');

// 2. Instalar dependencias
console.log('\n2. Instalando dependencias...');
runCommand('npm install --no-fund --no-audit');

// 3. Verificar si @angular/cli está instalado
console.log('\n3. Verificando Angular CLI...');
const angularCliPath = path.join(process.cwd(), 'node_modules', '@angular', 'cli', 'bin', 'ng');
if (!fs.existsSync(angularCliPath)) {
  console.log('Angular CLI no encontrado, instalando...');
  runCommand('npm install --save-dev @angular/cli@17');
}

// 4. Construir la aplicación
console.log('\n4. Construyendo la aplicación...');
const buildCommand = `node --max_old_space_size=8192 ${angularCliPath} build --configuration production --output-path=dist/gesapp-angular --output-hashing=all`;
runCommand(buildCommand);

console.log('\n✅ Construcción completada exitosamente');
