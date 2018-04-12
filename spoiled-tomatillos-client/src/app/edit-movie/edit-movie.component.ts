import { Component, OnInit } from '@angular/core';
import { AdminMovie } from '../admin-movie';
import { MovieService } from '../services/movie/movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  public isLoading: boolean;
  private movieData;

  movie: AdminMovie = {
    poster: null,
    title: null,
    tmdbId: null,
    imdbId: null
  };

  constructor(private _movieService: MovieService, private _router: Router, private _route: ActivatedRoute) {
    this.isLoading = false;
  }

  ngOnInit() {
    this._movieService.getMovie(this._route.snapshot.params.id).subscribe(
      data => {
        console.log(data);
        this.movieData = data;
        this.movie.poster = this.movieData.poster;
        this.movie.title = this.movieData.title;
        this.movie.tmdbId = this.movieData.tmdbId;
        this.movie.imdbId = this.movieData.imdbId;
       },
      err => console.error(err)
    );
  }

  editMovie() {
    this.isLoading = true;
    this._movieService.editMovie(this.movie, this._route.snapshot.params.id).subscribe(
      data => {
        this._router.navigate(['/admin/home']);
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

}
