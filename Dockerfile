# Etapa de construcción
FROM node:20.19.2-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

COPY . .

# Instalar dependencias
RUN npm install -g @angular/cli@17
RUN npm install

# Construir la aplicación
RUN npm run build:prod

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist/gesapp-angular /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
