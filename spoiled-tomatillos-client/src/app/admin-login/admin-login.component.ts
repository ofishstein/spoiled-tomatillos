import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  private missingRequired: boolean;
  private invalidCredentials: boolean;

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  adminLogin(form) {
    if (form.value.username == '' || form.value.password == '') {
      this.invalidCredentials = false;
      this.missingRequired = true;
      return;
    }
    else {
      this.missingRequired = false;
      console.log({username: form.value.username, password: form.value.password});
      this._authService.userLogin(form.value.username, form.value.password, true).subscribe(
        success => {
          this.router.navigate(['/admin/home'])
            .then(() => {})
        },
        error => {
          console.log(error);
          this.invalidCredentials = true;
        }
      );
    }
  }

}
