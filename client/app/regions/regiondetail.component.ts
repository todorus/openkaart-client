import { Component, OnInit } from '@angular/core';
import { Region } from './region';
import { RegionService } from './region.service';
import { MapService } from '../map/map.service';

@Component({
  selector: 'region-detail',
  templateUrl: 'app/regions/regiondetail.html'
})
export class RegionDetailComponent implements OnInit {

  constructor(private regionService :RegionService, private mapService:MapService) {

  }

  ngOnInit() {
  }
}
