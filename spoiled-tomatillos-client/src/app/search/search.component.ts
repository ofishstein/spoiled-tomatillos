import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private _omdbBasePath: string;
  private _apiKey: string;
  public results;

  constructor(private http: HttpClient) {
    this._apiKey = '4a249f8d';
    this._omdbBasePath = 'http://www.omdbapi.com/?apikey=' + this._apiKey;
  }

  ngOnInit() {
  }

  public searchByKeyword(searchForm: NgForm, event: Event): void {
    event.preventDefault();
    const searchText: string = searchForm.value.search;
    searchForm.resetForm();

    this.http.get(this._omdbBasePath + '&s=' + searchText).subscribe((res: any) => {
      this.results = res.Search;
    });
  }

}
