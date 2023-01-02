import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistancetowaterPage } from './distancetowater.page';

const routes: Routes = [
  {
    path: '',
    component: DistancetowaterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistancetowaterPageRoutingModule {}
