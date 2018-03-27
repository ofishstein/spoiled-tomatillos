import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MovieService {

  private serverBaseUri: string;

  constructor(private http: HttpClient) {
    this.serverBaseUri = 'http://ec2-18-216-146-141.us-east-2.compute.amazonaws.com:3000';
  }

  /*
  // return all movies that match given keyword in specified fields
  public searchByKeyword(keyword: string) {
    return this.http.get(this.serverBaseUri + '/movie/?keyword=' + keyword);
  }

  // return all movies with given title
  public searchByTitle(title: string) {
    return this.http.get(this.serverBaseUri + '/movie/?title=' + title);
  }
  */

  // retrieve movie by its id
  public getMovie(movieId: string) {
    console.log('BOOGa BOOGA');
    return this.http.get(this.serverBaseUri + '/movies/' + movieId);
  }

  // add to watchlist
  public addToWatchList(movieId: string) {
    return this.http.post(this.serverBaseUri + '/movies/', movieId,  {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

  // remove from watchlist
  public removeFromWatchList(movieId: string) {
    return this.http.post(this.serverBaseUri + '/movies/', movieId,  {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });

  }

}
