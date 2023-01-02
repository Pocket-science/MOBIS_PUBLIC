import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  user = null;
  language= '';

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router,
    private afAuth: Auth,
    private translateService: TranslateService,
    private storage: Storage
  ) {
    user(this.afAuth).subscribe((response) => {
      //fill the user to verify if someone is logged in
      this.user = response;
    });
  }
  async ngOnInit() {
    this.storage.create();
    this.translateService.setDefaultLang('en'); //set default language English

    this.language = await this.storage.get('language');
    if (this.language === null){
      console.log('no value for language in storage, trying getting from browser');
      this.language = this.translateService.getBrowserLang();
      //if
    }
    this.translateService.use(this.language);
  }


  closeMenu() {
    this.menuCtrl.close();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
