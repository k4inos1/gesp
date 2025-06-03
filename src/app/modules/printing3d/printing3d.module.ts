import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

// Components
import { Printing3dComponent } from './components/printing3d.component';
import { Printing3dOverviewComponent } from './components/overview/overview.component';
import { Printing3dTutorialsComponent } from './components/tutorials/tutorials.component';
import { Printing3dModelsComponent } from './components/models/models.component';
import { Printing3dResourcesComponent } from './components/resources/resources.component';
import { Printing3dNavigationComponent } from './components/navigation/navigation.component';
import { Printing3dFooterComponent } from './components/footer/footer.component';
import { ModelDetailsComponent } from './components/model-details/model-details.component';
import { Printing3dFiltersComponent } from './components/shared/printing3d-filters.component';

const routes: Routes = [
  {
    path: '',
    component: Printing3dComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Printing3dOverviewComponent },
      { path: 'tutorials', component: Printing3dTutorialsComponent },
      { path: 'models', component: Printing3dModelsComponent },
      { path: 'models/:id', component: ModelDetailsComponent },
      { path: 'resources', component: Printing3dResourcesComponent }
    ]
  }
];

@NgModule({
  declarations: [
    Printing3dComponent,
    Printing3dOverviewComponent,
    Printing3dTutorialsComponent,
    Printing3dModelsComponent,
    Printing3dResourcesComponent,
    Printing3dNavigationComponent,
    Printing3dFooterComponent,
    ModelDetailsComponent,
    Printing3dFiltersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class Printing3dModule { }
