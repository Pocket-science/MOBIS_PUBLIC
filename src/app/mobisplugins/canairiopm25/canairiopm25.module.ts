import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';


import { IonicModule } from '@ionic/angular';

import { Canairiopm25PageRoutingModule } from './canairiopm25-routing.module';

import { Canairiopm25Page } from './canairiopm25.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Canairiopm25PageRoutingModule
  ],
  declarations: [Canairiopm25Page],
  providers: [BackgroundMode]
})
export class Canairiopm25PageModule {}
