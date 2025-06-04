#!/bin/bash

# Instalar Angular CLI globalmente
echo "Instalando Angular CLI..."
npm install -g @angular/cli@17

# Instalar dependencias
echo "Instalando dependencias..."
npm install

# Construir la aplicación
echo "Construyendo la aplicación..."
npm run build:prod

echo "✅ Construcción completada"
