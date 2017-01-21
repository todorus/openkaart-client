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

  private ngOnInit():void {
    this.userService.retrieveSession();
  }

  private setUser(user:User):void {
    console.log("session user",user);
    this.hasSession = user != null;
    this.user = user;
  }

}
