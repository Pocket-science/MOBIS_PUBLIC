/* eslint-disable @typescript-eslint/naming-convention */
import * as Parse from 'parse';
import { ENV } from '../../app.constant';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreviewPage } from './preview/preview.page';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

Parse.initialize(ENV.parseAppId, ENV.parseJSKey);
(Parse as any).serverURL = ENV.parseServerUrl; // use your server url

let uploadSuccess = false;

@Component({
  selector: 'app-ispex',
  templateUrl: './ispex.page.html',
  styleUrls: ['./ispex.page.scss'],
})
export class IspexPage implements OnInit {
  uploadSuccess = false; // Add this line
  image = '';
  user = null;
  language = '';

  constructor(
    private modal: ModalController,
    private translateService: TranslateService,
    private authService: AuthService,
    private afAuth: Auth,
    private storage: Storage,
    private router: Router
  ) {
    user(this.afAuth).subscribe((response) => {
      //fill the user to verify if someone is logged in
      this.user = response;
      console.log(this.user.uid);
    });
  }

  ngOnInit() {}

  async openCamera() {
    const modal = await this.modal.create({
      component: PreviewPage,
      cssClass: 'fullscreen',
      animated: true,
    });

    modal.onDidDismiss().then((data) => {
      if (data !== null) {
        this.image = data.data;

        this.uploadSuccess = true;
        // create parse class

        const myspex_data_store = Parse.Object.extend('myspex_data');

        // create new instance of parse class

        const myspex_data = new myspex_data_store();

        // set value for parse clas

        const file = new Parse.File('image.jpg', { base64: this.image });
        file.save().then(
          (file) => {
            console.log(file);
          },
          (error) => {
            console.log(error);
          }
        );

        myspex_data.set('user_uid', this.user.uid);
        myspex_data.set('name', this.user.displayName);
        myspex_data.set('email', this.user.email);
        myspex_data.set('image', file);

        myspex_data.save().then(
          (result: any) => {
            console.log(result);
          },
          (error: any) => {
            console.log(error);
          }
        );
      } else {
        console.log('no data');
      }
    });

    return await modal.present();
  }

  // navigate to the classify page
}
