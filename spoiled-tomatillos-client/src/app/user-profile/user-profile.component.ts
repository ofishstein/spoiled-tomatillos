import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../Profile';
import { Watchlist } from '../Watchlist';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private uid: number; // requested user inferred from route
  private userProfile: Profile;
  private user: any; // actual user object
  private isFollowingProfileViewer: boolean; // whether profile in question is following the viewer
  @ViewChild('reviewsList')
  private reviewsListTemplate: TemplateRef<any>;

  constructor(private _route: ActivatedRoute, private _http: HttpClient, private _profileService: ProfileService) {
    const profileId = this._route.snapshot.params.uid;

    if (profileId && parseInt(profileId, 10)) {
      this.uid = parseInt(profileId, 10);
    } else {
      this.uid = null;
    }

    this.isFollowingProfileViewer = false;
    this.userProfile = null;
  }

  ngOnInit() {
    this.user = {
      userId: 789, username: 'john_doe', firstName: 'John', lastName: 'Doe',
      bio: 'I like movies blah blah blah.',
      profileImageUrl: 'http://lorempixel.com/400/400/',
      followers: [{userId: 1235, username: 'bob_tomato',
          profileImageUrl: '../../assets/profile_image_placeholder.png',
        },
        {userId: 1236, username: 'user9873',
          profileImageUrl: '../../assets/profile_image_placeholder.png',
        }
      ],
      following: [{id: 124, username: 'bob_lob_law',
        profileImageUrl: '../../assets/profile_image_placeholder.png'
        },
        {id: 125, username: 'fred124',
          profileImageUrl: 'http://lorempixel.com/400/400/'
        },
        {id: 126, username: 'jane',
          profileImageUrl: 'http://lorempixel.com/400/400/'
        },
        {id: 127, username: 'ann_23sdf',
          profileImageUrl: '../../assets/profile_image_placeholder.png',
        },
        {id: 128, username: 'shreksy_lexy',
          profileImageUrl: 'http://lorempixel.com/400/400/'
        }
      ],
      playlist: [
        {movieId: 1, Title: 'Shrek', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'},
        {movieId: 2, Title: 'Requiem for a Dream', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'},
        {movieId: 3, Title: 'Superstar', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BN2Q2YjFlMzYtYjVlMC00MmZmLTg5MzQtZjUyYmY2N2U5MjIxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'},
        {movieId: 4, Title: 'Goon', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxOTQwMTQ3MF5BMl5BanBnXkFtZTcwMDcyOTQwNw@@._V1_SX300.jpg'},
        {movieId: 5, Title: 'Ex Machina', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg'},
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
        }}],
      activity: [
        {type: 'review', movieId: 1, img: 'http://lorempixel.com/100/100', timestamp: '2018-03-28T21:02:09.252Z', title: 'How To Lose a Guy in 10 Days'},
        {type: 'review', movieId: 1, img: 'http://lorempixel.com/100/100', timestamp: '2018-03-29T21:02:09.252Z', title: 'Black Panther'},
        {type: 'review', movieId: 1, img: 'http://lorempixel.com/100/100', timestamp: '2018-02-22T21:02:09.252Z', title: 'Dodgeball'},
        ]
    };

    if (this.uid) {
      /*// hardcode it for now (api is broken)
      this.userProfile = new Profile(this.user.id, this.user.bio, this.user.email, this.user.username,
        this.user.profileImage.url, this.user.firstName, this.user.lastName, this.user.isAdmin, this.user.reviews,
        this.user.followers, this.user.following, this.user.activity,
        new Watchlist(null, null, null, null, this.user.playlist), this.user.createDate, this.user.lastUpdated);*/
      this._profileService.getProfileById(this.uid).subscribe((aProfile: Profile) => {
        this.parseUserProfile(aProfile);
      }, err => { console.log(err); });
    }

    // TODO: After populating the profile, make sure to cover the use case's requirement of giving the viewer the
    // option to "follow" the profile and "prod/suggest" a movie to the profile if the viewer is signed in.
  }

  private parseUserProfile(aProfile: Profile): void {
    // if the request completely failed, populate UI with ALL the fake data
    if (!aProfile || aProfile == null) {
      this.userProfile = new Profile(this.user.id, this.user.bio, this.user.email, this.user.username,
        this.user.profileImage.url, this.user.firstName, this.user.lastName, this.user.isAdmin, this.user.reviews,
        this.user.followers, this.user.following, this.user.activity,
        new Watchlist(null, null, null, null, this.user.playlist), this.user.createDate, this.user.lastUpdated);
      return;
    }

    // otherwise, the request succeeded, populate the problem-areas with fake data if no real data exists
    if (!aProfile.getFollowers() || aProfile.getFollowers().length === 0) {
      console.log('no followers detected; using mock followers');
      aProfile.setFollowers(this.user.followers);
      console.log(aProfile.getFollowers());
    }

    if (!aProfile.getFollowing() || aProfile.getFollowing().length === 0) {
      console.log('no following detected; using mock following');
      aProfile.setFollowing(this.user.following);
      console.log(aProfile.getFollowing());
    }

    if (!aProfile.getReviews() || aProfile.getReviews().length === 0) {
      console.log('no reviews detected; using mock reviews');
      aProfile.setReviews(this.user.reviews);
      console.log(aProfile.getReviews());
    }

    if (!aProfile.getWatchlist() || aProfile.getWatchlist().getMovies().length <= 1) {
      console.log('no watchlist detected; using mock watchlist');
      const mockedWatchlist = new Watchlist(null, null, null, null, this.user.playlist);
      aProfile.setWatchlist(mockedWatchlist);
    }

    if (!aProfile.getRecentActivity() || aProfile.getRecentActivity().length === 0) {
      console.log('no activity detected; using mock activity');
      aProfile.setRecentActivity(this.user.activity);
    }

    this.userProfile = aProfile;
  }

  /**
   * If the given timestamp is < 7 days from today, returns an hour/day comparison against today.
   * Otherwise returns a formatted date string of the given timestamp.
   * @param timestamp represents the string timestamp to be displayed
   */
  public getActivityDisplayDate(timestamp: string): string {
    const parsedDate = Date.parse(timestamp);
    // console.log(parsedDate);
    const asDate = new Date(parsedDate);
    // console.log(asDate);
    const timeDiff = Math.abs(new Date(Date.now()).getTime() - asDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 1) {
      return String( Math.ceil(timeDiff / (1000 * 3600)) ) + 'h ago';
    } else if (diffDays < 7) {
     return String(diffDays) + 'd ago';
    } else {
      return asDate.toDateString();
    }
  }

  public getActionFromActivityType(activityType: string): string {
    if (activityType === 'review') {
      return 'reviewed';
    }

    return 'noaction';
  }

}
