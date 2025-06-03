import { NgModule, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AngularHttpService } from './services/angular-http.service';
import { HttpService } from './services/http.service';

export const HTTP_SERVICE = new InjectionToken<HttpService>('HTTP_SERVICE');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_SERVICE, useClass: AngularHttpService, multi: false }
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }
}
