import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DistancetowaterPageRoutingModule } from './distancetowater-routing.module';

import { DistancetowaterPage } from './distancetowater.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    DistancetowaterPageRoutingModule
  ],
  declarations: [DistancetowaterPage]
})
export class DistancetowaterPageModule {}
