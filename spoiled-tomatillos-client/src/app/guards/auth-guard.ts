import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) { }

  canActivate() {
  	console.log('Attempted to reach guarded path');
    return this._authService.isLoggedIn().map(u => {
    	if (u) return u;
    	console.log("User not logged in, rerouting to /login");
    	this.router.navigate(['/login']);
    	return false;
    });
  }
}
