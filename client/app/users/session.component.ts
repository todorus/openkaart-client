import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'session',
  templateUrl: 'app/users/session.html',
  styleUrls: ['app/users/session.css']
})
export class SessionComponent implements OnInit {

  private hasSession:boolean;
  private user:User;

  constructor(private userService:UserService){
    userService.user$.subscribe(user => this.setUser(user));
    this.hasSession = false;
  }

  public ngOnInit():void {
    this.userService.retrieveSession();
  }

  private logout():void {
    this.userService.logout();
  }

  private setUser(user:User):void {
    this.hasSession = user != null;
    this.user = user;
  }

}
