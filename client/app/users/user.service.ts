import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { User } from './user';
import { Config } from '../config';
import { AuthHttp } from '../auth/authhttp';


@Injectable()
export class UserService {

  USERS_URL :string;// = "https://staging.waarregelikzorg.nl/users";

  private userStore: User;
  private userSubject: Subject<User> = new Subject<User>()
  user$ = this.userSubject.asObservable();

  constructor(private authhttp: AuthHttp, config: Config) {
    this.USERS_URL = config.get("base_url") + "/users";
    this.retrieveSession();
  }

  public retrieveSession():void {
    let sessionData:any = this.authhttp.getSession();
    if(sessionData == null){
      this.setUser(null);
      return;
    }

    let user:User = new User();
    user.username = sessionData["username"];
    this.setUser(user);
  }

  public login(username:string, password:string):Observable<User> {

    return this.authhttp.post(this.USERS_URL+"/login", { username: username, password: password })
               .do(response => {
                 var jwt = response.headers.get("JWT");
                 this.authhttp.setToken(jwt);
                 this.retrieveSession();
               })
               .map(response => <User> response.json())
               .catch(this.handleError);
  }

  public logout():void {
    this.authhttp.setToken(null);
    this.retrieveSession();
  }

  private setUser(user:User):void {
    this.userStore = user;
    this.userSubject.next(this.userStore);
  }

  private handleError(error:Response) {
      // in a real world app, we may send the error to some remote logging infrastructure
      // instead of just logging it to the console
      console.error("userservice.handleError", error);
      return Observable.throw(error);
  }
}
