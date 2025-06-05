const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Iniciando construcción en Render (Angular 17) ===');

// Función para ejecutar comandos de forma síncrona
function runCommand(command, options = {}) {
  console.log(`\n📌 ${command}`);
  try {
    const defaultOptions = { 
      stdio: 'inherit',
      shell: true,
      ...options
    };
    const result = execSync(command, { ...defaultOptions, stdio: 'pipe' }).toString();
    if (result) console.log(result);
    return true;
  } catch (error) {
    console.error(`\n❌ Error al ejecutar: ${command}\n${error.message}`);
    process.exit(1);
  }
}

async function main() {
  try {
    // 1. Mostrar información del sistema
    console.log('\n1. 🖥️  Información del sistema:');
    runCommand('node -v');
    runCommand('npm -v');

    // 2. Limpiar instalación previa
    console.log('\n2. 🧹 Limpiando instalación previa...');
    runCommand('if exist node_modules rmdir /s /q node_modules');
    runCommand('if exist .angular rmdir /s /q .angular');
    runCommand('if exist package-lock.json del /f package-lock.json');
    runCommand('npm cache clean --force');

    // 3. Configurar npm
    console.log('\n3. ⚙️  Configurando npm...');
    runCommand('npm config set legacy-peer-deps true');
    runCommand('npm config set fund false');
    runCommand('npm config set audit false');

    // 4. Instalar dependencias
    console.log('\n4. 📦 Instalando dependencias...');
    runCommand('npm install --include=dev --legacy-peer-deps --no-fund --no-audit');

    // 5. Verificar instalación de @angular-devkit/build-angular
    console.log('\n5. 🔍 Verificando instalación de paquetes críticos...');
    const requiredPackages = [
      '@angular-devkit/build-angular',
      '@angular/cli',
      '@angular/compiler-cli'
    ];

    for (const pkg of requiredPackages) {
      const pkgPath = path.join('node_modules', ...pkg.split('/'));
      if (!fs.existsSync(pkgPath)) {
        console.log(`⚠️  ${pkg} no encontrado, instalando...`);
        runCommand(`npm install --save-dev ${pkg}@17 --no-fund --no-audit --force`);
      }
    }

    // 6. Construir la aplicación
    console.log('\n6. 🏗️  Construyendo la aplicación...');
    runCommand('npx ng version');
    
    // Construir con la configuración de producción
    const buildCmd = 'npx ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all';
    runCommand(buildCmd);

    // 7. Configurar redirecciones para SPA
    console.log('\n7. 🔄 Configurando redirecciones para SPA...');
    const distPath = path.join(process.cwd(), 'dist', 'gesapp-angular');
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }

    // Crear archivo _redirects para manejar rutas en SPA
    fs.writeFileSync(
      path.join(distPath, '_redirects'),
      '/* /index.html 200'
    );

    console.log('\n✅ ¡Construcción completada exitosamente!');
    console.log('📦 La aplicación está lista en la carpeta dist/gesapp-angular');

  } catch (error) {
    console.error('\n❌ Error durante la construcción:', error);
    process.exit(1);
  }
}

// Ejecutar el proceso principal
main();
