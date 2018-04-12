import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
      isAdmin: false,
      bio: null,
      preferredService: null
    };

  public isLoading: boolean;
  private _userId: number;

  constructor(private _userService: UsersService, private _router: Router) {
    this.isLoading = false;
    this._userId = null;
  }

  ngOnInit() {
    this.isLoading = true;

    this._userService.getUserInfo().subscribe((userData) => {
      if (userData) {
        this._userId = userData['id'];
        this.user.username = userData.username;
        this.user.email = userData.email;
        this.user.bio = userData.bio;
        this.user.preferredService = userData.preferredService;
        this.user.firstName = userData.firstName;
        this.user.lastName = userData.lastName;
        this.user.isAdmin = userData.isAdmin;

        this.isLoading = false;
      }
    }, error => {
      // TODO
      console.log(error);
      this.isLoading = false;
    });
  }

  public update(updateForm: NgForm) {
    this.isLoading = true;
    const values = updateForm.value;

    // Check password fields were submitted & equal, otherwise update will fail
    if (values.inputNewPassword === values.inputConfirmPassword) {
      this.user.password = values.inputNewPassword;
      console.log('fired. latest local user obj: ');
      console.log(this.user);

      this._userService.update(this.user).subscribe(data => {
          // update successful; navigate to user's profile
          this.isLoading = false;
          this._router.navigate(['/user/' + String(this._userId)]);
      }, err => {
        // TODO
        console.log(err);
        this.isLoading = false;
      });
    }
  }

}
