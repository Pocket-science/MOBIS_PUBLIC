import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Canairiopm25Page } from './canairiopm25.page';

const routes: Routes = [
  {
    path: '',
    component: Canairiopm25Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Canairiopm25PageRoutingModule {}
