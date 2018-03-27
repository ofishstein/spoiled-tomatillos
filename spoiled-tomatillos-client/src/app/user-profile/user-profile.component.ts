import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private uid: number;
  private user: any;
  private isFollowing: boolean;
  @ViewChild('reviewsList')
  private reviewsListTemplate: TemplateRef<any>;

  constructor(private route: ActivatedRoute, private _usersService: UsersService) {
    this.uid = parseInt(this.route.snapshot.params.uid);
  }

  ngOnInit() {
    this.user = {
      userId: 789, username: 'john_doe', firstName: 'John', lastName: 'Doe',
      bio: 'I like movies blah blah blah.',
      profileImage: {url: 'http://lorempixel.com/400/400/', width: 400, height: 400},
      followers: [{userId: 1235, username: "bob_tomato", profileImage: {
          url: "../../assets/profile_image_placeholder.png", width: 167, height: 167
        }},
        {userId: 1236, username: "user9873", profileImage: {
          url: "../../assets/profile_image_placeholder.png", width: 167, height: 167
        }}
      ],
      following: [{userId: 124, username: "bob_lob_law", profileImage: {
        url: "../../assets/profile_image_placeholder.png", width: 167, height: 167
        }},
        {userId: 125, username: "fred124", profileImage: {
          url: "http://lorempixel.com/400/400/", width: 400, height: 400
        }},
        {userId: 126, username: "jane", profileImage: {
          url: "http://lorempixel.com/300/400/", width: 300, height: 400
        }},
        {userId: 127, username: "ann_23sdf", profileImage: {
          url: "../../assets/profile_image_placeholder.png", width: 167, height: 167
        }},
        {userId: 128, username: "shreksy_lexy", profileImage: {
          url: "http://lorempixel.com/750/500/", width: 750, height: 500
        }}
      ],
      playlist: [
        {id: 1, Title: 'Shrek', Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'},
        {id: 2, Title: 'Requiem for a Dream', Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'},
        {id: 3, Title: 'Superstar', Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BN2Q2YjFlMzYtYjVlMC00MmZmLTg5MzQtZjUyYmY2N2U5MjIxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'},
        {id: 4, Title: 'Goon', Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxOTQwMTQ3MF5BMl5BanBnXkFtZTcwMDcyOTQwNw@@._V1_SX300.jpg'},
        {id: 5, Title: 'Ex Machina', Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg'},
      ],
      reviews: [
        {id: 1, title: 'Review Title', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id. Maecenas rutrum, mauris et fermentum consectetur, purus lectus tincidunt est, non faucibus dui diam sed mauris. Integer nec urna justo. Suspendisse feugiat turpis ac nisl mollis convallis. Duis nec mi molestie, tempus ipsum nec, dapibus ipsum. Proin vulputate elementum mauris, non maximus nulla ornare a. In porttitor justo libero, eget eleifend libero eleifend tempor. Aenean et dapibus elit.',
          rating: '10', user: {
          userId: 123, username: 'john_doe', profileImageUrl: 'http://lorempixel.com/400/400/'
        }},
        {id: 1, title: 'Cool Movie', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id. Maecenas rutrum, mauris et fermentum consectetur, purus lectus tincidunt est, non faucibus dui diam sed mauris. Integer nec urna justo. Suspendisse feugiat turpis ac nisl mollis convallis. Duis nec mi molestie, tempus ipsum nec, dapibus ipsum. Proin vulputate elementum mauris, non maximus nulla ornare a. In porttitor justo libero, eget eleifend libero eleifend tempor. Aenean et dapibus elit.',
          rating: '7', user: {
          userId: 123, username: 'john_doe', profileImageUrl: 'http://lorempixel.com/400/400/'
        }},
        {id: 1, title: 'It brought tears to my eyes.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin urna sem, porta mattis ipsum dignissim id.',
          rating: '8', user: {
          userId: 123, username: 'john_doe', profileImageUrl: 'http://lorempixel.com/400/400/'
        }}]
    };

    this.isFollowing = false;
  }

  follow() {
    this.isFollowing = true;
    this._usersService.follow(String(this.uid)).subscribe(
      data => {
        console.log(data);
        this.isFollowing = true },
      err => console.error(err)
    );
  }

  unfollow() {
    this.isFollowing = false;
    this._usersService.unfollow(String(this.uid)).subscribe(
      data => {
        console.log(data);
        this.isFollowing = false},
      err => console.error(err)
    );
  }

}
