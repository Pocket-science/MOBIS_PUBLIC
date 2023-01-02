import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColourathalfdepthPage } from './colourathalfdepth.page';

const routes: Routes = [
  {
    path: '',
    component: ColourathalfdepthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColourathalfdepthPageRoutingModule {}
