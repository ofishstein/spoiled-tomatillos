import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private missingRequired: boolean;
  private comboNotFound: boolean;

  constructor(private _authService: AuthService, private router: Router) {
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
      this._authService.userLogin(form.value.username, form.value.password, false).subscribe(
        success => {
          console.log('Success!');
          this.router.navigateByUrl('/home')
            .then(() => {});
        },
        error => {
          console.log(error);
          this.comboNotFound = true;
        }
      );
    }
  }

}
