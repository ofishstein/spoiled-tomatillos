import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  public currentUser: EventEmitter<any>;

  constructor(private http: HttpClient) {
    this.currentUser = new EventEmitter();
  }

  userLogin(username: string, password: string) {
    let body = {username: username, password: password};
    console.log(body);
    return this.http.post('/login',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text',
        withCredentials: true
      });
  }

  logout() {
    // this.currentUser.emit(false);
    //return this.http.post('/logout');
  }

  /**
   * returns the current user if logged in; otherwise 'false'
   */
  isLoggedIn(): Promise<any> {
    return new Promise(resolve => {
      let res;
      this.http.get('/users/isLoggedIn', {withCredentials: true})
        .subscribe(user => {
          if (user === 'false') {
            this.currentUser.emit(false);
            res = false;
          } else {
            this.currentUser.emit(user);
            res = user;
          }
      },
        err => { console.log('isLoggedIn err: ' + err); });

      resolve(res);
    });
  }

}
