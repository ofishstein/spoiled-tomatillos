import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private missingRequired: string;
  private comboNotFound: string;

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  userLogin(form) {
    if (form.username == '' || form.password == '') {
      this.missingRequired = true;
      return;
    }
    else {
      this._loginService.userLogin(form.value.username, form.value.password).subscribe(
        success => { router.navigate(['home'], {relativeTo: route});
        },
        error => {
          console.log(error);
          this.comboNotFound = 'Username and password combination not found';
        }
      );
    }
  }

}
