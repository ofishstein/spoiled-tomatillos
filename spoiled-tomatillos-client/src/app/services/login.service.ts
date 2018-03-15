import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
    this.baseUri = 'http://ec2-18-216-146-141.us-east-2.compute.amazonaws.com:3000';
  }

  userLogin(username: string, password: string) {
    let body = {username: username, password: password};
    console.log(body);
    return this.http.post(this.baseUri + '/login',
      body);
  }

  logout() {
    return this.http.post(this.baseUri + '/logout');
  }

  /**
   * returns the current user if logged in; otherwise 'false'
   */
  isLoggedIn() {
    return this.http.get(this.baseUri + '/users/isLoggedIn');
  }

}
