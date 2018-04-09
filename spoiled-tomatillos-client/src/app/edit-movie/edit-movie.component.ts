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

  loading = false;
  private movieData;

  movie: AdminMovie = {
    poster: null,
    title: null,
    tmdbId: null,
    imdbId: null
  };

  constructor(private _router: Router, private _movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._movieService.getMovie(this.route.snapshot.params.id).subscribe(
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
    this.loading = true;
    this._movieService.editMovie(this.movie, this.route.snapshot.params.id).subscribe(
      data => {
        this._router.navigate(['/admin/home']);
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

}
