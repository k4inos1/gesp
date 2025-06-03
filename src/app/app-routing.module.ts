import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'entrepreneurship', loadChildren: () => import('./modules/entrepreneurship/entrepreneurship.module').then(m => m.EntrepreneurshipModule) },
  { path: 'iot-sensors', loadChildren: () => import('./modules/iot-sensors/iot-sensors.module').then(m => m.IotSensorsModule) },
  { path: 'maker-iot', loadChildren: () => import('./modules/maker-iot/maker-iot.module').then(m => m.MakerIotModule) },
  { path: 'printing3d', loadChildren: () => import('./modules/printing3d/printing3d.module').then(m => m.Printing3dModule) },
  { path: 'programming', loadChildren: () => import('./modules/programming/programming.module').then(m => m.ProgrammingModule) },
  { path: 'research', loadChildren: () => import('./modules/research/research.module').then(m => m.ResearchModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
