import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  user: User | null = null;
  showForm = false;

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

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create({
      backdropDismiss: true,
      message: this.translateService.instant('loginPage.logging-in-with-email'),
      duration: 5000,
    });
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/profile', { replaceUrl: true });
    } else {
      this.showAlert(this.translateService.instant('loginPage.login-failed'), this.translateService.instant('loginPage.please-try-again'));
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

  async loginWithGoogle() {
    const loading = await this.loadingController.create({
      backdropDismiss: true,
      message: this.translateService.instant('loginPage.logging-in-with-google'),
      duration: 5000,
    });
    await loading.present();
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
    await loading.dismiss();
  }

  async loginWithApple() {
    const loading = await this.loadingController.create({
      backdropDismiss: true,
      message:  this.translateService.instant('loginPage.logging-in-with-apple'),
      duration: 5000,
    });
    await loading.present();
    this.authService
      .loginWithApple()
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
    await loading.dismiss();
  }

  async anonymousLogin() {
    const loading = await this.loadingController.create({
      backdropDismiss: true,
      message: this.translateService.instant('loginPage.logging-in-anonymously'),
      duration: 5000,
    });
    await loading.present();
    this.authService
      .anonymousLogin()
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
    await loading.dismiss();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
