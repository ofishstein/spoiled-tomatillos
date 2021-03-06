import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminMovie } from '../../admin-movie';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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
    return this.authService.getCurrentUser().switchMap(user => {
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
    return this.authService.getCurrentUser().switchMap(user => {
      return this.http.delete('/api/users/' + user.id + '/watchlist/' + movieId, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text',
        withCredentials: true
     });
    });
  }

  public addMovie(movieInfo: AdminMovie) {
    return this.http.post('/api/movies', movieInfo, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true 
    });
  }

  public editMovie(movieInfo: AdminMovie, movieId: string) {
    return this.http.put('/api/movies/' + movieId, movieInfo, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true 
    });
  }

  public deleteMovie(movieId: string) {
    return this.http.delete('/api/movies/' + movieId, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text',
      withCredentials: true 
    });
  }

  public createMovieReview(movieId: number, reviewRating: number, reviewText: string): Observable<any> {
    const createObject = { text: reviewText, rating: reviewRating, flagged: false };

    return this.http.post('/api/movies/' + String(movieId) + '/review', createObject,
     { headers: new HttpHeaders().set('Content-Type', 'application/json'), withCredentials: true, responseType: 'text' } ).pipe(
       map((res) => {
         console.log('received res from POST /api/movies/' + String(movieId) + '/review:');
         console.log(res);
         return of(true);
       })
       , catchError(err => { console.log(err); return of(null); })
     );
  }

  /**
   * Deletes the review of the given ID and returns a boolean indicating success.
   * @param reviewId the number representing the id of the review to delete
   */
  public deleteMovieReview(reviewId: number): Observable<boolean> {
    return this.http.delete('/api/reviews/' + String(reviewId), { withCredentials: true, responseType: 'text' }).pipe(
      map((res) => {
        console.log('received res from DELETE /api/reviews/' + String(reviewId));
        console.log(res);

        return true;
      }),
      catchError(err => { console.log(err); return of(false); })
    );
  }
}
