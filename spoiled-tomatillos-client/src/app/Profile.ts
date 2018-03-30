import { Watchlist } from './Watchlist';

export class Profile {
    private _id: number;
    private _bio: string;
    private _email: string;
    private _username: string;
    private _photoPath: string;
    private _firstName: string;
    private _lastName: string;
    private _isAdmin: boolean;
    private _reviews: Array<object>;
    private _followers: Array<object>;
    private _following: Array<object>;
    private _activity: Array<object>;
    // private _watchlists: Array<Array<object>>; Deprecated: only one watchlist per Profile
    private _watchlist: Watchlist;
    private _create_date: number;
    private _last_updated: number;

    constructor(id: number, bio: string, email: string, username: string, photoPath: string,
        firstName: string, lastName: string, isAdmin: boolean, reviews: Array<object>, followers: Array<object>,
        following: Array<object>, activity: Array<object>, watchList: Watchlist, createdTimestamp: string, lastUpdatedTimestamp: string) {
      this._id = id || 999;
      this._bio = bio || '<no bio>';
      this._email = email || 'noemail@default.com';
      this._username = username || 'nouser_name';
      this._photoPath = photoPath || 'http://lorempixel.com/300/300';
      this._firstName = firstName || 'Nofirstname';
      this._lastName = lastName || 'Nolastname';
      this._isAdmin = isAdmin || false;
      this._reviews = reviews || [];
      this._followers = followers || [];
      this._following = following || [];
      this._activity = activity || [];
      // this._watchlists = watchLists || [[]];
      this._watchlist = watchList || new Watchlist(null, null, null, null, null);

      try {
          this._create_date = Date.parse(createdTimestamp);
      } catch (e) {
          this._create_date = Date.parse('2018-03-01T00:00:00.000Z');
      }

      try {
          this._last_updated = Date.parse(lastUpdatedTimestamp);
      } catch (e) {
          this._last_updated = Date.parse('2018-03-01T00:00:00.000Z');
      }
    }

    // Accessors
    public getId(): number {
        return this._id;
    }

    public getBio(): string {
        return this._bio;
    }

    public getFullName(): string {
        return this._firstName + ' ' + this._lastName;
    }

    public getUsername(): string {
        return this._username;
    }

    public getEmail(): string {
        return this._email;
    }

    public getPhotoPath(): string {
        return this._photoPath;
    }

    /* Deprecated: we're only doing one watchlist per Profile
    public getWatchlists(): Array<Array<object>> {
        return this._watchlists;
    }*/

    public getWatchlist(): Watchlist {
        return this._watchlist;
    }

    public getFollowers(): Array<object> {
        return this._followers;
    }

    public getFollowing(): Array<object> {
        return this._following;
    }

    public getRecentActivity(): Array<object> {
        return this._activity;
    }

    public getReviews(): Array<object> {
        return this._reviews;
    }

    public isAdmin(): boolean {
        return this._isAdmin;
    }

    public getCreateDate(): number {
        return this._create_date;
    }

    public getLastUpdated(): number {
        return this._last_updated;
    }

    // Mutators
    public setId(id: number): void {
        this._id = id;
    }

    public setFirstName(newFirstName: string): void {
        this._firstName = newFirstName;
    }

    public setLastName(newLastName: string): void {
        this._lastName = newLastName;
    }

    public setBio(newBio: string): void {
        this._bio = newBio;
    }

    public setEmail(newEmail: string): void {
        this._email = newEmail;
    }

    public setReviews(newReviews: Array<object>): void {
        this._reviews = newReviews;
    }

    public setFollowers(newFollowers: Array<object>): void {
        this._followers = newFollowers;
    }

    public setFollowing(newFollowing: Array<object>): void {
        this._following = newFollowing;
    }

    public setRecentActivity(activity: Array<object>): void {
        this._activity = activity;
    }

    /* Deprecated: We're only doing one watchlist per Profile
    public setWatchlists(newWatchLists: Array<Array<object>>): void {
        this._watchlists = newWatchLists;
    }*/

    /* Deprecated: We're only doing one watchlist per Profile
    public addMovieToAWatchlist(watchListId: number, movie: object): void {
        for (let i = 0; i < this.getWatchlists().length; i++) {
            if (this._watchlists[i]['id'] && this.getWatchlists()[i]['id'] === watchListId) {
                this._watchlists[i].push(movie);
            }
        }
    }*/

    public setWatchlist(newWatchlist: Watchlist): void {
        this._watchlist = newWatchlist;
    }

    public addMovieToWatchlist(newMovie: object): void {
        this._watchlist.addMovieToWatchlist(newMovie);
    }
}
