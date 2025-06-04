@echo off
echo Limpiando node_modules y archivos temporales...
rmdir /s /q node_modules
rmdir /s /q .angular
rmdir /s /q dist
del package-lock.json

echo Instalando dependencias...
call npm install

echo Instalando Angular CLI globalmente...
call npm install -g @angular/cli@17.3.0

echo Instalando dependencias de desarrollo...
call npm install --save-dev @angular-devkit/build-angular@17.3.0

echo Instalación completada. Ejecuta 'npm start' para iniciar la aplicación.
