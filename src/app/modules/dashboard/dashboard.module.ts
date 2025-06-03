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
import { MatTableModule } from '@angular/material/table';

// Components
import { RoadmapComponent } from './components/roadmap/roadmap.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      // { path: 'overview', component: null }, // Se actualizará con el componente real
      { path: 'roadmap', component: RoadmapComponent },
      // { path: 'statistics', component: null }, // Se actualizará con el componente real
      // { path: 'projects', component: null }, // Se actualizará con el componente real
      // { path: 'community', component: null } // Se actualizará con el componente real
    ]
  }
];

@NgModule({
  declarations: [
    RoadmapComponent
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
    MatChipsModule,
    MatTableModule
  ],
  exports: [
    RoadmapComponent
  ]
})
export class DashboardModule { }
