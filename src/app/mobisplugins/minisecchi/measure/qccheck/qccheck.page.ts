import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Guid } from "guid-typescript";
import * as Parse from 'parse';
import { ENV } from '../../../../app.constant';
import { Geolocation} from '@capacitor/geolocation';

@Component({
  selector: 'app-qccheck',
  templateUrl: './qccheck.page.html',
  styleUrls: ['./qccheck.page.scss'],
})
export class QccheckPage implements OnInit {
// now get all the values
private parseAppId: string = ENV.parseAppId;
private parseServerUrl: string = ENV.parseServerUrl;
private parseJSKey: string=ENV.parseJSKey;

public swversion_number:string;
public swversion_code:number;
public latitude: number;
public longitude: number;
public distancetowater: number;
public reappear: number;
public colourathalfdepth: number;
public colourathalfdepthimage: string;
public colouratsurface: number;
public colouratsurfaceimage: string;
public phvalue: number;
public bottom_visible: string;
public end_of_tape: string;
public angle_estimated: number;
public datetime: Date;
public datetime_ux: string;
public secchi_depth: string;


public rec_uid: string;

  newSecchi = {  uid: null, swversion_number:null, swversion_code:null, latitude: null,  longitude: null, distancetowater: null, reappear: null, colourathalfdepth: null, colourathalfdepthimage: null, colouratsurface: null, colouratsurfaceimage: null, datetimerecorded: null, datetime_ux:null, bottom_visible:null, end_of_tape:null, phvalue:null, angle_estimated:null, secchi_depth:null };

  constructor(private storage: Storage) {  

    this.rec_uid = Guid.raw(); // make it a string

}





  ngOnInit() {
     this.storage.create();
     this.parseInitialize();
     this.getLocation();


     
  this.storage.get('swversion_number').then((val) => {

this.swversion_number= val;

  });

  this.storage.get('swversion_code').then((val) => {

this.swversion_code= val;

  });



  this.storage.get('latitude').then((val) => {

this.latitude= val;

  });

  this.storage.get('longitude').then((val) => {

this.longitude= val;

  });


  this.storage.get('distancetowater').then((val) => {

this.distancetowater= val;

  });


    this.storage.get('reappear').then((val) => {

this.reappear= val;

  });


    this.storage.get('colourathalfdepth').then((val) => {

this.colourathalfdepth= val;

  });


    this.storage.get('colouratsurface').then((val) => {

this.colouratsurface= val;

  });



        this.storage.get('colourathalfdepthimage').then((val) => {
// check if it is null
if (val==null) {
  console.log("colourathalfdepthimage is null");
  return;
}
  

// convert to Parse file
   val = new Parse.File("colourathalfdepthimage.png",  { base64: val},"image/png");





this.colourathalfdepthimage= val;

  });


    this.storage.get('colouratsurfaceimage').then((val) => {
// check if it is null
if (val==null) {
  console.log("colouratsurfaceimage is null");
  return;

}


// convert to Parse file
   val = new Parse.File("colouratsurfaceimage.png",  { base64: val},"image/png");




this.colouratsurfaceimage= val;








  });






    this.storage.get('phvalue').then((val) => {

this.phvalue= val;

  });



    this.storage.get('bottom_visible').then((val) => {

this.bottom_visible= val;

  });

    this.storage.get('end_of_tape').then((val) => {

this.end_of_tape= val;

  });




    this.storage.get('angle_estimated').then((val) => {

this.angle_estimated= val;

  });


this.storage.get('secchi_depth').then((val) => {

this.secchi_depth= val;

  });


let d = new Date();

this.datetime=d;

var unixTimeStamp = Math.floor(d.getTime() / 1000);
this.datetime_ux=unixTimeStamp.toString();
  }

  async validate() {
 


// now save to Parse

var secchi_data = Parse.Object.extend('mini_secchi_data');
var secchi_store = new secchi_data();
// set initial data record
console.log("saving to Parse");

secchi_store.uid= this.rec_uid;
secchi_store.latitude=this.latitude;
secchi_store.longitude=this.longitude;
secchi_store.distancetowater=this.distancetowater;
secchi_store.reappear=this.reappear;
secchi_store.colourathalfdepth=this.colourathalfdepth;
secchi_store.colourathalfdepthimage=this.colourathalfdepthimage;
secchi_store.colouratsurface=this.colouratsurface;
secchi_store.colouratsurfaceimage=this.colouratsurfaceimage;
secchi_store.phvalue=this.phvalue;
secchi_store.bottom_visible=this.bottom_visible;
secchi_store.end_of_tape=this.end_of_tape;
secchi_store.angle_estimated=this.angle_estimated;
secchi_store.secchi_depth=this.secchi_depth;
secchi_store.datetime_ux=this.datetime_ux.toString();
secchi_store.datetimerecorded=this.datetime.toISOString();
console.log ('saving to Parse', secchi_store);



try {
  const result = await secchi_store.save();
  console.log('Data saved successfully:', result);
} catch (error) {
  console.error('Error saving data:', error);
  // You could add additional handling for the error here, such as displaying a message to the user or retrying the save operation.
}




}


async getLocation()  {
  const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
  this.latitude = position.coords.latitude;
 // console.log (position.coords.latitude);
  this.longitude = position.coords.longitude;
  return position.coords;
}

private parseInitialize() {
  
  Parse.initialize(this.parseAppId, this.parseJSKey);

  (Parse as any).serverURL = this.parseServerUrl; // use your server url

  }


}