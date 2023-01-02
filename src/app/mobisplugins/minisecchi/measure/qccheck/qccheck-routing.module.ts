import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QccheckPage } from './qccheck.page';

const routes: Routes = [
  {
    path: '',
    component: QccheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QccheckPageRoutingModule {}
