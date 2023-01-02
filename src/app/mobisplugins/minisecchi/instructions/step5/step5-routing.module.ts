import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Step5Page } from './step5.page';

const routes: Routes = [
  {
    path: '',
    component: Step5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Step5PageRoutingModule {}
