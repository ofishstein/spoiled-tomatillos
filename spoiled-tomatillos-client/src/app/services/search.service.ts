import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  @Output() searchChange = new EventEmitter<boolean>();

  private _omdbBasePath: string;
  private _userSearchBasePath: string;
  private _apiKey: string;
  private results: { movieResults: Array<any>, userResults: Array<any> };

  constructor(private http: HttpClient) {
    this._apiKey = '4a249f8d';
    this._omdbBasePath = 'http://www.omdbapi.com/?apikey=' + this._apiKey;
    this._userSearchBasePath = '/search/users';
    this.results = { movieResults: [], userResults: [] };

  }

  /**
   * Performs a keywords search across our movies and users apis, and emits a boolean
   * upon successful response of both requests. The results are stored via a readonly
   * method getResults().
   *
   * @param keyword The keyword(s) string with which to search.
   */
  public searchByKeyword(keyword: string): void {
    let successful = false;

    this.http.get(this._omdbBasePath + '&s=' + keyword).toPromise().then((res: any) => {
      this.results.movieResults = res.Search;

      return this.http.get(this._userSearchBasePath + '?firstName=' + keyword).toPromise();
    })
    .then((res: any) => {
      this.results.userResults = res;
      // if the data looks good, send it
      if (this.results.userResults && this.results.movieResults) {
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
      console.log('search requests failed:');
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
