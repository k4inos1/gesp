import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMockService } from '../services/auth.mock.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

// Factory para inicializar la autenticación mock
const initializeMockAuth = (injector: Injector) => {
  return () => {
    if (!environment.production) {
      const authMock = injector.get(AuthMockService);
      authMock.autoLogin();
      console.log('Modo desarrollo: Autenticación mock activada');
    }
  };
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthMockService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMockAuth,
      deps: [Injector],
      multi: true
    },
    // En desarrollo, usamos AuthMockService en lugar de AuthService
    {
      provide: AuthService,
      useClass: environment.production ? AuthService : AuthMockService
    }
  ]
})
export class DevModule { }
