import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinisecchiPage } from './minisecchi.page';

const routes: Routes = [
  {
    path: '',
    component: MinisecchiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinisecchiPageRoutingModule {}
