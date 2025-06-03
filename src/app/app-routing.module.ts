import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'entrepreneurship', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/entrepreneurship/entrepreneurship.module').then(m => m.EntrepreneurshipModule)
  },
  { 
    path: 'iot-sensors', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/iot-sensors/iot-sensors.module').then(m => m.IotSensorsModule)
  },
  { 
    path: 'maker-iot', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/maker-iot/maker-iot.module').then(m => m.MakerIotModule)
  },
  { 
    path: 'printing3d', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/printing3d/printing3d.module').then(m => m.Printing3dModule)
  },
  { 
    path: 'programming', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/programming/programming.module').then(m => m.ProgrammingModule)
  },
  { 
    path: 'research', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/research/research.module').then(m => m.ResearchModule)
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
