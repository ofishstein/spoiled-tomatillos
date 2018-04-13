import { Component, OnInit } from '@angular/core';
import { AdminMovie } from '../admin-movie';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  public isLoading: boolean;
  public movie: AdminMovie = {
    poster: null,
    title: null,
    tmdbId: null,
    imdbId: null
  };

  constructor(private _router: Router, private _movieService: MovieService) {
    this.isLoading = false;
  }

  ngOnInit() {
  }

  addMovie() {
    this.isLoading = true;
    this._movieService.addMovie(this.movie).subscribe(
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
