import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { user, Auth } from '@angular/fire/auth';
import { AvatarService } from '../../services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile = null;
  user = null;
  photoURL: string = null;
  displayName: string = null;
  email: string = null;
  emailVerified = false;
  isAnonymous: boolean = null;

  editDisplayName = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private afAuth: Auth,
    private translateService: TranslateService,
    private weatherService: WeatherService
  ) {

    user(this.afAuth).subscribe((response) => {
      //fill the user to verify if someone is logged in
      this.user = response;
      if (response !== null) {
        //console.log(response);
        this.displayName = response.displayName;
        this.email = response.email;
        this.photoURL = response.photoURL;
        this.emailVerified = response.emailVerified;
        this.isAnonymous = response.isAnonymous;
      } else {
        this.displayName = null;
        this.email = null;
        this.photoURL = null;
        this.emailVerified = false;
        this.isAnonymous = null;
      }
    });
  }
  ngOnInit(): void {}

  deleteAvatar(){
    this.avatarService.removeImage(); //remove image from storage
    this.photoURL = null; //remove image from profile page
    this.authService.updatePhotoURL('');  //remove profile url from profile
  }

  editDisplayNameField() {
    this.editDisplayName = true;
  }

  updateUserName(name: string) {
    this.authService.updateUserName(name);
    this.editDisplayName = false;
  }

  verifyEmail() {
    this.authService.sendVerificationMail();
    this.showAlert(
      this.translateService.instant('profilePage.verification-mail-sent'),
      this.translateService.instant('profilePage.check-also-spam')
    );
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
  //delete user in firebase project, not actual google profile
  deleteAccount(){
    //todo: show pop up with question if user really wants to delete his account if clicked yes, delete account
    this.authService.deleteAccount();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  getWeather() {
    this.weatherService.showCurrentWeather();
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create({
        message:  this.translateService.instant('profilePage.processing-image'),
      });
      await loading.present();
      const result = await this.avatarService.uploadImage(image);
      window.location.reload(); //ugly to force the image to reload after upload
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: this.translateService.instant('profilePage.upload-failed'),
          message: this.translateService.instant('profilePage.problem-uploading-avatar'),
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
