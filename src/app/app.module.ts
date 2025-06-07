import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Firebase
import { environment } from '../environments/environment';
import { auth, firestore } from './core/firebase/firebase.config';

// reCAPTCHA
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

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
import { DevModule } from './core/dev/dev.module';

// Global error handler
class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.error('An error occurred:', error);
  }
}

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
    AppRoutingModule,
    CoreModule,
    SharedModule,
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
    MatSnackBarModule,
    RecaptchaV3Module,
    // Módulo de desarrollo solo en modo no producción
    ...(!environment.production ? [DevModule] : [])
  ],
  providers: [
    // Proveedores de Firebase
    { provide: 'FIREBASE_OPTIONS', useFactory: () => environment.firebase },
    { provide: 'FIREBASE_AUTH', useFactory: () => auth },
    { provide: 'FIREBASE_FIRESTORE', useFactory: () => firestore },
    // Otros proveedores
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LdaqFcrAAAAALAyH_t9NOfxd-N7wPB9GwAwCf7e' // Clave de producción de reCAPTCHA
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdaqFcrAAAAALAyH_t9NOfxd-N7wPB9GwAwCf7e',
        theme: 'light',
        size: 'normal',
        type: 'image'
      } as RecaptchaSettings
    },
    {
      provide: 'GOOGLE_CLIENT_ID',
      useValue: '884687252315-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com' // Reemplaza con tu Client ID de Google Cloud Console
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
