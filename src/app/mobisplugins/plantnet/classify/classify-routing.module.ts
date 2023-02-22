import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassifyPage } from './classify.page';

const routes: Routes = [
  {
    path: '',
    component: ClassifyPage
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassifyPageRoutingModule {}
