import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

// Importación corregida con ruta absoluta para evitar problemas de resolución
import { PlanInvestigationComponent } from 'src/app/modules/research/components/plan-investigation/plan-investigation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'plan',
    pathMatch: 'full'
  },
  {
    path: 'plan',
    component: PlanInvestigationComponent
  }
];

@NgModule({
  declarations: [
    PlanInvestigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [
    PlanInvestigationComponent
  ]
})
export class ResearchModule { }
