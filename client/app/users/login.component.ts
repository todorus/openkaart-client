import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: 'app/users/login.html',
  styleUrls: ['app/users/login.css']
})
export class LoginComponent implements OnInit {

  private user : FormGroup;
  private loading :boolean;

  constructor(private userService:UserService, private router:Router){
    this.loading = false;
  }

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  public submit(user:any):void {
    this.loading = true;
    this.userService.login(user.username, user.password)
                  .subscribe(
                     user => {
                       this.loading = false;
                       console.log("success");
                       this.router.navigate(['/']);
                     },
                     error =>  {
                       this.loading = false;
                       //TODO show error
                       console.log("error");
                     }
                   );
  }

}
