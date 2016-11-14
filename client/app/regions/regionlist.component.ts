import { Component, OnInit } from '@angular/core';
import { Region } from './region';
import { RegionService } from './region.service';

@Component({
  selector: 'region-list',
  templateUrl: 'app/regions/regionlist.html'
})
export class RegionListComponent implements OnInit {

  regions :Array<Region>;

  constructor(private regionService :RegionService) {
    this.regions = [];
  }
  ngOnInit() {
    this.regionService.index()
                  .subscribe(
                     regionData => {
                       console.log("gotten data", regionData);
                       this.regions = regionData.data;
                     },
                     error =>  {}
                   );
  }
}
