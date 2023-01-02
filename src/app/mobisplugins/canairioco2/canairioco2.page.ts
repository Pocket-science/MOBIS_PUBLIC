
import { Component, OnInit } from '@angular/core';
import { ENV } from '../../app.constant';
import { Geolocation} from '@capacitor/geolocation';
import { Guid } from "guid-typescript";
import {interval, Subscription} from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import * as Parse from 'parse';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

// Setup Bluetooth LE
// Import the wrapper class directly

import { BleClient, numbersToDataView, numberToUUID,   dataViewToText } from '@capacitor-community/bluetooth-le';


const PM25_SERVICE = 'C8D1D262-861F-4082-947E-F383A259AAF3';

const PM25_SERVICE_LCASE= 'c8d1d262-861f-4082-947e-f383a259aaf3';


const PM25_SERVICE_CHARACTERISTIC = 'B0F332A8-A5AA-4F3F-BB43-F99E7791AE01';
/* other services    "B0F332A8-A5AA-4F3F-BB43-F99E7791AE02",
    "B0F332A8-A5AA-4F3F-BB43-F99E7791AE03"
*/

@Component({
  selector: 'app-canairio',
  templateUrl: './canairioco2.page.html',
  styleUrls: ['./canairioco2.page.scss'],
})
export class Canairioco2Page implements OnInit {
public txtco2: string;
public datetime_ux: string;
public datetime: Date;
public latitude: number;
public  longitude: number;
public  altitude: number;
private parseAppId: string = ENV.parseAppId;
private parseServerUrl: string = ENV.parseServerUrl;
private parseJSKey: string=ENV.parseJSKey;
public result: string;
public output_json: string;
public rec_uid: string;
public session_uid: string;

public deviceId:string;
public intervalID:NodeJS.Timeout;
public logInterval:number;
public lblLogstatus: string;
public allData: any;
public CO2: string;
public TEMP: string;
public HUMID: string;
public PAX: string;
public CO2Interpret:string;

public ParseServerKey:string;
public ParseServerURL:string;
public ParseServerAppID:string;


constructor(private backgroundMode: BackgroundMode) { }


// Initialize Parse SDK and connect to Parse Server


ngOnInit() {

this.parseInitialize();
this.getLocation();
this.connect();
this.logInterval=5000;
this.lblLogstatus="Not logging";
   this.readandSave();

   this.parseAppId=ENV.parseAppId;
    this.parseServerUrl=ENV.parseServerUrl;
    this.parseJSKey=ENV.parseJSKey;


  }

// i am not sure if this is needed, because CO2 is not moving

async startLogging() {

  this.backgroundMode.enable();

this.lblLogstatus="Logging..";
// set session uid
this.session_uid = Guid.raw(); // make it a string
var str_counter;
    str_counter=0;


        this.intervalID = setInterval( () => {


this.lblLogstatus="Logging: " + str_counter.toString()  ;

    str_counter++;

          this.getLocation();
          this.readandSave();

        },this.logInterval);



}


async stopLogging() {
 clearInterval(this.intervalID);
 this.lblLogstatus="Not logging";

 this.backgroundMode.disable();


}


async readandSave() {

 const result = await BleClient.read(this.deviceId, PM25_SERVICE, PM25_SERVICE_CHARACTERISTIC);
  console.log('canair.io result array', dataViewToText(result));

this.allData = JSON.parse(dataViewToText(result)); // parse json data and pass json string




this.CO2= this.allData['CO2'];


// Indoor CO2 levels 
if (Number(this.CO2)>0  &&  Number(this.CO2)<700  ) this.CO2Interpret= ("Excellent");
if (Number(this.CO2)>=700 && Number(this.CO2)<800 )this.CO2Interpret= ("Good");
if (Number(this.CO2)>=800 && Number(this.CO2)<1000 )this.CO2Interpret= ("Fair");
if (Number(this.CO2)>=1000 && Number(this.CO2)<1500 )this.CO2Interpret= ("Mediocre");
if (Number(this.CO2)>=1500 ) this.CO2Interpret= ("Bad");



this.TEMP= this.allData['tmp'];
this.HUMID= this.allData['hum'];
this.PAX= this.allData['PAX'];
this.CO2= this.allData['CO2'];

// lets assume we have
if (Number(this.CO2)>0) {
this.TEMP= this.allData['CO2T'];
this.HUMID= this.allData['CO2H'];

}




//  this.txtco2= this.allData['CO2'];   // this is the CO2 value  

let d = new Date();
this.datetime=d;
var unixTimeStamp = Math.floor(d.getTime() / 1000);
this.datetime_ux=unixTimeStamp.toString();
this.output_json=dataViewToText(result);
this.rec_uid = Guid.raw(); // make it a string

var Comment = Parse.Object.extend('canairico2_raw_data');
var canairio_store = new Comment();
// set initial data record
canairio_store.set('session_UID',this.session_uid);
canairio_store.set('record_UID',this.rec_uid);
canairio_store.set('device_UID',this.deviceId);
canairio_store.set('output_json',dataViewToText(result));
canairio_store.set('TEMP',this.TEMP);
canairio_store.set('HUMID',this.HUMID);
canairio_store.set('CO2',this.CO2);
canairio_store.set('PAX',this.PAX);
canairio_store.set('latitude',this.latitude);
canairio_store.set('longitude',this.longitude);
canairio_store.set('altitude',this.altitude);
canairio_store.set('datetime_ux',this.datetime_ux);
await canairio_store.save();

}




// get location and save to class variables

  async getLocation()  {
  const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
  this.latitude = position.coords.latitude;
  console.log (position.coords.latitude);
  this.longitude = position.coords.longitude;
  this.altitude = position.coords.altitude;
  return position.coords;
}

// connect to parse server and initialize

  private parseInitialize() {

    Parse.initialize(this.parseAppId, this.parseJSKey);

    (Parse as any).serverURL = this.ParseServerURL; // use your server url

    }


 async  connect(){

  try {
    await BleClient.initialize();
      const device = await BleClient.requestDevice({
      namePrefix: 'CanAirIO',
      optionalServices : [PM25_SERVICE_LCASE]
    });

  //      console.log('device', device);

   await BleClient.connect(device.deviceId);
    console.log('connected to device', device);

 this.deviceId=device.deviceId;
this.readandSave();


    setTimeout(async () => {
      await BleClient.stopLEScan();
      console.log('stopped scanning');
    }, 5000);
  } catch (error) {
    console.error(error);
  }


}


}
