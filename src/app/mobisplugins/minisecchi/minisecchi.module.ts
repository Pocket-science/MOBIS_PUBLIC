import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinisecchiPageRoutingModule } from './minisecchi-routing.module';

import { MinisecchiPage } from './minisecchi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinisecchiPageRoutingModule
  ],
  declarations: [MinisecchiPage]
})
export class MinisecchiPageModule {}
