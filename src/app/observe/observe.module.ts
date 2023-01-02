import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservationsPageRoutingModule } from './observe-routing.module';

import { ObservationsPage } from './observe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationsPageRoutingModule
  ],
  declarations: [ObservationsPage]
})
export class MeasurePageModule {}
