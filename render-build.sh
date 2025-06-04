#!/bin/sh

echo "=== Iniciando construcción en Render ==="

# Mostrar información de Node.js y npm
echo "1. Versiones:"
node -v
npm -v

# Instalar dependencias
echo "2. Instalando dependencias..."
npm install --no-fund --no-audit

# Instalar Angular CLI localmente
echo "3. Instalando Angular CLI localmente..."
npm install --save-dev @angular/cli@17

# Construir la aplicación
echo "4. Construyendo la aplicación para producción..."
npx ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all

echo ""
echo "✅ Construcción completada exitosamente"
