/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreviewPage } from './preview/preview.page';
import { TranslateService } from '@ngx-translate/core';

import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


let uploadSuccess = false;

@Component({
  selector: 'app-plantnet',
  templateUrl: './plantnet.page.html',
  styleUrls: ['./plantnet.page.scss'],
})
export class PlantnetPage implements OnInit {
  uploadSuccess = false; // Add this line
  image = '';
  user = null;
  language = '';
  latitude: number;
  longitude: number;
  altitude: number;

  constructor(
    private modal: ModalController,
    private translateService: TranslateService,

    private storage: Storage,
    private router: Router
  ) {

  }

  ngOnInit() {

    




  }

 
  async openCamera() {
    const modal = await this.modal.create({
      component: PreviewPage,
      cssClass: 'fullscreen',
      animated: true,
    });

    modal.onDidDismiss().then(async (data) => {
      if (data !== null) {
        this.image = data.data;

        this.uploadSuccess = true;
        // create parse class


        // store image in local storage
        await this.storage.set('plantnet_image', this.image);
              } else {
        console.log('no data');
      }
    });

    return await modal.present();
  }

  // navigate to the classify page
}
