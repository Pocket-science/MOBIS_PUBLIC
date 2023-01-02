import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Canairioco2PageRoutingModule } from './canairioco2-routing.module';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { Canairioco2Page } from './canairioco2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Canairioco2PageRoutingModule
  ],
  declarations: [Canairioco2Page],
  providers:  [BackgroundMode]
})
export class Canairioco2PageModule {}
