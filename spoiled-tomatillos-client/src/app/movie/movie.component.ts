import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie/movie.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movie;
  private reviews: any;
  public inWatchList: boolean;
  private isLoggedIn: boolean; 

  constructor(private _movieService: MovieService, private route: ActivatedRoute, private _authService: AuthService) {
      this.inWatchList = false;
      this.isLoggedIn = false;
  }

  ngOnInit() {
    this._movieService.getMovie(this.route.snapshot.params.id).subscribe(
      data => {
        console.log(data);
        this.movie = data;
        this.reviews = this.movie.reviews;
        this.inWatchList = this.movie.inWatchlist; },
      err => console.error(err)
    );

    this._authService.getCurrentUser().then(currentUser => {
        if (!currentUser) {
          this.isLoggedIn = false;
        } else { // user must be logged in
          this.isLoggedIn = true;
        }
        console.log("isLoggedIn: " + this.isLoggedIn);
      }, err => console.log(err)
    );
  }

  addToWatchlist() {
    console.log("adding to watchlist");
    this._movieService.addToWatchList(this.route.snapshot.params.id).subscribe(
      data => {
        this.inWatchList = true;
      },
      err => console.error(err)
    );
  }

  removeFromWatchlist() {
    console.log("removing from watchlist");
    this._movieService.removeFromWatchList(this.route.snapshot.params.id).subscribe(
      data => {
        this.inWatchList = false;
      },
      err => console.error(err)
    );
  }



}
