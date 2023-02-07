import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IspexPageRoutingModule } from './ispex-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IspexPage } from './ispex.page';
import { PreviewPage } from './preview/preview.page';
import { PreviewPageModule } from "./preview/preview.module"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IspexPageRoutingModule,
    TranslateModule,
    PreviewPageModule

  ],
  declarations: [IspexPage],

})
export class IspexPageModule {}
