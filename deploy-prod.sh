#!/bin/bash

# Script para desplegar la aplicación en producción

# Colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Iniciando despliegue en producción...${NC}"

# Paso 1: Construir la aplicación para producción
echo -e "${YELLOW}🔨 Construyendo la aplicación para producción...${NC}"
npm run build:prod

# Verificar si la construcción fue exitosa
if [ $? -ne 0 ]; then
    echo -e "❌ ${RED}Error al construir la aplicación. Abortando despliegue.${NC}"
    exit 1
fi

# Paso 2: Desplegar en Firebase Hosting
echo -e "${YELLOW}☁️  Desplegando en Firebase Hosting...${NC}"
firebase deploy --only hosting

# Verificar si el despliegue fue exitoso
if [ $? -ne 0 ]; then
    echo -e "❌ ${RED}Error al desplegar en Firebase Hosting.${NC}"
    exit 1
fi

# Paso 3: Desplegar reglas de Firestore
echo -e "${YELLOW}📚 Desplegando reglas de Firestore...${NC}"
firebase deploy --only firestore:rules

# Paso 4: Desplegar índices de Firestore
echo -e "${YELLOW}📊 Desplegando índices de Firestore...${NC}"
firebase deploy --only firestore:indexes

# Paso 5: Desplegar reglas de Storage
echo -e "${YELLOW}💾 Desplegando reglas de Storage...${NC}"
firebase deploy --only storage:rules

# Paso 6: Desplegar funciones (si existen)
if [ -d "functions" ]; then
    echo -e "${YELLOW}⚙️  Desplegando funciones de Firebase...${NC}"
    cd functions
    npm install
    cd ..
    firebase deploy --only functions
fi

echo -e "\n${GREEN}✅ ¡Despliegue completado con éxito!${NC}"
echo -e "${GREEN}🌐 URL de producción: https://gesapp-6fe80.web.app${NC}"
