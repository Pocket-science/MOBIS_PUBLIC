import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core"
const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import '@capacitor-community/camera-preview';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  image ="";
  cameraActive = false;
  constructor(private modal: ModalController) { }

  ngOnInit() {
    this.launchCamera();
  }

  launchCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear', // front or rear
      parent: 'content', // the id on the ion-content
      className: '',
      width: window.screen.width, //width of the camera display
      height: window.screen.height - 200, //height of the camera
      toBack: false,
      disableAudio: true,
      enableHighResolution: true,
    };
    CameraPreview['start'](cameraPreviewOptions);
    this.cameraActive = true;
  }

  async takePicture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 90
    };
    const result = await CameraPreview['capture'](cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this.stopCamera();
  }

  async stopCamera() {
    await CameraPreview['stop']();
    this.modal.dismiss(this.image);
  }

  async flipCamera() {
    await CameraPreview['flip']();
  }


}
