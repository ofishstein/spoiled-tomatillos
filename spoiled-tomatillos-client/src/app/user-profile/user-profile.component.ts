import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../Profile';
import { Watchlist } from '../Watchlist';
import { UsersService } from '../users.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private uid: number; // requested user inferred from route
  private userProfile: Profile; // actual service-render user Profile
  private _mockUser: any; // fake user object for testing UI rendering
  private isProfileViewerFollowing: boolean; // whether profile viewer is following the user Profile to be rendered
  private isFollowingProfileViewer: boolean; // whether Profile to be rendered is following the viewer back
  private isProfileViewerLoggedIn: boolean; // whether Profile viewer is logged in
  private isViewingOwnProfile: boolean; // whether user is viewing their own Profile page
  @ViewChild('reviewsList')
  private reviewsListTemplate: TemplateRef<any>;

  constructor(private _route: ActivatedRoute, private _http: HttpClient,
    private _profileService: ProfileService, private _usersService: UsersService, private _authService: AuthService) {
      this._route.params.subscribe((params) => {
        const profileId = params.uid;

        if (profileId && parseInt(profileId, 10)) {
          this.uid = parseInt(profileId, 10);
        } else {
          this.uid = null;
        }

        this.isFollowingProfileViewer = false;
        this.isProfileViewerFollowing = false;
        this.isProfileViewerLoggedIn = false;
        this.isViewingOwnProfile = false;
        this.userProfile = null;

        this.ngOnInit();
      });
  }

  ngOnInit() {
    // instantiate the fake mock user with data we may or may not use for rendering purposes
    this._mockUser = {
      userId: 789, username: 'john_doe', firstName: 'John', lastName: 'Doe',
      bio: 'I like movies blah blah blah.',
      preferredService: 'netflix',
      profileImageUrl: 'http://lorempixel.com/400/400/',
      followers: [{followerId: 1235, followerUsername: 'bob_tomato',
          followerProfileImageUrl: '../../assets/profile_image_placeholder.png',
          FollowerUser: { id: 1235, username: 'bob_tomato', profileImageUrl: '../../assets/profile_image_placeholder.png' }
        },
        {followerId: 1236, followerUsername: 'user9873',
          followerProfileImageUrl: '../../assets/profile_image_placeholder.png',
          FollowerUser: { id: 1236, username: 'user9873', profileImageUrl: '../../assets/profile_image_placeholder.png' }
        }
      ],
      following: [{followeeId: 124, followeeUsername: 'bob_lob_law',
        followeeProfileImageUrl: '../../assets/profile_image_placeholder.png'
        },
        {followeeId: 125, followeeUsername: 'fred124',
          followeeProfileImageUrl: '../../assets/profile_image_placeholder.png'
        },
        {followeeId: 126, followeeUsername: 'jane',
          followeeProfileImageUrl: '../../assets/profile_image_placeholder.png'
        },
        {followeeId: 127, followeeUsername: 'ann_23sdf',
          followeeProfileImageUrl: '../../assets/profile_image_placeholder.png',
        },
        {followeeId: 128, followeeUsername: 'shreksy_lexy',
          followeeProfileImageUrl: 'http://lorempixel.com/200/200/'
        }
      ],
      watchlist: [
        { movieId: 1, Movie: { id: 1, title: 'Shrek', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00Yj'
           + 'A0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'}},
        { movieId: 2, Movie: { id: 2, title: 'Requiem for a Dream', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTdiNzJl'
           + 'OWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'}},
        { movieId: 3, Movie: { id: 3, title: 'Superstar', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BN2Q2YjFlMzYtYjVlMC'
           + '00MmZmLTg5MzQtZjUyYmY2N2U5MjIxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'}},
        { movieId: 4, Movie: { id: 4, title: 'Goon', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxOTQwMTQ3MF5BMl5BanB'
           + 'nXkFtZTcwMDcyOTQwNw@@._V1_SX300.jpg'}},
        { movieId: 5, Movie: { id: 5, title: 'Ex Machina', poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BM'
           + 'l5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg'}},
      ],
      reviews: [
        {
          id: 1, createdAt: '2018-03-30T17:12:15.993Z', updatedAt: '2018-03-30T17:12:15.993Z',
          text: 'Love this movie',
          rating: 4.5,
          flagged: false,
          movieId: 1,
          userId: 1,
          Movie: {
             title: 'Toy Story (1995)',
             id: 1
          },
          type: 'review'
        }, {
          id: 2, createdAt: '2018-03-30T17:12:15.993Z', updatedAt: '2018-03-30T17:12:15.993Z',
          text: 'Hate this movie',
          rating: 1,
          flagged: false,
          movieId: 2,
          userId: 1,
          Movie: {
             title: 'Jumanji (1995)',
             id: 2
          },
          type: 'review'
        }
      ],
      activities: [
        {
          id: 1, createdAt: '2018-03-30T17:12:15.993Z', updatedAt: '2018-03-30T17:12:15.993Z',
          text: 'Love this movie',
          rating: 4.5,
          flagged: false,
          movieId: 1,
          userId: 1,
          Movie: {
             title: 'Toy Story (1995)',
             id: 1
          },
          type: 'review'
        }, {
          id: 3, createdAt: '2018-03-30T17:12:15.993Z', updatedAt: '2018-03-30T17:12:15.993Z',
          text: 'Idk I need to make a comment on a review',
          reviewId: 4,
          commenterId: 1,
          type: 'ReviewComments'
        }, {
          id: 1, createdAt: '2018-03-30T17:12:15.993Z', updatedAt: '2018-03-30T17:12:15.993Z',
          text: 'This is a watchlist comment',
          commenterId: 1,
          ownerId: 2,
          type: 'WatchlistCommentsSent'
        }, {
          id: 1, createdAt: '2018-03-30T17:12:15.993Z', updatedAt: '2018-03-30T17:12:15.993Z',
          message: 'I heard you like kids movies',
          recommenderId: 2,
          recommendeeId: 1,
          type: 'RecommendationsReceived'
       }
      ]
    };

    if (this.uid) {
      /*// hardcode it for now (api is broken)
      this.userProfile = new Profile(this.user.id, this.user.bio, this.user.email, this.user.username,
        this.user.profileImage.url, this.user.firstName, this.user.lastName, this.user.isAdmin, this.user.reviews,
        this.user.followers, this.user.following, this.user.activity,
        new Watchlist(null, null, null, null, this.user.watchlist), this.user.createDate, this.user.lastUpdated);*/
      this._profileService.getProfileById(this.uid).subscribe((aProfile: Profile) => {
        this.parseUserProfile(aProfile);

        this._authService.getCurrentUser().subscribe((currentUser) => {
          if (!currentUser) {
            this.isProfileViewerLoggedIn = false;
            this.isProfileViewerFollowing = false;
            this.isFollowingProfileViewer = false;
          } else { // user must be logged in
            this.isProfileViewerLoggedIn = true;
            this.isViewingOwnProfile = (this.userProfile.getId() === currentUser.id);

            // determine whether user viewing profile is following the Profile in question
            for (let i = 0; i < this.userProfile.getFollowers().length; i++) {
              if (this.userProfile.getFollowers()[i]['followerId'] === currentUser.id) {
                this.isProfileViewerFollowing = true;
                break;
              }
            }

            // determine whether the user Profile is question is following the user viewing their Profile
            for (let i = 0; i < this.userProfile.getFollowing().length; i++) {
              if (this.userProfile.getFollowing()[i]['followeeId'] === currentUser.id) {
                this.isFollowingProfileViewer = true;
                break;
              }
            }
          }
        });

      }, err => { console.log(err); });
    }

    // TODO: After populating the profile, make sure to cover the use case's requirement of giving the viewer the
    // option to "follow" the profile and "prod/suggest" a movie to the profile if the viewer is signed in.
  }

  private parseUserProfile(aProfile: Profile): void {
    // if the request completely failed, populate UI with ALL the fake data
    if (!aProfile || aProfile == null) {
      this.userProfile = new Profile(this._mockUser.id, this._mockUser.bio, this._mockUser.email, this._mockUser.username,
        this._mockUser.profileImage.url, this._mockUser.firstName, this._mockUser.lastName, this._mockUser.isAdmin,
        this._mockUser.preferredService, this._mockUser.reviews, this._mockUser.followers, this._mockUser.following,
        this._mockUser.activities,
        new Watchlist(null, null, null, null, this._mockUser.watchlist), this._mockUser.createDate, this._mockUser.lastUpdated);
      return;
    }

    // otherwise, the request succeeded, populate the problem-areas with fake data if no real data exists
    if (!aProfile.getFollowers() || aProfile.getFollowers().length === 0) {
      console.log('no followers detected; using mock followers');
      aProfile.setFollowers(this._mockUser.followers);
      // console.log(aProfile.getFollowers());
    }

    if (!aProfile.getFollowing() || aProfile.getFollowing().length === 0) {
      console.log('no following detected; using mock following');
      aProfile.setFollowing(this._mockUser.following);
      // console.log(aProfile.getFollowing());
    }

    if (!aProfile.getReviews() || aProfile.getReviews().length === 0) {
      console.log('no reviews detected; using mock reviews');
      aProfile.setReviews(this._mockUser.reviews);
      // console.log(aProfile.getReviews());
    }

    if (!aProfile.getWatchlist() || aProfile.getWatchlist().getMovies().length === 0) {
      console.log('no watchlist detected; using mock watchlist');
      const mockedWatchlist = new Watchlist(null, null, null, null, this._mockUser.watchlist);
      aProfile.setWatchlist(mockedWatchlist);
    }

    if (!aProfile.getRecentActivity() || aProfile.getRecentActivity().length === 0) {
      console.log('no activity detected; using mock activity');
      aProfile.setRecentActivity(this._mockUser.activities);
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

  public follow() {
    this._usersService.follow(String(this.uid)).subscribe(
      data => {
        console.log(data);
        this.isProfileViewerFollowing = true; },
      err => console.error(err)
    );
  }

  public unfollow() {
    this._usersService.unfollow(String(this.uid)).subscribe(
      data => {
        console.log(data);
        this.isProfileViewerFollowing = false; },
      err => console.error(err)
    );
  }

  public displayStreamingService(aService: string): string {
    aService = aService.toLowerCase();

    switch (aService) {
      case 'hbo': return 'HBO';
      case 'netflix': return 'Netflix';
      case 'youtube': return 'YouTube RED';
      case 'amazon': return 'Amazon Prime Video';
      case 'hulu': return 'Hulu';
      case 'showtime': return 'ShowTime';
      case 'xfinity': return 'XFinity';
      default: return '<none>';
    }
  }

}
