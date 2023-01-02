import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { user, Auth } from '@angular/fire/auth';
import { AvatarService } from '../../services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService
  ) {
    // not the nicest way, sort of duplicate to have a URL in the profile variable and also check later the user variable
    this.avatarService.getUserProfile().subscribe((data) => {
      if (data) {
        this.profile = data;
        if (this.profile.imageUrl !== null) {
          this.photoURL = this.profile.imageUrl;
        }
      }
      //console.log('data' , data);
    });

    user(this.afAuth).subscribe((response) => {
      //fill the user to verify if someone is logged in
      this.user = response;
      if (response !== null) {
        console.log(response);
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
