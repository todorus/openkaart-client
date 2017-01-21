import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { Pagination } from '../general/pagination';
import { RegionResponse } from './regionresponse';
import { Region } from './region';
import { Config } from '../config';

@Injectable()
export class RegionService {

  REGIONS_URL :string; //= "https://staging.waarregelikzorg.nl/regions";

  constructor(private http: Http, config: Config) {
    this.REGIONS_URL = config.get("base_url") + "/regions"
  }

  index(query:string, page:number):Observable<RegionResponse> {
    var params = new URLSearchParams();
    if(query != null){
      params.set("q", query);
    }
    if(page != null){
      params.set("page", String(page));
    }

    return this.http.get(this.REGIONS_URL, { search: params })
               .map(response => <RegionResponse> response.json())
               .catch(this.handleError);
  }

  show(uuid:string):Observable<Region> {
    let url:string = this.REGIONS_URL+"/"+uuid;
    return this.http.get(url)
               .map(response => <Region> response.json())
               .catch(this.handleError);
  }

  private handleError(error:Response) {
      // in a real world app, we may send the error to some remote logging infrastructure
      // instead of just logging it to the console
      console.error(error);
      return Observable.throw(error.json().fault || error);
  }
}
