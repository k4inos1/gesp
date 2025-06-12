// Este archivo es requerido por karma.conf.js y carga todos los archivos .spec y de framework

import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Primero, inicializamos el entorno de pruebas de Angular
const testBed = getTestBed();

try {
  testBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    { teardown: { destroyAfterEach: false } }
  );
} catch (err) {
  console.error('Error al inicializar el entorno de pruebas:', err);
}

// Declaración para require.context de webpack
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// Buscamos todos los archivos de prueba
const context = require.context('./', true, /\.spec\.ts$/);
// Y cargamos los módulos
try {
  context.keys().forEach(context);
} catch (err) {
  console.error('Error al cargar los archivos de prueba:', err);
}

// Asegurarse de que Karma se cargue correctamente
declare const window: any; // Para evitar errores de TypeScript

if (typeof window !== 'undefined' && window.__karma__) {
  window.__karma__.loaded = function() {};
}
