const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Starting build on Render (Angular 17) ===');

// Function to run commands synchronously
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
    // 1. Show system information
    console.log('\n1. 🖥️  System information:');
    runCommand('node -v');
    runCommand('npm -v');

    // 2. Clean previous installation (cross-platform)
    console.log('\n2. 🧹 Cleaning previous installation...');
    const isWindows = process.platform === 'win32';
    
    // Remove node_modules
    if (fs.existsSync('node_modules')) {
      if (isWindows) {
        runCommand('rmdir /s /q node_modules');
      } else {
        runCommand('rm -rf node_modules');
      }
    }
    
    // Remove .angular directory
    if (fs.existsSync('.angular')) {
      if (isWindows) {
        runCommand('rmdir /s /q .angular');
      } else {
        runCommand('rm -rf .angular');
      }
    }
    
    // Remove package-lock.json
    if (fs.existsSync('package-lock.json')) {
      if (isWindows) {
        runCommand('del /f package-lock.json');
      } else {
        runCommand('rm -f package-lock.json');
      }
    }
    
    // Clean npm cache
    runCommand('npm cache clean --force');

    // 3. Configure npm
    console.log('\n3. ⚙️  Configuring npm...');
    runCommand('npm config set legacy-peer-deps true');
    runCommand('npm config set fund false');
    runCommand('npm config set audit false');

    // 4. Install dependencies
    console.log('\n4. 📦 Installing dependencies...');
    runCommand('npm install --include=dev --legacy-peer-deps --no-fund --no-audit');

    // 5. Verify installation of @angular-devkit/build-angular
    console.log('\n5. 🔍 Verifying critical package installations...');
    const requiredPackages = [
      '@angular-devkit/build-angular',
      '@angular/cli',
      '@angular/compiler-cli'
    ];

    for (const pkg of requiredPackages) {
      const pkgPath = path.join('node_modules', ...pkg.split('/'));
      if (!fs.existsSync(pkgPath)) {
        console.log(`⚠️  ${pkg} not found, installing...`);
        runCommand(`npm install --save-dev ${pkg}@17 --no-fund --no-audit --force`);
      }
    }

    // 6. Build the application
    console.log('\n6. 🛠️  Building the application...');
    runCommand('npx ng version');
    
    // Build with production configuration
    const buildCmd = 'npx ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all';
    runCommand(buildCmd);

    // 7. Configure redirects for SPA
    console.log('\n7. 🔄 Configuring redirects for SPA...');
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
