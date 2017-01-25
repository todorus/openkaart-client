import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { HttpModule }                       from '@angular/http';
import { RouterModule, Routes }             from '@angular/router';
import { ReactiveFormsModule }              from '@angular/forms';
import { FlashMessagesModule }              from 'angular2-flash-messages';

import { AppComponent }                     from './app.component';
import { Config }                           from './config';
import { AuthHttp }                         from './auth/authhttp';
import { WelcomeComponent }                 from './about/welcome.component';
import { LabelListComponent }               from './general/labellist.component';
import { PaginationComponent }              from './general/pagination.component';
import { RegionListComponent }              from './regions/regionlist.component';
import { RegionDetailComponent }            from './regions/regiondetail.component';
import { LoaderComponent }                  from './general/loader.component';
import { RegionService }                    from './regions/region.service';
import { MapComponent }                     from './map/map.component';
import { MapService }                       from './map/map.service';
import { DashboardComponent }               from './admin/dashboard.component';

import { UserService }                      from './users/user.service';
import { LoginComponent }                   from './users/login.component';
import { SessionComponent }                 from './users/session.component';

import { AppRoutingModule }                 from './app-routing.module';

// import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//TODO implement a route gaurd for admin functions
@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule,
                  FlashMessagesModule, AppRoutingModule ],
  declarations: [ AppComponent, LabelListComponent, RegionListComponent, PaginationComponent,
                  LoaderComponent, MapComponent, RegionDetailComponent , LoginComponent,
                  SessionComponent, WelcomeComponent, DashboardComponent],
  providers:    [ Config, AuthHttp, RegionService, MapService, UserService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
