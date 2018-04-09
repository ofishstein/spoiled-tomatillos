import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  public currentUser: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUser = new BehaviorSubject(false);
  }

  userLogin(username: string, password: string, admin: boolean) {
    let body = {username: username, password: password, admin: admin};
    return this.http.post('/api/login',
      body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text',
        withCredentials: true
      }).map(resp => this.currentUser.next(JSON.parse(resp)));
  }

  logout() {
    this.currentUser.next(false);
    return this.http.post('/api/logout', null);
  }

  /**
   * returns the current user if logged in; otherwise 'false'
   */
  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  /**
   * returns true if logged in; otherwise false
   */
  isLoggedIn(): Observable<boolean> {
    return this.currentUser.asObservable().map(user => {console.log(!!user); return !!user;});
  }


  /**
   * returns true if logged in and admin; otherwise false
   */
  isAdmin(): Observable<boolean> {
    return this.currentUser.asObservable().map(user => user && user.isAdmin);
  }

}
