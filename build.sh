#!/bin/bash
set -e  # Detener el script en caso de error

echo "=== Iniciando construcción de la aplicación Angular ==="

# Mostrar información de Node.js y npm
echo "1. Versiones:"
echo "   Node: $(node -v)"
echo "   npm: $(npm -v)"

# Instalar dependencias locales
echo "2. Instalando dependencias..."
npm ci --no-fund --no-audit --no-optional || npm install --no-fund --no-audit --no-optional

# Instalar Angular CLI localmente si no está presente
if [ ! -d "node_modules/@angular/cli" ]; then
    echo "3. Instalando Angular CLI localmente..."
    npm install --save-dev @angular/cli@17.3.0 --no-fund --no-audit
fi

# Verificar instalación de Angular CLI
echo "4. Verificando instalación de Angular CLI..."
npm list @angular/cli || npm install @angular/cli@17.3.0 --save-dev --no-fund --no-audit

# Construir la aplicación
echo "5. Construyendo la aplicación para producción..."
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng version
echo ""
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all

echo ""
echo "✅ Construcción completada exitosamente"
