import { Component, OnInit } from '@angular/core';
import { ENV } from '../../../app.constant';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Http } from '@capacitor-community/http';
import * as Parse from 'parse';

// debug purpose: Chrome without CORS on mac
// open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security


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
  // add result variabel for showing result to user
  result = '';

  parsefile: any;
  parsefileName: any;
  parsefileUrl: any;

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

  ) {
    user(this.afAuth).subscribe((response) => {
      //fill the user to verify if someone is logged in
      this.user = response;
    });
  }

  ngOnInit() {

    // get location
    this.getLocation();
    Parse.initialize(ENV.parseAppId, ENV.parseJSKey);
    (Parse as any).serverURL = ENV.parseServerUrl; // use your server url

    this.storage.create();

    // get file out of storage and submit to parse
    this.storage.get('plantnet_image').then((val) => { // get image from storage
      this.image = val;
      this.parsefile = new Parse.File('plantnet_image.jpg', { base64: this.image });
      this.parsefile.save().then(
        (response: any) => {
          this.parsefileUrl = this.parsefile.toJSON().url;
          this.parsefileName = this.parsefile.toJSON().name;
          console.log('parsefileUrl', this.parsefileUrl);
          console.log('parsefileName', this.parsefileName);

          // call function to submit to plantnet

          this.submit_to_plantnet();



        }
      )
    });




  };




















  submit_image_with_classification() {

    const plantnet_data_store = Parse.Object.extend('plantnet_data');

    // create new instance of parse class

    const plantnet_data = new plantnet_data_store();

    // set value for parse clas



    plantnet_data.set('user_uid', this.user.uid);
    plantnet_data.set('name', this.user.displayName);
    plantnet_data.set('email', this.user.email);
    plantnet_data.set('image', this.parsefile);
    plantnet_data.set('classification', this.result);
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



// go to plantnet page
    this.router.navigate(['/plantnet']);



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



  submit_to_plantnet() {



    const imageUri = this.parsefileUrl;
    const imageType = 'image/jpeg';
    const imageName = this.parsefileName;

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

          // show result on to user

          this.result = response.data.results[0].species.scientificName;

          console.log(this.result);


        }).catch(error => {
      console.log ('error in response', error);
      this.result = 'Species not found';
        });
      })
      .catch(error => {
        console.error(error);
      });

      // route to plantnet page


  }






}
