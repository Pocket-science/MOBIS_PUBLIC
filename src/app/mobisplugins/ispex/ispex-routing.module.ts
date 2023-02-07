import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IspexPage } from './ispex.page';

const routes: Routes = [
  {
    path: '',
    component: IspexPage
  },
  {
    path: 'classify',
    loadChildren: () => import('./classify/classify.module').then( m => m.ClassifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IspexPageRoutingModule {}
