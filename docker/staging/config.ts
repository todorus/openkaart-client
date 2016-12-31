import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  private _map = {
    "base_url":"https://staging.waarregelikzorg.nl"
  };

  public get(key:string):string {
    return this._map[key];
  }
}
