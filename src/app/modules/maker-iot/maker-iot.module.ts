import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';

// Components
import { MakerIotOverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {
    path: 'maker-iot',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: MakerIotOverviewComponent },
      { path: '3d-printing', loadChildren: () => import('../printing3d/printing3d.module').then(m => m.Printing3dModule) },
      { path: 'iot-sensors', loadChildren: () => import('../iot-sensors/iot-sensors.module').then(m => m.IotSensorsModule) },
      { path: 'programming', loadChildren: () => import('../programming/programming.module').then(m => m.ProgrammingModule) },
      { path: 'entrepreneurship', loadChildren: () => import('../entrepreneurship/entrepreneurship.module').then(m => m.EntrepreneurshipModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  }
];

@NgModule({
  declarations: [
    MakerIotOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    
    // Material Modules
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule
  ],
  exports: [
    MakerIotOverviewComponent
  ]
})
export class MakerIotModule { }
