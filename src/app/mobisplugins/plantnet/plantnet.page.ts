import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-plantnet',
  templateUrl: './plantnet.page.html',
  styleUrls: ['./plantnet.page.scss'],
})
export class PlantnetPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

// now 
const data = {
  PROJECT: 'all',
  API_URL : 'https://my-api.plantnet.org/v2/identify/all?api-key=',
  API_KEY : 'my-api-key',
  API_SIMSEARCH_OPTION : '&include-related-images=true',
  API_LANG : '&lang=en'
  };
  
  this.http.post('http://your-api-endpoint.com', data).subscribe((response) => {
  console.log(response);
  });

}

}
