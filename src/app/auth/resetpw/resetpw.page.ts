import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.page.html',
  styleUrls: ['./resetpw.page.scss'],
})
export class ResetpwPage implements OnInit {
  frmPasswordReset: FormGroup;
  password = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  get email() {
    return this.frmPasswordReset.get('email');
  }

  ngOnInit() {
    this.frmPasswordReset = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  resetPw() {
    this.authService
      .sendPasswordResetEmail(this.email.value)
      .then((data) => {
        this.presentToast(this.translateService.instant('resetpwPage.password-reset-email-sent'), 'bottom', 2000);
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message: string, position, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });
    toast.present();
  }
}
