import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public results;

  constructor(private http: HttpClient, private _searchService: SearchService) {
  }

  ngOnInit() {
    this._searchService.searchChange.subscribe((successful) => {
      if (successful) {
        this.results = this._searchService.getResults().movieResults;
      }
    });
  }

}
