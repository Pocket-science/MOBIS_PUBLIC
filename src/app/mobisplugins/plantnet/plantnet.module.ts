import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlantnetPageRoutingModule } from './plantnet-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PlantnetPage } from './plantnet.page';
import { PreviewPage } from './preview/preview.page';
import { PreviewPageModule } from "./preview/preview.module"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantnetPageRoutingModule,
    TranslateModule,
    PreviewPageModule

  ],
  declarations: [PlantnetPage],

})
export class PlantnetPageModule {}
