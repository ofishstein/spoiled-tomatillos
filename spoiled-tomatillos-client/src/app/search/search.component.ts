import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public movieResults;
  public userResults;
  public displayMovies: boolean;
  public buttonText: string;

  constructor(private http: HttpClient, private _searchService: SearchService) {
    this.displayMovies = true;
    this.buttonText = 'View Users';
  }

  ngOnInit() {
    this._searchService.searchChange.subscribe((successful) => {
      if (successful) {
        const searchResults = this._searchService.getResults();
        this.movieResults = searchResults.movieResults;
        this.userResults = searchResults.userResults;
      }
    });
  }

  /**
   * Switch view between the retrieved movie-results and the user results.
  */
  public toggleResults() {
    this.displayMovies = !this.displayMovies;

    if (this.displayMovies) {
      this.buttonText = 'View Users';
    } else {
      this.buttonText = 'View Movies';
    }
  }

}
