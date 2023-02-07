import { Component, OnInit } from '@angular/core';
import {ENV} from '../../../app.constant';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.page.html',
  styleUrls: ['./classify.page.scss'],
})
export class ClassifyPage implements OnInit {
   PROJECT = 'all'; // try 'weurope' or 'canada'
   API_URL = 'https://my-api.plantnet.org/v2/identify/' + this.PROJECT + '?api-key=';
   API_PRIVATE_KEY = ENV.plantnetKey; // secret
   API_SIMSEARCH_OPTION = '&include-related-images=true'; // optional: get most similar images
   API_LANG = '&lang=fr'; // default: en
  
   IMAGE_1 = '../data/image_1.jpeg';
   ORGAN_1 = 'flower';
   IMAGE_2 = '../data/image_2.jpeg';
   ORGAN_2 = 'leaf';
  
  constructor() { }

  ngOnInit() {

// now make a POST request to the API
const xhr = new XMLHttpRequest();
xhr.open('POST', this.API_URL + this.API_PRIVATE_KEY + this.API_SIMSEARCH_OPTION + this.API_LANG, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function () {
  // do something to response
  console.log(this.responseText);
};
xhr.send(JSON.stringify({
  images: [
    { 
      url: this.IMAGE_1,
      organ: this.ORGAN_1
    },
    {
      url: this.IMAGE_2,
      organ: this.ORGAN_2

    } 
  ]
}));








  }

}
