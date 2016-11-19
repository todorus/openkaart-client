import { Component, OnInit } from '@angular/core';
import { Region } from './region';
import { RegionService } from './region.service';
import {FormControl} from '@angular/forms';
import { Pagination } from '../general/pagination';

@Component({
  selector: 'region-list',
  templateUrl: 'app/regions/regionlist.html'
})
export class RegionListComponent implements OnInit {

  private _query:string = null;
  private timeoutId :any;
  private regions :Array<Region>;
  private pages :Pagination;

  constructor(private regionService :RegionService) {
    this.timeoutId = null;
    this.regions = [];
  }

  private static ARROW_UP:number = 38;
  private static ARROW_DOWN:number = 40;
  private static ARROW_LEFT:number = 37;
  private static ARROW_RIGHT:number = 39;
  private static BACKSPACE:number = 8;

  key(event:any){
    console.log(event);
    switch(event.which){
      case RegionListComponent.BACKSPACE:
        this.query(event);
      break;
      case RegionListComponent.ARROW_UP:
        console.log("UP");
      break;
      case RegionListComponent.ARROW_DOWN:
        console.log("DOWN");
      break;
    }
  }

  query(event:any) {
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this._query = event.target.value;
      this.search(this._query, null);
      this.timeoutId = null;
    }, 200);
  }

  ngOnInit() {
    this.search(null);
  }

  search(query:string, page:number) {
    this.regionService.index(query, page)
                  .subscribe(
                     regionData => {
                       this.regions = regionData.data;
                       this.pages = regionData.pages;
                     },
                     error =>  {}
                   );
  }

  onPage(page:number){
    this.search(this._query, page);
  }

  select(region:Region){
      console.log("selected", region);
  }
}
