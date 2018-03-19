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
    firstName: null,
    lastName: null,
    isAdmin: true
  };

  loading = false;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
  }

  register() {
  	this.loading = true;
    this.userService.create(this.user)
        .subscribe(
            data => {
                // redirect to the login page
                this.router.navigate(['/admin/login']);
            },
            error => {
            	//todo
              console.log(error);
            	this.loading = false;
            });
  }

}
