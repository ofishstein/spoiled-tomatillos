import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {

  private _omdbBasePath: string;
  private _apiKey: string;
  public results;
  loading = false;

  constructor(private http: HttpClient, private _searchService: SearchService) {
  }

  ngOnInit() {
    this._searchService.searchChange.subscribe((successful) => {
      if (successful) {
        const searchResults = this._searchService.getResults();
        this.results = searchResults.movieResults;
        this.loading = false;
      }
    });
  }

  public searchByKeyword(searchForm: NgForm, event: Event): void {
    event.preventDefault();
    const searchText: string = searchForm.value.search;
    searchForm.resetForm();
    this.loading = true;
    this._searchService.searchByKeyword(searchText);
  }
}
