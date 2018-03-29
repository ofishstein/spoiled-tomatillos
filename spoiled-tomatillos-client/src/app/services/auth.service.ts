import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isUndefined } from "util";

@Injectable()
export class AuthService {

  public currentUser: EventEmitter<any>;
  private currentUserObj: any;

  constructor(private http: HttpClient) {
    this.currentUser = new EventEmitter();
    this.currentUserObj = false;
  }

  userLogin(username: string, password: string, admin: boolean) {
    let body = {username: username, password: password, admin: admin};
    return this.http.post('/api/login',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text',
        withCredentials: true
      });
  }

  logout() {
    this.currentUser.emit(false);
    this.currentUserObj = false;
    return this.http.post('/api/logout', null);
  }

  /**
   * returns the current user if logged in; otherwise 'false'
   */
  getCurrentUser(): Promise<any> {
    return new Promise(resolve => {
      let res;
      this.http.get('/api/users/get-current-user', {withCredentials: true})
        .subscribe(aUser => {
          const user: any = aUser;
          if (user == null ||user.loggedIn === false) {
            this.currentUser.emit(false);
            this.currentUserObj = false;
            res = false;
          } else {
            this.currentUser.emit(user);
            this.currentUserObj = user;
            res = user;
          }
      },
        err => { console.log('getCurrentUser err: ' + err); });

      resolve(res);
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
    return this.currentUserObj.isAdmin === true;
  }

}
