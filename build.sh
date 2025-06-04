#!/bin/bash
set -e  # Detener el script en caso de error

echo "=== Iniciando construcción de la aplicación Angular ==="

# Mostrar información de Node.js y npm
echo "1. Versiones:"
echo "   Node: $(node -v)"
echo "   npm: $(npm -v)"

# Instalar dependencias
echo "2. Instalando dependencias..."
npm ci || npm install

# Verificar instalación de Angular CLI
echo "3. Verificando Angular CLI..."
if ! command -v ng &> /dev/null; then
    echo "   Angular CLI no encontrado, instalando globalmente..."
    npm install -g @angular/cli
fi

# Construir la aplicación
echo "4. Construyendo la aplicación para producción..."
./node_modules/.bin/ng version
echo ""
./node_modules/.bin/ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all

echo ""
echo "✅ Construcción completada exitosamente"
