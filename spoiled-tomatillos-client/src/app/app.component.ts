import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './services/search.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string;
  private currentUser: any;

  constructor(private _searchService: SearchService, private _router: Router,
              private _authService: AuthService) {
    this.title = 'Spoiled Tomatillos';
    _authService.currentUser.subscribe(isLoggedIn => {
      this.currentUser = isLoggedIn;
    });
  }

  ngOnInit() {

    // Navigates the user to the SearchComponent upon a successful search.
    this._searchService.searchChange.subscribe((searchSuccessful) => {
      if (searchSuccessful) {
        this._router.navigate(['/search']);
      }
    });
  }

  /**
   * Calls upon the univseral search service to perform a keyword search.
   *
   * @param searchForm the form HTML element used to conduct the search.
   * @param event Event representing the form submit.
   */
  public performSearch(searchForm: NgForm, event: Event): void {
    event.preventDefault();
    const searchText: string = searchForm.value.search;
    searchForm.resetForm();

    this._searchService.searchByKeyword(searchText);
  }

  public logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
