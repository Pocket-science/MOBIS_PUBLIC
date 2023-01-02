import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Plugins } from '@capacitor/core';
import {  CameraResultType } from '@capacitor/camera';


const { Camera } = Plugins;

@Component({
  selector: 'app-colourathalfdepth',
  templateUrl: './colourathalfdepth.page.html',
  styleUrls: ['./colourathalfdepth.page.scss'],
})

export class ColourathalfdepthPage implements OnInit {
public reappear_val:number;
public distancetowater_val: number;
public secchi_depth:number;
public colourathalfdepth:number;
public halfdepth:number;
public PictureTaken:string;



  constructor(private storage: Storage) { }



  async ngOnInit() {


    await this.storage.create();





  this.storage.get('reappear').then((val) => {

    console.log('reappear', val);
    this.reappear_val=val;

  });


  this.storage.get('distancetowater').then((val) => {

    this.distancetowater_val=val;
    this.secchi_depth=this.reappear_val-this.distancetowater_val;
    
    //secchi depth (Zsd = reappear 1.2 – 1.1 distance to water)

    this.halfdepth=this.distancetowater_val+((this.reappear_val-this.distancetowater_val)/2);

  });




}





async takePicture() {
  try {
    const Picture = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    this.PictureTaken = "data:image/jpeg;base64," + Picture.base64String;
   this.storage.set('colourathalfdepthimage', Picture.base64String).then(result => {
console.log('Data is saved');
}).catch(e => {
console.log("error: " + e);
});


  } catch (error) {
    console.error(error);
  }
}



  async validate() {
  //  alert(`hola ${this.distancetowater}!`);
    await this.storage.create();

this.storage.set('colourathalfdepth', this.colourathalfdepth).then(result => {
// console.log('Data is saved');
}).catch(e => {
 console.log("error: " + e);
});


this.storage.set('secchi_depth', this.secchi_depth).then(result => {
// console.log('Data is saved');
}).catch(e => {
 console.log("error: " + e);
});





  }





}
