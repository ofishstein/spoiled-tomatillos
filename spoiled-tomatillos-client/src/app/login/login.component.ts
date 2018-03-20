import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private missingRequired: boolean;
  private comboNotFound: boolean;

  constructor(private _loginService: LoginService, private router: Router) { }

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
      this._loginService.userLogin(form.value.username, form.value.password).subscribe(
        success => { this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.comboNotFound = false;
        }
      );
    }
  }

}
