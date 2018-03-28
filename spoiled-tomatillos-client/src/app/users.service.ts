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
  	return this.http.post('/users/create', user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
     });
  }

  public update(user: User) {
    return this.http.put('/users/me', user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true
    });
  }

  public getUserInfo(): Observable<User>  {
    return this.http.get<Response>('/users/me', {
      withCredentials: true
    }).map((resp) => {
      const body: any = resp;
      return body;
    });
  }

  public follow(userId: string) {
    const endpoint = this.serverBaseUri + userId + '/follow';
    const following = {follow: true};
    return this.http.post(endpoint, following, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

  public unfollow(userId: string) {
    const endpoint = this.serverBaseUri + userId + '/follow';
    const following = {follow: false};
    return this.http.post(endpoint, following, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

}
