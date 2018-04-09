import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie/movie.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../services/auth.service';

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

  constructor(private _movieService: MovieService, private route: ActivatedRoute, private _authService: AuthService) {
      
  }

  ngOnInit() {
    this.movieSubject = new Subject<any>();
    this.movieObservable = this.movieSubject.asObservable();
    this.movieObservable.subscribe((movie) => {this.movie = movie;});
    this._movieService.getMovie(this.route.snapshot.params.id).subscribe(movie => this.movieSubject.next(movie));
    this.reviewsObservable = this.movieObservable.map((movie) => movie.reviews);
    this.inWatchlistObservable = this.movieObservable.map((movie) => movie.inWatchlist);
    this.isLoggedInObservable = this._authService.isLoggedIn();
  }

  addToWatchlist() {
    this._movieService.addToWatchList(this.route.snapshot.params.id).subscribe(
      data => {
        this.movieSubject.next({...this.movie, inWatchlist: true});
      },
      err => console.error(err)
    );
  }

  removeFromWatchlist() {
    this._movieService.removeFromWatchList(this.route.snapshot.params.id).subscribe(
      data => {
        this.movieSubject.next({...this.movie, inWatchlist: false});
      },
      err => console.error(err)
    );
  }



}
