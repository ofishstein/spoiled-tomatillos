import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private movie: any;
  private reviews: any;

  @ViewChild('reviewsList')
  private reviewsListTemplate: TemplateRef<any>;

  constructor() {
    this.movie = {id: 1, title: 'Shrek', year: '2001', rated: 'PG', rating: 10,
      genre: 'Animation, Adventure, Comedy', runtime: '90 min',
      description: 'When a green ogre named Shrek discovers his swamp has been "swamped" with all sorts of fairytale creatures by the scheming Lord Farquaad, Shrek sets out with a very loud donkey by his side to "persuade" Farquaad to give Shrek his swamp back. Instead, a deal is made. Farquaad, who wants to become the King, sends Shrek to rescue Princess Fiona, who is awaiting her true love in a tower guarded by a fire-breathing dragon. But once they head back with Fiona, it starts to become apparent that not only does Shrek, an ugly ogre, begin to fall in love with the lovely princess, but Fiona is also hiding a huge secret.',
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    };

    this.reviews = [
      {id: 1, title: 'Review Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id. Maecenas rutrum, mauris et fermentum consectetur, purus lectus tincidunt est, non faucibus dui diam sed mauris. Integer nec urna justo. Suspendisse feugiat turpis ac nisl mollis convallis. Duis nec mi molestie, tempus ipsum nec, dapibus ipsum. Proin vulputate elementum mauris, non maximus nulla ornare a. In porttitor justo libero, eget eleifend libero eleifend tempor. Aenean et dapibus elit.',
        rating: '10', user: {
        userId: 123, username: 'john_doe', profileImageUrl: 'http://lorempixel.com/400/400/'
      }},
      {id: 1, title: 'Cool Movie', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id. Maecenas rutrum, mauris et fermentum consectetur, purus lectus tincidunt est, non faucibus dui diam sed mauris. Integer nec urna justo. Suspendisse feugiat turpis ac nisl mollis convallis. Duis nec mi molestie, tempus ipsum nec, dapibus ipsum. Proin vulputate elementum mauris, non maximus nulla ornare a. In porttitor justo libero, eget eleifend libero eleifend tempor. Aenean et dapibus elit.',
        rating: '7', user: {
        userId: 123, username: 'user2394', profileImageUrl: 'http://lorempixel.com/400/400/'
      }},
      {id: 1, title: 'It brought tears to my eyes.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id.',
        rating: '8', user: {
        userId: 123, username: 'this_is_a_long_username', profileImageUrl: 'http://lorempixel.com/400/400/'
      }}];
  }

  ngOnInit() {
    console.log(this.reviewsListTemplate)

  }

}
