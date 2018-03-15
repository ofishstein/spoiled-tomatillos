import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
  	username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    isAdmin: false
  };

  loading = false;

  constructor(private router: Router, private userService: UsersService) {
  	
  }

  ngOnInit() {
  }

  register() {
  	this.loading = true;
    this.userService.create(this.user)
        .subscribe(
            data => {
                // redirect to the login page
                this.router.navigate(['/login']);
            },
            error => {
            	//todo
              console.log(error);
            	this.loading = false;
            });
    }


}
