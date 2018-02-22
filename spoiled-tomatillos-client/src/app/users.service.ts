import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';


@Injectable()
export class UsersService {

  private serverBaseUri: string;

  constructor(private http: HttpClient) {
  	this.serverBaseUri = 'http://ec2-18-216-146-141.us-east-2.compute.amazonaws.com:3000/users';
  }

  public create(user: User) {
  	const endpoint = this.serverBaseUri +'/create';
  	return this.http.post(endpoint, JSON.stringify(user));
  }

}
