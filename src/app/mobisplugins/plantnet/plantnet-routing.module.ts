import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantnetPage } from './plantnet.page';

const routes: Routes = [
  {
    path: '',
    component: PlantnetPage
  },
  {
    path: 'classify',
    loadChildren: () => import('./classify/classify.module').then( m => m.ClassifyPageModule)
  },
  {
    path: 'plantnet',
    loadChildren: () => import('./plantnet.module').then( m => m.PlantnetPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantnetPageRoutingModule {}
