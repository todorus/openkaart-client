import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { HttpModule }                       from '@angular/http';

import { AppComponent }                     from './app.component';
import { LabelListComponent }               from './general/labellist.component';
import { PaginationComponent }              from './general/pagination.component';
import { RegionListComponent }              from './regions/regionlist.component';
import { LoaderComponent }                  from './general/loader.component';
import { RegionService }                    from './regions/region.service';
import { MapComponent }                    from './map/map.component';

// import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, LabelListComponent, RegionListComponent, PaginationComponent,
                  LoaderComponent, MapComponent ],
  providers:    [ RegionService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
