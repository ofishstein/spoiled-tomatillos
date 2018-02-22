import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private uid: number;
  private listType: string;
  private listTitle: string;
  private users: any[];

  constructor(private route: ActivatedRoute) {
    this.uid = parseInt(this.route.snapshot.params.uid);
    this.listType = this.route.snapshot.params.listType;
    this.listTitle = this.listType.charAt(0).toUpperCase()
      .concat(this.listType.substring(1));
  }

  ngOnInit() {
    this.users = [
      {userId: 124, username: "bob_lob_law", profileImage: {
        url: "../../assets/profile_image_placeholder.png", width: 167, height: 167
      }, isFollowing: false},
      {userId: 125, username: "fred124", profileImage: {
        url: "http://lorempixel.com/400/400/", width: 400, height: 400
      }, isFollowing: true},
      {userId: 126, username: "jane", profileImage: {
        url: "http://lorempixel.com/300/400/", width: 300, height: 400
      }, isFollowing: false},
      {userId: 127, username: "ann_23sdf", profileImage: {
        url: "../../assets/profile_image_placeholder.png", width: 167, height: 167
      }, isFollowing: false},
      {userId: 128, username: "shreksy_lexy", profileImage: {
        url: "http://lorempixel.com/750/500/", width: 750, height: 500
      }, isFollowing: true}
    ];
    // if (this.listType == 'followers') {
    //   this.getFollowers();
    // } else {
    //   this.getFollowing();
    // }

    this.users.forEach((user) => {
      user.style = {};
      if (user.profileImage.height >= user.profileImage.width) {
        user.style.height = 200;
        user.style.width = "auto";
      } else {
        console.log("else statemeent");
        user.style.width = 200;
        user.style.height = "auto";

      }
    });
  }

  /**
   * Follow the given user
   * @param userToFollow the uid of the user being followed
   */
  follow(userToFollow: number): void {
  }

  /**
   * Unfollow the given user
   * @param userToUnfollow the uid of the user being unfollowed
   */
  unfollow(userToUnfollow: number): void {
  }

  // /**
  //  * Get the list of followers for this user
  //  */
  // getFollowers(): Observable<object> {
  //
  // }
  //
  // /**
  //  * Get the list of users this user is following
  //  */
  // getFollowing(): Observable<object> {
  //
  // }

}
