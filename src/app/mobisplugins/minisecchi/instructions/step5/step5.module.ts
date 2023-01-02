import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Step5PageRoutingModule } from './step5-routing.module';

import { Step5Page } from './step5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Step5PageRoutingModule
  ],
  declarations: [Step5Page]
})
export class Step5PageModule {}
