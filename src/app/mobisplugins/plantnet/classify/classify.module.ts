import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassifyPageRoutingModule } from './classify-routing.module';

import { ClassifyPage } from './classify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassifyPageRoutingModule
  ],
  declarations: [ClassifyPage]
})
export class ClassifyPageModule {}
