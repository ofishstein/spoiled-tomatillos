import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  user: User = {
  	username: null,
    email: null,
    password: null,
    first: null,
    last: null,
    isAdmin: true
  };

  loading = false;
  fail = false;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
  }

  register() {
  	this.loading = true;
  	this.fail = false;
    this.userService.create(this.user)
        .subscribe(
            data => {
                // redirect to the login page
                this.router.navigate(['/admin/login']);
            },
            error => {
            	//todo
            	this.loading = false;
            	this.fail = true;
            });
  }

}
