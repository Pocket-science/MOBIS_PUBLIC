import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Canairioco2Page } from './canairioco2.page';

const routes: Routes = [
  {
    path: '',
    component: Canairioco2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Canairioco2PageRoutingModule {}
