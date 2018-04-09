import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RecommendService {

  constructor(private _http: HttpClient) { }

  public getAllRecommendations() {
    const endpoint = '/api/recommendations';
    return this._http.get(endpoint, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true
    });
  }

}
