import { Component, OnInit } from '@angular/core';
import { Region } from './region';
import { RegionService } from './region.service';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { Pagination } from '../general/pagination';

@Component({
  selector: 'region-list',
  templateUrl: 'app/regions/regionlist.html'
})
export class RegionListComponent implements OnInit {

  private static ARROW_UP:number = 38;
  private static ARROW_DOWN:number = 40;
  private static ARROW_LEFT:number = 37;
  private static ARROW_RIGHT:number = 39;
  private static BACKSPACE:number = 8;

  private regions :Array<Region>;
  private pages :Pagination;
  private loading:boolean = false;

  private _query:string = null;
  private timeoutId :any;

  constructor(private regionService :RegionService, private router:Router) {
    this.timeoutId = null;
    this.regions = [];
  }

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
    this.search(null, null);
  }

  search(query:string, page:number) {
    this.loading = true;
    this.regionService.index(query, page)
                  .subscribe(
                     regionData => {
                       if(query == this._query){
                         this.loading = false;
                         this.regions = regionData.data;
                         this.pages = regionData.pages;
                       }
                     },
                     error =>  {
                       this.loading = false;
                       //TODO show error
                     }
                   );
  }

  onPage(page:number){
    this.search(this._query, page);
  }

  select(region:Region){
      console.log("selected", region);
      this.router.navigate(['/regions', region.uuid]);
  }
}
