import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private afAuth: Auth,
    private translateService: TranslateService
  ) {
    this.afAuth.onAuthStateChanged((userState) => {
      this.user = userState;
    });
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get name() {
    return this.credentials.get('name');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const loading = await this.loadingController.create({
      backdropDismiss: true,
      message: this.translateService.instant('signupPage.creating-account'),
      duration: 5000,
    });
    await loading.present();
    console.log('received following values at registration', this.credentials);
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/profile', { replaceUrl: true });
    } else {
      this.showAlert(
        this.translateService.instant('signupPage.registration-failed'),
        this.translateService.instant('signupPage.please-try-again')
      );
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/profile']))
      .catch((e) => console.log(e.message));
  }

  loginWithApple() {
    this.authService
      .loginWithApple()
      .then(() => this.router.navigate(['/profile']))
      .catch((e) => console.log(e.message));
  }
}
