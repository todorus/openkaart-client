import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { HttpModule }                       from '@angular/http';
import { RouterModule, Routes }             from '@angular/router';
import { ReactiveFormsModule }              from '@angular/forms';

import { AppComponent }                     from './app.component';
import { Config }                           from './config';
import { LabelListComponent }               from './general/labellist.component';
import { PaginationComponent }              from './general/pagination.component';
import { RegionListComponent }              from './regions/regionlist.component';
import { RegionDetailComponent }              from './regions/regiondetail.component';
import { LoaderComponent }                  from './general/loader.component';
import { RegionService }                    from './regions/region.service';
import { MapComponent }                    from './map/map.component';
import { MapService }                    from './map/map.service';

import { UserService }                        from './users/user.service';
import { LoginComponent }                    from './users/login.component';

// import 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const appRoutes: Routes = [
  { path: 'users/login', component: LoginComponent },
  { path: 'regions/:uuid', component: RegionDetailComponent },
  { path: 'regions', component: RegionListComponent },
  { path: '', component: RegionListComponent }
];


@NgModule({
  imports:      [ BrowserModule, HttpModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule ],
  declarations: [ AppComponent, LabelListComponent, RegionListComponent, PaginationComponent,
                  LoaderComponent, MapComponent, RegionDetailComponent , LoginComponent],
  providers:    [ Config, RegionService, MapService, UserService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
