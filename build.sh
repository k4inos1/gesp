#!/bin/bash
set -e  # Detener el script en caso de error

echo "=== Iniciando construcción de la aplicación Angular ==="

# Instalar dependencias
echo "1. Instalando dependencias..."
npm install

# Construir la aplicación
echo "2. Construyendo la aplicación para producción..."
npx ng build --configuration production --output-path=dist/gesapp-angular --output-hashing=all

echo "✅ Construcción completada exitosamente"
