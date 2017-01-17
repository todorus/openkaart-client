import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { User } from './user';
import { Config } from '../config';


@Injectable()
export class UserService {

  USERS_URL :string;// = "https://staging.waarregelikzorg.nl/users";

  constructor(private http: Http, config: Config) {
    this.USERS_URL = config.get("base_url") + "/users"
  }

  public login(username:string, password:string):Observable<User> {
    console.log("Userservice.login()");

    return this.http.post(this.USERS_URL+"/login", { username: username, password: password })
               .do(response => {
                 var jwt = response.headers.get("JWT");
                 localStorage.setItem("jwt", jwt);
               })
               .map(response => <User> response.json())
               .catch(this.handleError);
  }

  private handleError(error:Response) {
      // in a real world app, we may send the error to some remote logging infrastructure
      // instead of just logging it to the console
      console.error(error);
      return Observable.throw(error.json().fault || error);
  }
}
