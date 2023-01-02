import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColouratsurfacePageRoutingModule } from './colouratsurface-routing.module';

import { ColouratsurfacePage } from './colouratsurface.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColouratsurfacePageRoutingModule
  ],
  declarations: [ColouratsurfacePage]
})
export class ColouratsurfacePageModule {}
