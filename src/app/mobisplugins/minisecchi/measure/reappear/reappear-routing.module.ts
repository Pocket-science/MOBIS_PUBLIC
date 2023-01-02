import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReappearPage } from './reappear.page';

const routes: Routes = [
  {
    path: '',
    component: ReappearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReappearPageRoutingModule {}
