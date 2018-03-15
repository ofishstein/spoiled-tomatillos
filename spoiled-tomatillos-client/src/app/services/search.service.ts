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
    this._userSearchBasePath = 'http://something.elasticbeanstalk.com/some/path=';
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

    // Add the movie search results as the first array in the return array
    this.http.get(this._omdbBasePath + '&s=' + keyword).toPromise().then((res: any) => {
      this.results.movieResults = res.Search;

      this.results.userResults = [];
      successful = true;
      this.searchChange.emit(successful);

      // Add the user search results as the second array in the return array
      // TODO: perform user search once endpoint is live
      // return this.http.get(this._userSearchBasePath + keyword).toPromise();
    })
    /*.then((res: any) => {
      compiledResults.push(res);
      // if the data looks good, send it
      if (compiledResults.length === 2) {
        this.searchChange.emit(compiledResults);
      }
    })*/
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
