import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';

// Módulos de Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Componentes
import { AppComponent } from './app.component';

// Servicios y utilidades
import { AuthService } from './core/auth/services/auth.service';
import { AuthGuard } from './core/auth/guards/auth.guard'
import { JwtInterceptor } from './core/auth/interceptors/jwt.interceptor';

// Función para obtener el token
// TODO: Mover a un archivo de configuración
const tokenGetter = () => {
  return localStorage.getItem('access_token');
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    // JWT
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'], // Ajustar según tu entorno
        disallowedRoutes: [
          // Rutas de autenticación
          '/auth/login',
          '/auth/register',
          // Recursos estáticos
          '/assets/',
          // Archivos de la aplicación (manejados en el interceptor)
          '/main-',
          '/polyfills-',
          '/runtime-',
          '/styles-',
          '/vendor-',
          // Módulos
          '.js',
          '.mjs'
        ]
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }