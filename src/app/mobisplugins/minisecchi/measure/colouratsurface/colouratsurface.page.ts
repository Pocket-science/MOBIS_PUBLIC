import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Plugins } from '@capacitor/core';
import { CameraResultType } from '@capacitor/camera';


const { Camera } = Plugins;


@Component({
  selector: 'app-colouratsurface',
  templateUrl: './colouratsurface.page.html',
  styleUrls: ['./colouratsurface.page.scss'],
})
export class ColouratsurfacePage implements OnInit {
	public colouratsurface:number;
  public bottom_visible: string;
  public end_of_tape: string;
    public phvalue:number;
  public angle_estimated:number;
public ColouratSurfacePictureTaken:string;



  constructor(private storage: Storage) { }
  async ngOnInit() {
     this.storage.create();



}




async takePicture() {
  try {
    const Picture = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    this.ColouratSurfacePictureTaken = "data:image/jpeg;base64," + Picture.base64String;
   this.storage.set('colouratsurfaceimage', Picture.base64String).then(result => {
console.log('Data is saved');
}).catch(e => {
console.log("error: " + e);
});


  } catch (error) {
    console.error(error);
  }
}





  async validate() {

this.storage.set('colouratsurface', this.colouratsurface).then(result => {
// console.log('Data is saved');
}).catch(e => {
 console.log("error: " + e);
});


this.storage.set('phvalue', this.phvalue).then(result => {
// console.log('Data is saved');
}).catch(e => {
 console.log("error: " + e);
});


this.storage.set('bottom_visible', this.bottom_visible).then(result => {
// console.log('Data is saved');
}).catch(e => {
 console.log("error: " + e);
});

this.storage.set('end_of_tape', this.end_of_tape).then(result => {
// console.log('Data is saved');
}).catch(e => {
 console.log("error: " + e);
});




this.storage.set('angle_estimated', this.angle_estimated).then(result => {
// console.log('Data is saved');
}).catch(e => {
 console.log("error: " + e);
});




  }


}