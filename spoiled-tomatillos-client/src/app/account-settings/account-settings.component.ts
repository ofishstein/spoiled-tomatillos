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

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((userData) => {
      this.user.username = userData.username;
      this.user.email = userData.email;
      this.user.firstName = userData.firstName;
      this.user.lastName = userData.lastName;
      this.user.isAdmin = userData.isAdmin;
    });
  }

}
