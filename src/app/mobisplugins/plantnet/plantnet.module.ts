import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantnetPageRoutingModule } from './plantnet-routing.module';

import { PlantnetPage } from './plantnet.page';


import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantnetPageRoutingModule
  ],
  declarations: [PlantnetPage]
})
export class PlantnetPageModule {}
