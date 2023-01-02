import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColouratsurfacePage } from './colouratsurface.page';

const routes: Routes = [
  {
    path: '',
    component: ColouratsurfacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColouratsurfacePageRoutingModule {}
