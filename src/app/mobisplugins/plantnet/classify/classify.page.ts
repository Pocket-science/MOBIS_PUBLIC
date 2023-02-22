import { Component, OnInit } from '@angular/core';
import {ENV} from '../../../app.constant';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.page.html',
  styleUrls: ['./classify.page.scss'],
})
export class ClassifyPage implements OnInit {
   PROJECT = 'all'; // try 'weurope' or 'canada'
   API_URL = 'https://my-api.plantnet.org/v2/identify/' + this.PROJECT + '?api-key=';
   API_PRIVATE_KEY = ENV.plantnetKey; // secret
   API_SIMSEARCH_OPTION = '&include-related-images=true'; // optional: get most similar images
   API_LANG = '&lang=en'; // default: en
  
   uploadSuccess = false; // Add this line
   image = '';
   user = null;
   language = '';
   latitude: number;
   longitude: number;
   altitude: number;
  constructor(

private storage: Storage,
private authService: AuthService,
private afAuth: Auth,
private translateService: TranslateService,
private router: Router

  ) { user(this.afAuth).subscribe((response) => {
      //fill the user to verify if someone is logged in
      this.user = response;
      console.log(this.user.uid);
    }); }

  ngOnInit() {
  
    // get location
    this.getLocation();


    // get image from local storage
    this.storage.get('image').then((image) => {
      console.log(image);
      this.image = image;

    });
    


// add rose.jpg from assets directory for testing
 const imageUri = 'assets/rose.jpg';


    const imageType = 'image/jpeg';
    const imageName = 'rose.jpg';
    
    fetch(imageUri)
      .then(response => response.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('images', new File([blob], imageName, { type: imageType }));
        formData.append('organs', 'auto');
    
        const url = 'https://my-api.plantnet.org/v2/identify/all';
        const headers = {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        };
        const params = {
          'include-related-images': 'false',
          'no-reject': 'false',
          'lang': 'en',
          'api-key': '2b10bmIKkNNcBL6D4jwq3il4rO'
        };

        Http.request({
          method: 'POST',
          url: url,
          headers: headers,
          params: params,
          data: formData
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.error(error);
        });
      })
      .catch(error => {
        console.error(error);
      });
    



};

















  


  savetoParse()  {

  const plantnet_data_store = Parse.Object.extend('plantnet_data');

  // create new instance of parse class

  const plantnet_data = new plantnet_data_store();

  // set value for parse clas

  const file = new Parse.File('plantnet_image.jpg', { base64: this.image });
  file.save().then(
    (file) => {
      console.log(file);
    },
    (error) => {
      console.log(error);
    }
  );
      // add location and clasiification
  
  plantnet_data.set('user_uid', this.user.uid);
  plantnet_data.set('name', this.user.displayName);
  plantnet_data.set('email', this.user.email);
  plantnet_data.set('image', file);
  plantnet_data.set('latitude', this.latitude);
  plantnet_data.set('longitude', this.longitude);
  plantnet_data.set('altitude', this.altitude);


  plantnet_data.save().then(
    (result: any) => {
      console.log(result);
    },
    (error: any) => {
      console.log(error);
    }
  );
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });
    this.latitude = position.coords.latitude;
    console.log(position.coords.latitude);
    this.longitude = position.coords.longitude;
    this.altitude = position.coords.altitude;
    return position.coords;
  }

}
