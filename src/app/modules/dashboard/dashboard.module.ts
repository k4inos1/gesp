import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    RoadmapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // Material Modules
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTooltipModule
  ]
})
export class DashboardModule { }
