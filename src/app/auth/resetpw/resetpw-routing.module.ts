import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetpwPage } from './resetpw.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpwPageRoutingModule {}
