import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  public user: User = {
      username: null,
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      isAdmin: false
    };

  loading = false;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUserInfo().subscribe((userData) => {
      this.user.username = userData.username;
      this.user.email = userData.email;
      this.user.firstName = userData.firstName;
      this.user.lastName = userData.lastName;
      this.user.isAdmin = userData.isAdmin;
    }, error => {
      //todo
      console.log(error);
      
    });
    this.loading = false;
  }

  update() {
  	this.loading = true;
    this.userService.update(this.user)
        .subscribe(
            data => {
          
            },
            error => {
            	//todo
              console.log(error);
            
            });
    this.loading = false;
  }

    

}
