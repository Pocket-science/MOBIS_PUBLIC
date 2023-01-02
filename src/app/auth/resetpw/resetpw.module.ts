import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpwPageRoutingModule } from './resetpw-routing.module';

import { ResetpwPage } from './resetpw.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpwPageRoutingModule, ReactiveFormsModule, TranslateModule
  ],
  declarations: [ResetpwPage]
})
export class ResetpwPageModule {}
