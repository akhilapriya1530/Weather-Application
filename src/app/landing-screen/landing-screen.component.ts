import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css']
})
export class LandingScreenComponent implements OnInit {
  locationId = new FormControl('');
  findLoactionArry: any;
  locationArry: any = [];
  constructor(private http: HttpClient) {
    let data = [{ ZipCode: 95742, APIDatas: { "coord": { "lon": -121.22, "lat": 38.6 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "base": "stations", "main": { "temp": 78.28, "feels_like": 72.46, "temp_min": 75.99, "temp_max": 80.01, "pressure": 1014, "humidity": 27 }, "visibility": 16093, "wind": { "speed": 6.93, "deg": 300 }, "clouds": { "all": 5 }, "dt": 1592342174, "sys": { "type": 1, "id": 4887, "country": "US", "sunrise": 1592311204, "sunset": 1592364687 }, "timezone": -25200, "id": 0, "name": "Rancho Cordova", "cod": 200 } },
    { ZipCode: 10001, APIDatas: { "coord": { "lon": -74, "lat": 40.75 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "base": "stations", "main": { "temp": 75.04, "feels_like": 71.37, "temp_min": 71.01, "temp_max": 78.8, "pressure": 1027, "humidity": 53 }, "visibility": 16093, "wind": { "speed": 10.29, "deg": 130 }, "clouds": { "all": 1 }, "dt": 1592342158, "sys": { "type": 1, "id": 4610, "country": "US", "sunrise": 1592299454, "sunset": 1592353768 }, "timezone": -14400, "id": 0, "name": "New York", "cod": 200 } }]
    this.locationArry = data
    localStorage.setItem('Added_locations', JSON.stringify(this.locationArry))
  }

  ngOnInit(): void {
  }
  saveLocation() {
    this.locationArry = []
    this.findLoactionArry = localStorage.getItem("Added_locations")
    this.locationArry = JSON.parse(this.findLoactionArry)
    if (this.locationArry && this.locationArry.length > 0) {
      let APIData
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${this.locationId.value}&appid=5a4b2d457ecbef9eb2a71e480b947604`).subscribe((data: any) => {
        APIData = data
        this.locationArry.push({ ZipCode: this.locationId.value, APIDatas: APIData })
        localStorage.setItem('Added_locations', JSON.stringify(this.locationArry))
      })

    } else {
      this.locationArry = []
      let APIData
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${this.locationId.value}&appid=5a4b2d457ecbef9eb2a71e480b947604`).subscribe((data: any) => {
        APIData = data
        this.locationArry.push({ ZipCode: this.locationId.value, APIDatas: APIData })
        localStorage.setItem('Added_locations', JSON.stringify(this.locationArry))
      })

    }
  }
  getImage(val: any){
    console.log(val+'.png');
    return val+'.png'
  }
  selectedData(obj:any){
    this.findLoactionArry = localStorage.getItem("Added_locations")
    this.locationArry = JSON.parse(this.findLoactionArry)
    let findObj = this.locationArry.findIndex((b:any) => b.ZipCode == obj.ZipCode )
    this.locationArry.splice(findObj, 1);
    localStorage.setItem('Added_locations', JSON.stringify(this.locationArry))
  }
}
