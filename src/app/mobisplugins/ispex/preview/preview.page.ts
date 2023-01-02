import * as Parse from 'parse';
import { ENV } from '../../../app.constant';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core"
const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions, CameraSampleOptions } from '@capacitor-community/camera-preview';
import { ModalController } from '@ionic/angular';
import { Geolocation} from '@capacitor/geolocation';

import { Device } from '@capacitor/device';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  image = null;
  cameraActive = false;
private parseAppId: string = ENV.parseAppId;
private parseServerUrl: string = ENV.parseServerUrl;
private parseJSKey: string=ENV.parseJSKey;
public datetime_ux: string;
public datetime: string;

public latitude: number;
public  longitude: number;
public  altitude: number;
public  heading: number;

// public deviceAppVersion: string;
// public  deviceAppBuild: string;
public  deviceOsVersion: string;
public  devicePlatform: string;

public  deviceManufacturer: string;
public  deviceModel: string;



   





  constructor(private modal: ModalController,  private vibration: Vibration
) { }

  ngOnInit() {


   this.getLocation();
      this.parseInitialize();
    this.launchCamera();

this.getDeviceInfo();

}

  
  launchCamera() {
   const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear', // front or rear
      parent: 'content', // the id on the ion-content
      className: '',
      width: window.screen.width, //width of the camera display
      height:window.screen.height-200, //height of the camera
   
      toBack: false,
      disableAudio: true,
      rotateWhenOrientationChanged: false,
      lockAndroidOrientation: true


    };
    CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;

    

  

  }






  async takePicture( dngType ) {


// buzz for user feedback

    this.vibration.vibrate(1);


    // this captures a raw image. replace quality with type 
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: dngType// misuse quality: 0 normal (rgb) image 1 gray card 2 sky image 3 water image 4 other spectro(pol) 
    };
  

    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;


this.getLocation();

    // save to parse


const base64PictureData = result.value;


let d = new Date();
this.datetime=d.toString();
var unixTimeStamp = Math.floor(d.getTime() / 1000);
this.datetime_ux=unixTimeStamp.toString();

// do something with base64PictureData

var Base64SnapImage:string;

Base64SnapImage = "data:image/jpeg;base64," + base64PictureData;


var Base64DNGImage:string;





var Save2Parse = Parse.Object.extend('ispex_data');





var iSPEX2_store = new Save2Parse();
// set initial data record


// upload thumb for user feedback. DNG's  are uploaded within the native part


const thumbFiletoUpload = new Parse.File("thumb.jpg",  { base64: Base64SnapImage},"image/jpeg");

  thumbFiletoUpload.save().then(function() {
      console.log ("saved thumb!")
  }, function(error) {
    // The file either could not be read, or could not be saved to Parse.

    console.log ("error saving thumb")

  });






iSPEX2_store.set('thumb', thumbFiletoUpload);

iSPEX2_store.set('latitude',this.latitude);
iSPEX2_store.set('longitude',this.longitude);
iSPEX2_store.set('altitude',this.altitude);
iSPEX2_store.set('heading',this.heading);

iSPEX2_store.set('dngFileURL',result.dngFileURL);
iSPEX2_store.set('heading',result.heading);
iSPEX2_store.set('device_angle',result.device_angle);


iSPEX2_store.set ('device_osversion', this.deviceOsVersion);
iSPEX2_store.set ('device_platform', this.devicePlatform);
iSPEX2_store.set ('device_manufacturer', this.deviceManufacturer);
iSPEX2_store.set ('device_model', this.deviceModel);


iSPEX2_store.set ('datetimerecorded', this.datetime);
iSPEX2_store.set ('datetime_ux', this.datetime_ux);




await  iSPEX2_store.save();



    this.stopCamera();
  }








  

  async getLocation()  {
  const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
  this.latitude = position.coords.latitude;
  this.heading= position.coords.heading;
 // console.log (position.coords.latitude);
  this.longitude = position.coords.longitude;
  this.altitude = position.coords.altitude;
  return position.coords;
}


  async takeSample() {



  }


  async stopCamera() {
    await CameraPreview.stop();
    this.modal.dismiss(this.image);
  }

  async flipCamera() {
    await CameraPreview.flip();
  }


  async getDeviceInfo() {
    const info = await Device.getInfo();
 //   this.deviceAppVersion = info.appVersion;
  //  this.deviceAppBuild = info.appBuild;
    this.deviceOsVersion = info.osVersion;
    this.devicePlatform = info.platform;
    this.deviceManufacturer = info.manufacturer;
    this.deviceModel = info.model;
    console.log(info);
  }




  private parseInitialize() {
  
    Parse.initialize(this.parseAppId, this.parseJSKey);
  
    (Parse as any).serverURL = this.parseServerUrl; // use your server url
  
    }
  



}