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
  private users;

  constructor(private route: ActivatedRoute) {
    this.uid = parseInt(this.route.snapshot.params.uid);
    this.listType = this.route.snapshot.params.listType;
    this.listTitle = this.listType.charAt(0).toUpperCase()
      .concat(this.listType.substring(1));
  }

  ngOnInit() {
    this.users = [
      {userId: 124, username: "bob", profileImageUrl: "../../assets/profile_image_placeholder.png", isFollowing: false},
      {userId: 124, username: "bob", profileImageUrl: "../../assets/profile_image_placeholder.png", isFollowing: true},
      {userId: 124, username: "bob", profileImageUrl: "../../assets/profile_image_placeholder.png", isFollowing: false},
      {userId: 124, username: "bob", profileImageUrl: "../../assets/profile_image_placeholder.png", isFollowing: false},
      {userId: 124, username: "bob", profileImageUrl: "../../assets/profile_image_placeholder.png", isFollowing: true}
    ];
    // if (this.listType == 'followers') {
    //   this.getFollowers();
    // } else {
    //   this.getFollowing();
    // }
  }

  /**
   * Follow the given user
   * @param userToFollow the uid of the user being followed
   */
  follow(userToFollow: number) : void {
  }

  /**
   * Unfollow the given user
   * @param userToUnfollow the uid of the user being unfollowed
   */
  unfollow(userToUnfollow: number) : void {
  }

  /**
   * Get the list of followers for this user
   */
  getFollowers() : Observable<object> {

  }

  /**
   * Get the list of users this user is following
   */
  getFollowing() : Observable<object> {

  }

}
