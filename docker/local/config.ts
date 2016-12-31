import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  private _map = {
    "base_url":"http://localhost:5000"
  };

  public get(key:string):string {
    return this._map[key];
  }
}
