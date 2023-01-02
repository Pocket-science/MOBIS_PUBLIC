import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReappearPageRoutingModule } from './reappear-routing.module';

import { ReappearPage } from './reappear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReappearPageRoutingModule
  ],
  declarations: [ReappearPage]
})
export class ReappearPageModule {}
