import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeasurePage } from './measure.page';

const routes: Routes = [
  {
    path: '',
    component: MeasurePage
  },
  {
    path: 'distancetowater',
    loadChildren: () => import('./distancetowater/distancetowater.module').then( m => m.DistancetowaterPageModule)
  },
  {
    path: 'reappear',
    loadChildren: () => import('./reappear/reappear.module').then( m => m.ReappearPageModule)
  },
  {
    path: 'colourathalfdepth',
    loadChildren: () => import('./colourathalfdepth/colourathalfdepth.module').then( m => m.ColourathalfdepthPageModule)
  },
  {
    path: 'colouratsurface',
    loadChildren: () => import('./colouratsurface/colouratsurface.module').then( m => m.ColouratsurfacePageModule)
  },
  {
    path: 'qccheck',
    loadChildren: () => import('./qccheck/qccheck.module').then( m => m.QccheckPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasurePageRoutingModule {}
