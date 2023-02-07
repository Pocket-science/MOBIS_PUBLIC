import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface WeatherData{
  temp: number;
  description: string;
  iconUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  public blackGemCoords: {lat: number; lng: number} = {lat: -29.257674, lng: -70.737855};
  public meerLichtCoords: {lat: number; lng: number} = {lat: -32.379864, lng: 20.811234};

  userLat: number;
  userLng: number;

  constructor(private http: HttpClient) { }

  //function that gets the users current location and then calls the showWeather function
  showCurrentWeather() {
    this.getLocation().then((pos: {lat: number; lng: number}) => {
      console.log(`Positon: ${pos.lat} ${pos.lng}`);
      this.userLat = pos.lat;
      this.userLng = pos.lng;
      this.showWeather(pos.lat, pos.lng);
    });
  }

  //function that returns the users current location as a promise from the geolocation API
  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lat: resp.coords.latitude, lng: resp.coords.longitude });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  //function that writes all weather info from the result of the openweathermap.org API in a nice pop up window
  showWeather(lat: number, lng: number) {
    this.http
      .get(
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
          lat +
          '&lon=' +
          lng +
          '&appid=edd7d6eab104383027cd6cc21f32d772&units=metric'
      )
      .subscribe((res: any) => {
        const temp = res.main.temp;
        const iconcode = res.weather[0].icon;
        console.log(iconcode);
        const iconurl = 'http://openweathermap.org/img/w/' + iconcode + '.png';
        console.log(temp);
        console.log(iconurl);
        //display the weather icon, fetches the temperature from the weather.main object
        const weatherPopup = window.open(
          '',
          'Weather',
          'width=300,height=300'
        );
        weatherPopup.document.write(
          '<p>Current weather: ' +
            res.weather[0].description +
            '</p><img src=' +
            iconurl +
            '><p>Temperature: ' +
            temp +
            '°C</p>'
        );
      });
  }

  //function that returns the weather from openweathermap.org API and returns a single line of text with all weather info as an observable
  getWeather(lat: number, lng: number): Promise<WeatherData> {
    let description: string;
    let temp: number;
    let iconUrl: string;
    return new Promise<WeatherData>((resolve, reject) => {
      try {
        this.http
      .get(
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
          lat +
          '&lon=' +
          lng +
          '&appid=edd7d6eab104383027cd6cc21f32d772&units=metric'
      ).subscribe((res: any) => {
        temp = res.main.temp;
        const iconcode = res.weather[0].icon;
        description = res.weather[0].description;
        //console.log(iconcode);
        iconUrl = 'http://openweathermap.org/img/w/' + iconcode + '.png';
        console.log(temp);
        console.log(iconUrl);
       console.log(description);
        resolve({temp, description, iconUrl});
      });

      }
      catch (error) {
        reject(error);
      }
    });
  }

}
