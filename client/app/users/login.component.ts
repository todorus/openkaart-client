import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from './user.service';

@Component({
  selector: 'login',
  templateUrl: 'app/users/login.html',
  styleUrls: ['app/users/login.css']
})
export class LoginComponent implements OnInit {

  private user : FormGroup;
  private loading :boolean;

  constructor(private userService:UserService, private router:Router,
    private flashMessageService: FlashMessagesService){
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
                       this.router.navigate(['/dashboard']);
                     },
                     error =>  {
                       this.loading = false;

                       let flashOptions = {cssClass: 'flash-fail', timeout: 5000};
                       var message:string;
                       if(error.status == 401) {
                         message = "Incorrect username/password";
                       } else {
                         message = "An error occurred while logging in";
                       }
                       this.flashMessageService.show(message, flashOptions);
                     }
                   );
  }

}
