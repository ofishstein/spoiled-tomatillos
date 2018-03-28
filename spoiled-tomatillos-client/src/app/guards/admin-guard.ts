import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService) { }

  canActivate() {
    return this._authService.isAdmin();
  }
}
