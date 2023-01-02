import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    private menuController: MenuController, private translateService: TranslateService
  ) {







  }
  async ngOnInit(): Promise<void> {


    const options: PositionOptions = {
      maximumAge: 10000,
      enableHighAccuracy: true
    };
    
    const location = await Geolocation.getCurrentPosition(options);
    
    console.log('Current location: ', location);



  }

  openMenu(){
    this.menuController.open();
  }

  



}
