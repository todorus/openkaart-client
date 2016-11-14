import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { Pagination } from '../general/pagination';
import { RegionResponse } from './regionresponse';

@Injectable()
export class RegionService {

  REGIONS_URL :string = "http://staging.waarregelikzorg.nl/regions";

  constructor(private http: Http) { }

  index():Observable<RegionResponse> {
    //stub
    console.log("RegionService.index()");
    return this.http.get(this.REGIONS_URL)
               .map(response => <RegionResponse> response.json())
               .catch(this.handleError);
  }

  private handleError(error:Response) {
      // in a real world app, we may send the error to some remote logging infrastructure
      // instead of just logging it to the console
      console.error(error);
      return Observable.throw(error.json().fault || error);
  }
}
