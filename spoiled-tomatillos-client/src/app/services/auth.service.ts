import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isUndefined } from 'util';

@Injectable()
export class AuthService {

  public currentUser: EventEmitter<any>;
  private currentUserObj: any;

  constructor(private http: HttpClient) {
    this.currentUser = new EventEmitter();
    this.currentUserObj = false;
  }

  userLogin(username: string, password: string, admin: boolean) {
    const body = {username: username, password: password, admin: admin};
    return this.http.post('/api/login',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text',
        withCredentials: true
      });
  }

  logout() {
    this.currentUserObj = false;
    this.currentUser.emit(this.currentUserObj);
    return this.http.post('/api/logout', null);
  }

  /**
   * returns the current user if logged in; otherwise 'false'
   */
  getCurrentUser(): Promise<any> {
    return new Promise(resolve => {
      let res;
      this.http.get('/api/get-current-user', {withCredentials: true})
        .subscribe(aUser => {
          const user: any = aUser;

          if (user == null || user.loggedIn === false) {
            this.currentUserObj = false;
          } else {
            this.currentUserObj = user;
          }

          this.currentUser.emit(this.currentUserObj);
          res = this.currentUserObj;
          resolve(res);
      },
        err => { console.log('getCurrentUser err: ' + err); });
    });
  }

  /**
   * returns true if logged in; otherwise false
   */
  isLoggedIn(): boolean {
    return !isUndefined(this.currentUserObj.username);
  }


  /**
   * returns true if logged in and admin; otherwise false
   */
  isAdmin(): boolean {
    return this.currentUserObj && this.currentUserObj.isAdmin === true;
  }

}
