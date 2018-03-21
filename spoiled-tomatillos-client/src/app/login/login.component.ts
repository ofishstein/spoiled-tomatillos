import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private missingRequired: boolean;
  private comboNotFound: boolean;
  private currentUser: any;

  constructor(private _authService: AuthService, private router: Router) {
    _authService.currentUser.subscribe(isLoggedIn => {
      this.currentUser = isLoggedIn;
    });
  }

  ngOnInit() {
  }

  userLogin(form) {
    if (form.value.username == '' || form.value.password == '') {
      this.comboNotFound = false;
      this.missingRequired = true;
      return;
    }
    else {
      this.missingRequired = false;
      this._authService.userLogin(form.value.username, form.value.password).subscribe(
        success => { this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.comboNotFound = false;
        }
      );
    }

    // update currentUser
    this._authService.isLoggedIn();
  }

}
