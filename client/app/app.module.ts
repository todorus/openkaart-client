import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';

import { AppComponent }   from './app.component';
import { LabelListComponent }       from './general/labellist.component';
import { RegionListComponent }      from './regions/regionlist.component';
import { RegionService }            from './regions/region.service';

import 'rxjs/Rx';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, LabelListComponent, RegionListComponent ],
  providers:    [ RegionService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
