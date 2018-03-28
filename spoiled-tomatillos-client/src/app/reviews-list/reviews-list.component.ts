import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit {

  // path params specify reviews for either movie or user
  private movieId: number;
  public movie;
  private reviews: any;

  constructor(private route: ActivatedRoute, private _movieService: MovieService) {
    this.movieId = parseInt(this.route.snapshot.params.id);

    this.movie = {id: 1, title: 'Shrek', year: '2001', rated: 'PG', rating: 5,
      genre: 'Animation, Adventure, Comedy', runtime: '90 min',
      description: 'When a green ogre named Shrek discovers his swamp has been "swamped" with all sorts of fairytale creatures by the scheming Lord Farquaad, Shrek sets out with a very loud donkey by his side to "persuade" Farquaad to give Shrek his swamp back. Instead, a deal is made. Farquaad, who wants to become the King, sends Shrek to rescue Princess Fiona, who is awaiting her true love in a tower guarded by a fire-breathing dragon. But once they head back with Fiona, it starts to become apparent that not only does Shrek, an ugly ogre, begin to fall in love with the lovely princess, but Fiona is also hiding a huge secret.',
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    };

    this.reviews = [
      {id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id. Maecenas rutrum, mauris et fermentum consectetur, purus lectus tincidunt est, non faucibus dui diam sed mauris. Integer nec urna justo. Suspendisse feugiat turpis ac nisl mollis convallis. Duis nec mi molestie, tempus ipsum nec, dapibus ipsum. Proin vulputate elementum mauris, non maximus nulla ornare a. In porttitor justo libero, eget eleifend libero eleifend tempor. Aenean et dapibus elit.',
        rating: '5', user: {
        userId: 123, username: 'john_doe', profileImageUrl: 'http://lorempixel.com/400/400/'
      }},
      {id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id. Maecenas rutrum, mauris et fermentum consectetur, purus lectus tincidunt est, non faucibus dui diam sed mauris. Integer nec urna justo. Suspendisse feugiat turpis ac nisl mollis convallis. Duis nec mi molestie, tempus ipsum nec, dapibus ipsum. Proin vulputate elementum mauris, non maximus nulla ornare a. In porttitor justo libero, eget eleifend libero eleifend tempor. Aenean et dapibus elit.',
        rating: '4', user: {
        userId: 123, username: 'user2394', profileImageUrl: 'http://lorempixel.com/400/400/'
      }},
      {id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id.',
        rating: '2', user: {
        userId: 123, username: 'this_is_a_long_username', profileImageUrl: 'http://lorempixel.com/400/400/'
      }}];
  }

  ngOnInit() {
    this._movieService.getMovie(this.route.snapshot.params.id).subscribe(
      data => {
        console.log(data);
        this.movie = data[0]
        this.reviews = this.movie.Reviews },
      err => console.error(err)
    );
  }
}
