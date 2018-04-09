import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient, private authService: AuthService) {}

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
    return this.http.get('/api/movies/' + movieId, {
      withCredentials: true
    });
  }

  // add to watchlist
  public addToWatchList(movieId: string) {
    return this.authService.getCurrentUser().map(user => {
       return this.http.post('/api/users/' + user.id + '/watchlist', {
         movieId: movieId
       }, {
         headers: new HttpHeaders().set('Content-Type', 'application/json'),
         responseType: 'text',
         withCredentials: true 
      });
    });
  }

  // TODO remove from watchlist
  public removeFromWatchList(movieId: string) {
    return this.authService.getCurrentUser().map(user => {
      return this.http.delete('/api/users/' + user.id + '/watchlist/' + movieId, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text',
        withCredentials: true 
     });
    });
  }
}
