import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie/movie.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private movieSubject: Subject<any>;
  private movieObservable: Observable<any>;
  private reviewsObservable: Observable<any>;
  private inWatchlistObservable: Observable<boolean>;
  private movie: any;
  private isLoggedInObservable: Observable<boolean>;
  private isProcessingReview: boolean;
  private _movieId: number;

  constructor(private _movieService: MovieService, private _route: ActivatedRoute, private _authService: AuthService) {

    const requestedId = this._route.snapshot.params.id;

    try {
      if (requestedId && parseInt(requestedId, 10) >= 0) {
        this._movieId = parseInt(requestedId, 10);
      } else {
        this._movieId = null;
      }
    } catch (e) {
      this._movieId = null;
    }

    this.isProcessingReview = false;
      
  }

  ngOnInit() {
    this.movieSubject = new Subject<any>();
    this.movieObservable = this.movieSubject.asObservable();
    this.movieObservable.subscribe((movie) => {this.movie = movie;});
    if (this._movieId) {
      this._movieService.getMovie(this._movieId.toString()).subscribe(movie => this.movieSubject.next(movie));
    }
    this.reviewsObservable = this.movieObservable.map((movie) => movie.reviews);
    this.inWatchlistObservable = this.movieObservable.map((movie) => movie.inWatchlist);
    this.isLoggedInObservable = this._authService.isLoggedIn();
  }

  public submitReview(reviewForm: NgForm, event): void {
    const formValues = reviewForm.value;

    if (formValues && formValues.review && formValues.rating) {
      this.isProcessingReview = true;

      this._movieService.createMovieReview(this._movieId, formValues.rating, formValues.review).subscribe((result) => {
        this.isProcessingReview = false;
        reviewForm.setValue({'rating': '', 'review': ''}); // reset values of the input controls

        if (result) { // review successfully POSTed
          setTimeout(() => {
            $('#addReview').modal('hide');
            this._movieService.getMovie(this._movieId.toString()).subscribe(movie => this.movieSubject.next(movie));
          }, 300);
        }
      });
    }
  }

  addToWatchlist() {
    this._movieService.addToWatchList(this._movieId.toString()).subscribe(
      data => {
        this.movieSubject.next({...this.movie, inWatchlist: true});
      },
      err => console.error(err)
    );
  }

  removeFromWatchlist() {
    this._movieService.removeFromWatchList(this._movieId.toString()).subscribe(
      data => {
        this.movieSubject.next({...this.movie, inWatchlist: false});
      },
      err => console.error(err)
    );
  }



}
