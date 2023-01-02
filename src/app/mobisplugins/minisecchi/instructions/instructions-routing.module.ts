import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructionsPage } from './instructions.page';

const routes: Routes = [
  {
    path: '',
    component: InstructionsPage
  },
  {
    path: 'step2',
    loadChildren: () => import('./step2/step2.module').then( m => m.Step2PageModule)
  },
  {
    path: 'step3',
    loadChildren: () => import('./step3/step3.module').then( m => m.Step3PageModule)
  },
  {
    path: 'step4',
    loadChildren: () => import('./step4/step4.module').then( m => m.Step4PageModule)
  },
  {
    path: 'step5',
    loadChildren: () => import('./step5/step5.module').then( m => m.Step5PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructionsPageRoutingModule {}
