import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  language = '';
  constructor(private translateService: TranslateService, private storage: Storage) { }

  async ngOnInit() {
    this.language = this.translateService.currentLang;
  }


  setLanguage(){
    this.translateService.use(this.language);
    this.storage.set('language', this.language);
  }

}
