import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Components
import { IotSensorsOverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: IotSensorsOverviewComponent }
      // Rutas comentadas hasta que se implementen los componentes:
      // { path: 'tutorials', component: TutorialsComponent },
      // { path: 'projects', component: ProjectsComponent },
      // { path: 'monitor', component: MonitorComponent },
      // { path: 'resources', component: ResourcesComponent }
    ]
  }
];

@NgModule({
  declarations: [
    IotSensorsOverviewComponent
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
    MatSlideToggleModule,
    MatTableModule,
    MatStepperModule
  ],
  exports: [
    IotSensorsOverviewComponent
  ]
})
export class IotSensorsModule { }
