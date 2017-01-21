import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: 'app/users/login.html'
})
export class LoginComponent implements OnInit {

  private user : FormGroup;

  constructor(private userService:UserService){}

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  public submit(user:any):void {
    this.userService.login(user.username, user.password)
                  .subscribe(
                     user => {
                       console.log("response", user);
                     },
                     error =>  {}
                   );
  }

}
