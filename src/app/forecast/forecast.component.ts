import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  APIData: any = [];
  finalArryList: any = [];
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['zipcode']) {
        this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${(params['zipcode'])}&appid=5a4b2d457ecbef9eb2a71e480b947604`).subscribe((data: any) => {
          this.APIData = data
          this.APIData.list.forEach((element: any) => {
            if (this.finalArryList.length > 0) {
              let findData = this.finalArryList.find((d: any) => { return moment(d.dt_txt).format('YYYY-MM-DD') == moment(element.dt_txt).format('YYYY-MM-DD') })
              if (!findData) { this.finalArryList.push(element) }
            } else {
              this.finalArryList.push(element)
            }
          });
        });
      }
    })
    console.log(this.finalArryList, 'finalArryList');
  }
  getDayByDate(val: any) {
    const dow = moment(val.dt_txt).format('dddd');
    return dow;
  }
  clickBack(){
    this.router.navigate([`landingScreen`])
  }
}
