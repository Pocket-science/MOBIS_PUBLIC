import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { AuthService } from '../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user = null;
  language= '';
  constructor(
    private menuController: MenuController,
    private translateService: TranslateService,
    private authService: AuthService,
    private afAuth: Auth,
    private storage: Storage,
    private router: Router
   
  ) {


    user(this.afAuth).subscribe((response) => {
      //fill the user to verify if someone is logged in
      this.user = response;
    });





  }
  async ngOnInit(): Promise<void> {


    const options: PositionOptions = {
      maximumAge: 10000,
      enableHighAccuracy: true
    };
    
    const location = await Geolocation.getCurrentPosition(options);
    
    console.log('Current location: ', location);


    this.storage.create();
    this.translateService.setDefaultLang('en'); //set default language English

    this.language = await this.storage.get('language');
    if (this.language === null){
      console.log('no value for language in storage, trying getting from browser');
      this.language = this.translateService.getBrowserLang();
   
    }
    this.translateService.use(this.language);


  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  openMenu(){
    this.menuController.open();
  }

  



}
