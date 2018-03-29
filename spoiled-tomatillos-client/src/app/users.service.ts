import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from './user';


@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public create(user: User) {
  	const endpoint = '/api/register';
  	return this.http.post(endpoint, user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
     });
  }

  public update(user: User) {
    const endpoint = '/api/users/settings';
    return this.http.put(endpoint, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true
    });
  }

  public getUserInfo(): Observable<User>  {
    const endpoint = '/api/users/settings';
    return this.http.get<Response>(endpoint, {
      withCredentials: true 
    }).map((resp) => {
      const body: any = resp;
      return body;
    });
  }

  public createAdmin(user: User) {
    const endpoint = '/api/user'
    return this.http.post(endpoint, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true
    });
  } 

  public follow(userId: string) {
    const endpoint = '/api/users/' + userId + '/follow';
    const following = {follow: true};
    return this.http.post(endpoint, following, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true 
   });
  }

  public unfollow(userId: string) {
    const endpoint = '/api/users/' + userId + '/follow';
    const following = {follow: false};
    return this.http.post(endpoint, following, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true 
   });
  }

}
