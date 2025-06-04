import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { getRemoteConfig } from 'firebase/remote-config';
import { environment } from '../environments/environment';

// Initialize Firebase
export const firebaseApp = initializeApp(environment.firebase);

export const firebaseConfig = {
  auth: getAuth(firebaseApp),
  analytics: typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null,
  db: getFirestore(firebaseApp),
  functions: getFunctions(firebaseApp),
  storage: getStorage(firebaseApp),
  remoteConfig: getRemoteConfig(firebaseApp)
};

// Only import App Check in production to avoid unnecessary checks in development
// const appCheckProviders = environment.production ? [
//   // Enable App Check in production with your reCAPTCHA Enterprise key
//   // import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
//   // initializeAppCheck(app, {
//     provider: new ReCaptchaEnterpriseProvider('YOUR_RECAPTCHA_ENTERPRISE_SITE_KEY'),
//     isTokenAutoRefreshEnabled: true
//   })
// ] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // ...appCheckProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
