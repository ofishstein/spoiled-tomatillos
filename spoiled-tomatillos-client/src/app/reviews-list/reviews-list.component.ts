import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit {

  // path params specify reviews for either movie or user
  private movieId: number;
  private reviews: any;

  constructor(private route: ActivatedRoute) {
    this.movieId = parseInt(this.route.snapshot.params.id);

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
  }
}
