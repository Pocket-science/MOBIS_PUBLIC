import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Step4Page } from './step4.page';

const routes: Routes = [
  {
    path: '',
    component: Step4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Step4PageRoutingModule {}
