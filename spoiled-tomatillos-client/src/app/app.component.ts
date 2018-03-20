import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string;
  private currentUser: any;

  constructor(private _searchService: SearchService, private _router: Router,
              private route: ActivatedRoute,
              private _loginService: LoginService) {
    this.title = 'Spoiled Tomatillos';
  }

  ngOnInit() {
    // this works, but displays errors in console because html loads first and currentUser undefined, but then
    //    it's updated, so it displays the right navbar stuff...
    this._loginService.isLoggedIn().subscribe(currentUser => {
      this.currentUser = currentUser;
      console.log(currentUser);
      // TODO: update currentUser on login/logout
    });

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
}
