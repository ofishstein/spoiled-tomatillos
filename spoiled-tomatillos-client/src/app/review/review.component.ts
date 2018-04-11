import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() private review: any = {};
  private _currentUserId: number;
  private _isDeleted: boolean;

  constructor(private _authService: AuthService, private _movieService: MovieService) {
    this._isDeleted = false;
  }

  ngOnInit() {
    this._authService.getCurrentUser().subscribe((aUser) => {
      try {
        if (aUser && Number.parseInt(aUser.id)) {
          this._currentUserId = Number.parseInt(aUser.id);
        } else {
          this._currentUserId = -1;
        }
      } catch (e) {
        this._currentUserId = -1;
      }
    });
  }

  /**
   * UI logic for determining whether the current user can delete the given review.
   * @param aReview a Review object holding (at least) an "id" field of the review id in question
   */
  public canDelete(aReview): boolean {
    return this._currentUserId === aReview.user.id;
  }

  /**
   * Deletes the given review from the UI assuming the logged-in user has permisison.
   * @param aReview a Review object holding (at least) an "id" field of the review id in question
   */
  public deleteReview(aReview): void {
    const reviewId = aReview.id;
    try {
      if (reviewId && Number.parseInt(reviewId)) {
        this._movieService.deleteMovieReview(reviewId).subscribe((success) => {
          if (success) {
            this._isDeleted = true;
          }
        });
      }
    } catch (e) {
      console.log('Attempt to delete invalid reviewId: ' + reviewId);
    }
  }

  /**
   * If the given timestamp is < 7 days from today, returns an hour/day comparison against today.
   * Otherwise returns a formatted date string of the given timestamp.
   * @param timestamp represents the string timestamp to be displayed
   */
  public getActivityDisplayDate(timestamp: string): string {
    const parsedDate = Date.parse(timestamp);
    const asDate = new Date(parsedDate);
    const timeDiff = Math.abs(new Date(Date.now()).getTime() - asDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 1) {
      return 'less than ' + String( Math.ceil(timeDiff / (1000 * 3600)) ) + 'h ago';
    } else if (diffDays < 7) {
     return String(diffDays) + 'd ago';
    } else {
      return asDate.toDateString();
    }
  }
}
