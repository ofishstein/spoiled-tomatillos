import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HelloService {

  private serverBaseUri: string;

  constructor(private http: HttpClient) {
    this.serverBaseUri = 'http://cs4500-spring2018-baxley.us-east-2.elasticbeanstalk.com/api';
  }

  /**
   * getHelloString : Observable<string>
   * Retrieves the response from the app server at api/hello/string
   */
  public getHelloString(): Observable<object> {
    console.log('here');
    const endpoint = this.serverBaseUri + '/hello/string';
    return this.http.get(endpoint);
    /*return this.http.get(endpoint)
    .map((res: Response) => {
       return res.text().then((txt) => {
         return txt;
       });
    });
    // return this.http.get(endpoint, {responseType: 'text'});
    /*.map((resp) => {
      console.log('respp:');
      console.log(resp);
      return resp;
    });
    /*return this.http.get<Response>(endpoint).map((resp) => {
      const body: any = resp;
      console.log('resp:');
      console.log(body);

      return body;
    });*/
  }

  /**
   * getHelloObject : Observable<object>
   * Retrieves the response from the app server at api/hello/object
   */
  public getHelloObject(): Observable<object> {
    const endpoint = this.serverBaseUri + '/hello/object';
    return this.http.get<Response>(endpoint).map((resp) => {
      const body: any = resp;

      return body;
    });
  }

  /**
   * getAllHellos : Observable<List<object>>
   * Retrieves the response from the app server at api/hello/select/all
   */
  public getAllHellos(): Observable<string> {
    const endpoint = this.serverBaseUri + '/hello/select/all';
    return this.http.get<Response>(endpoint).map((resp) => {
      const body: any = resp;

      return JSON.stringify(resp);
    });
  }

  /**
   * insertHello : Observable<object>
   * Retrieves the response from the app server at api/hello/insert
   */
  public insertHello(): Observable<string> {
    const endpoint = this.serverBaseUri + '/hello/insert';
    return this.http.get<Response>(endpoint).map((resp) => {
      return JSON.stringify(resp);
    });
  }

  /**
   * insertCustomHello : Observable<string>
   * Retrieves the response from the app server at api/hello/insert/{msg}
   */
  public insertCustomHello(aMessage: string): Observable<string> {
    const endpoint = this.serverBaseUri + '/hello/insert/' + aMessage;
    return this.http.get<Response>(endpoint).map((resp) => {
      return JSON.stringify(resp);
    });
  }



}
