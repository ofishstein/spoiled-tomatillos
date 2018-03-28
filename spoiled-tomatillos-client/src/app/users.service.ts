import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from './user';


@Injectable()
export class UsersService {

  private serverBaseUri: string;

  constructor(private http: HttpClient) {
  	this.serverBaseUri = 'http://ec2-18-216-146-141.us-east-2.compute.amazonaws.com:3000/users';
  }

  public create(user: User) {
  	const endpoint = '/api/register';
  	return this.http.post(endpoint, user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text' 
     });
  }

  public update(user: User) {
    const endpoint = '/api/me';
    return this.http.put(endpoint, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true 
    });
  }

  public getUserInfo(): Observable<User>  {
    const endpoint = '/api/me';
    return this.http.get<Response>(endpoint, {
      withCredentials: true 
    }).map((resp) => {
      const body: any = resp;
      return body;
    });
  }

  public createAdmin(user: User) {
    const endpoint = '/api/users'
    return this.http.post(endpoint, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true 
   });
  }

}
