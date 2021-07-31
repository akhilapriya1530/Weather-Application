import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';

const routes: Routes = [
  {
    path: 'landingScreen',
    component: LandingScreenComponent,
  },
  {
    path: 'forecast/:zipcode',
    component: ForecastComponent,
  },
  {
    path: '',
    redirectTo: 'landingScreen',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
