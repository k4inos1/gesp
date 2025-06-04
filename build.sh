#!/bin/bash
set -e  # Detener el script en caso de error

echo "=== Iniciando construcción de la aplicación Angular ==="

# Mostrar información de Node.js y npm
echo "1. Versiones:"
echo "   Node: $(node -v)"
echo "   npm: $(npm -v)"

# Instalar dependencias locales (sin globales)
echo "2. Instalando dependencias locales..."
npm ci --no-fund --no-audit || npm install --no-fund --no-audit

# Instalar Angular CLI localmente si no está presente
if [ ! -f "node_modules/.bin/ng" ]; then
    echo "3. Instalando Angular CLI localmente..."
    npm install --save-dev @angular/cli --no-fund --no-audit
fi

# Construir la aplicación
echo "4. Construyendo la aplicación para producción..."
node --max_old_space_size=8192 ./node_modules/.bin/ng version
echo ""
node --max_old_space_size=8192 ./node_modules/.bin/ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all

echo ""
echo "✅ Construcción completada exitosamente"
