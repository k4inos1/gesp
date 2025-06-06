// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // Configuración base
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    
    // Configuración para manejar el error de zone.js
    client: {
      captureConsole: true,
      jasmine: {
        random: false,
        failFast: true,
        timeoutInterval: 10000
      },
      clearContext: false
    },
    
    // Plugins
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    jasmineHtmlReporter: {
      suppressAll: true // Elimina los mensajes duplicados
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/gesapp-angular'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--remote-debugging-port=9222',
          '--window-size=1280,800'
        ]
      }
    },
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    singleRun: false,
    restartOnFileChange: true,
    // Configuración específica para Angular
    proxies: {
      '/assets/': '/base/src/assets/'
    },
    // Asegúrate de que los archivos de prueba se carguen en el orden correcto
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular-devkit/build-angular']
    },
    // Configuración adicional para asegurar que Karma se inicialice correctamente
    client: {
      captureConsole: true,
      clearContext: false
    },
    // Asegurarse de que el navegador tenga suficiente tiempo para cargar
    browserNoActivityTimeout: 30000,
    browserDisconnectTolerance: 2,
    browserDisconnectTimeout: 5000,
    captureTimeout: 30000
  });
};
