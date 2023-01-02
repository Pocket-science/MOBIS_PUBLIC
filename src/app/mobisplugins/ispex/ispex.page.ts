import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreviewPage } from './preview/preview.page';
 
declare var cv: any; 

@Component({
  selector: 'app-ispex',
  templateUrl: './ispex.page.html',
  styleUrls: ['./ispex.page.scss'],
})


export class IspexPage implements AfterViewInit {

  @ViewChild('imageCanvas', { static: false }) canvasEl : ElementRef;

  @ViewChild('image', { static: false }) imageEl : ElementRef;

  image = null;
  constructor(private modal: ModalController) {}
  
  ngAfterViewInit() {


//     this._CANVAS       = this.canvasEl.nativeElement;
// this._IMAGE       = this.imageEl.nativeElement;

console.log ("ngAfterViewInit");


  }


  async openCamera() {
    const modal = await this.modal.create({
      component: PreviewPage,
      cssClass: 'fullscreen',
      animated: true
    });

    modal.onDidDismiss().then((data) => {
        if (data !== null) {
            this.image = data.data;


   let imgElement = document.getElementById('img');
let src = cv.imread(imgElement);
let dst = new cv.Mat();
let dsize = new cv.Size(src.rows, src.cols);
let center = new cv.Point(src.cols / 2, src.rows / 2);
let M = cv.getRotationMatrix2D(center, -90, 1);
cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); M.delete();


  cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); 




        }
    });

    return await modal.present();
  }






}