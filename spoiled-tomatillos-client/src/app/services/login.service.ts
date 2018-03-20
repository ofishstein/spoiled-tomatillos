import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {}

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
    //return this.http.post('/logout');
  }

  /**
   * returns the current user if logged in; otherwise 'false'
   */
  isLoggedIn() {
    return this.http.get('/users/isLoggedIn', {withCredentials: true});
  }

}
