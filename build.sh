#!/bin/bash
set -e  # Detener el script en caso de error

echo "=== Iniciando construcción de la aplicación Angular ==="

# Mostrar información de Node.js y npm
echo "1. Versiones:"
echo "   Node: $(node -v)"
echo "   npm: $(npm -v)"

# Instalar dependencias
echo "2. Instalando dependencias..."
npm install --no-fund --no-audit

# Construir la aplicación
echo "3. Construyendo la aplicación para producción..."
npm run build:prod

echo ""
echo "✅ Construcción completada exitosamente"
