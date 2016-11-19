import { Component, OnInit } from '@angular/core';
import { Region } from './region';
import { RegionService } from './region.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'region-list',
  templateUrl: 'app/regions/regionlist.html'
})
export class RegionListComponent implements OnInit {

  private timeoutId :any;
  private regions :Array<Region>;

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
      this.search(event.target.value);
      this.timeoutId = null;
    }, 200);
  }

  ngOnInit() {
    this.search(null);
  }

  search(query:string) {
    this.regionService.index(query)
                  .subscribe(
                     regionData => {
                       this.regions = regionData.data;
                     },
                     error =>  {}
                   );
  }

  select(region:Region){
      console.log("selected", region);
  }
}
