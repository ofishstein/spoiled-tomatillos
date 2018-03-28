import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {}

  /*
  // return all movies that match given keyword in specified fields
  public searchByKeyword(keyword: string) {
    return this.http.get('/movie/?keyword=' + keyword);
  }

  // return all movies with given title
  public searchByTitle(title: string) {
    return this.http.get('/movie/?title=' + title);
  }
  */

  // retrieve movie by its id
  public getMovie(movieId: string) {
    return this.http.get('/movies/' + movieId);
  }

}
