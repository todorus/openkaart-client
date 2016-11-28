import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Region } from './region';
import { RegionService } from './region.service';
import { MapService } from '../map/map.service';


@Component({
  selector: 'region-detail',
  templateUrl: 'app/regions/regiondetail.html'
})
export class RegionDetailComponent implements OnInit {

  private region:Region;

  constructor(
    private regionService:RegionService,
    private mapService:MapService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit() {
      this.route.params
        .switchMap((params: Params) => this.regionService.show(params['uuid']))
        .subscribe((region: Region) => this.setRegion(region));
    }

    public setRegion(region:Region){
      this.region = region;
      this.mapService.show(region);
    }
}
