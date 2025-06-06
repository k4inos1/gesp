import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from '../environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';

// reCAPTCHA
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Global error handler
class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.error('An error occurred:', error);
  }
}

// Inicialización de Firebase
const firebaseApp = initializeApp(environment.firebase);

// Inicializar servicios de Firebase con la instancia de la aplicación
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Configuración de emuladores en desarrollo
if (!environment.production) {
  try {
    // Solo conectar emuladores si estamos en desarrollo
    console.log('Configurando emuladores de Firebase...');
    
    // Configurar emulador de Auth
    console.log('Conectando a Auth emulator en http://localhost:9099');
    connectAuthEmulator(auth, 'http://localhost:9099', { 
      disableWarnings: true 
    });
    
    // Configurar emulador de Firestore
    console.log('Conectando a Firestore emulator en localhost:8080');
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    
    console.log('✅ Firebase emulators conectados correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con los emuladores de Firebase:', error);
  }
} else {
  console.log('Modo producción: Usando servicios de Firebase en la nube');
}

// Configuración de Firebase (se mueve a los providers)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Módulos de Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    
    // Módulos de la aplicación
    CoreModule,
    SharedModule,
    AppRoutingModule,
    
    // Módulos de terceros
    RecaptchaV3Module,
    
    // Módulos de Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [
    // Proveedores de Firebase
    provideFirebaseApp(() => firebaseApp),
    provideAuth(() => auth),
    provideFirestore(() => firestore),
    provideStorage(() => storage),
    
    // Otros proveedores
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.siteKey },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
