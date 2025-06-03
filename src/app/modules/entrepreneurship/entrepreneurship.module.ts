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
import { MatStepperModule } from '@angular/material/stepper';

// Components
// Estos componentes se crearán más adelante

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      // Rutas comentadas hasta que se implementen los componentes:
      // { path: 'overview', component: OverviewComponent },
      // { path: 'business-model', component: BusinessModelComponent },
      // { path: 'case-studies', component: CaseStudiesComponent },
      // { path: 'resources', component: ResourcesComponent }
    ]
  }
];

@NgModule({
  declarations: [
    // Componentes que se agregarán más adelante
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
    MatStepperModule
  ],
  exports: [
    // Componentes que se exportarán más adelante
  ]
})
export class EntrepreneurshipModule { }
