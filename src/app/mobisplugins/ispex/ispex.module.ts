import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IspexPageRoutingModule } from './ispex-routing.module';
import { PreviewPageModule } from "./preview/preview.module"

import { Vibration } from '@ionic-native/vibration/ngx';

import { IspexPage } from './ispex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IspexPageRoutingModule
  ],
  declarations: [IspexPage],
  providers: [Vibration]
})
export class IspexPageModule {}
