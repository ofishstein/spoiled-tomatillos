import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError } from 'rxjs/operators';
import { Profile } from '../Profile';
import { Watchlist } from '../Watchlist';

@Injectable()
export class ProfileService {

  private _profileBasePath: string;

  constructor(private _http: HttpClient) {
    this._profileBasePath = 'http://ec2-18-216-146-141.us-east-2.compute.amazonaws.com:3000/api/users';
  }

  public getProfileById(profileId: number): Observable<Profile> {
    // return this._http.get<Response>('/api/users/' + String(profileId), { withCredentials: true }).pipe(
    return this._http.get<Response>('/api/users/' + String(profileId)).pipe(
      map((resp) => {
        const body: any = resp;
        console.log('received response from GET /api/users/' + String(profileId));
        console.log(body);

        let profileWatchlist: Watchlist;
        if (body.watchlist) {
          profileWatchlist = new Watchlist(null, null, null, null, body.watchlist);
        } else {
          profileWatchlist = new Watchlist(null, null, null, null, null);
        }
        return new Profile(body.id, body.bio, body.email, body.username, body.profileImageUrl,
          body.firstName, body.lastName, body.isAdmin, body.reviews, body.followers, body.following,
          body.activities, profileWatchlist, body.createdAt, body.updatedAt);
      }),
      catchError((err) => {
        console.log('ERROR during GET request to /api/users/' + String(profileId) + ':');
        console.log(err);
        return of(null);
      })
    );
  }

}
