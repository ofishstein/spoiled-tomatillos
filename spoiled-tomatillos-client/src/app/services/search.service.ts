import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  @Output() searchChange = new EventEmitter<boolean>();

  private _apiBasePath: string;
  private _omdbBasePath: string; // Deprecated: searching is now exclusive to our own API
  private results: { movieResults: Array<any>, userResults: Array<any> };

  constructor(private http: HttpClient) {
    const _apiKey = '4a249f8d';
    this._omdbBasePath = 'http://www.omdbapi.com/?apikey=' + _apiKey;
    this._apiBasePath = '/api';
    this.results = { movieResults: [], userResults: [] };
  }

  /**
   * Performs a keywords search across our movies and users apis, and emits a boolean
   * upon successful response of both requests. The results are captured via a readonly
   * method getResults().
   *
   * @param keyword The keyword(s) string with which to search.
   */
  public searchByKeyword(keyword: string): void {
    let successful = false;

    this.http.get(this._apiBasePath + '/movies?title=' + keyword).toPromise().then((res: any) => {
      console.log('received resp from GET /movies?title=' + String(keyword));
      console.log(res);
      this.results.movieResults = res;

      return this.http.get(this._apiBasePath + '/users?firstName=' + keyword).toPromise();
    })
    .then((res: any) => {
      console.log('received resp from GET /users?firstName=' + String(keyword));
      console.log(res);
      this.results.userResults = res;

      /*return this.http.get(this._omdbBasePath + '&s=' + keyword).toPromise();
    })
    .then((res: any) => {
      console.log('received resp from GET omdbapi');
      console.log(res);*/

      // if the data looks good, send it
      if (this.results.movieResults || this.results.userResults) {
        successful = true;
        this.searchChange.emit(successful);
      } else {
        successful = false;
        this.searchChange.emit(successful);
      }
    })
    .catch((err) => {
      this.results.movieResults = [];
      this.results.userResults = [];
      successful = false;
      console.log('Search requests failed:');
      console.log(err);
      this.searchChange.emit(successful);
    });
  }

  /**
   * Returns the results of the latest movies/users api searches perfomed.
  */
  public getResults(): { movieResults: Array<any>, userResults: Array<any> } {
    return this.results;
  }

}
