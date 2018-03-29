export class Watchlist {
  private _id: number;
  private _name: string;
  private _created: number;
  private _last_updated: number;
  private _movies: Array<object>;

  constructor(id: number, name: string, createdTimestamp: string, lastUpdatedTimestamp: string, movies: Array<object>) {
    this._id = id || 999;
    this._name = name || 'Nonamelist';
    this._movies = movies || [{movieId: 999, title: 'NoMovie', poster: 'http://lorempixel.com/200/200'}];

    try {
      this._created = Date.parse(createdTimestamp);
    } catch (e) {
      this._created = 99999999;
    }

    try {
      this._last_updated = Date.parse(lastUpdatedTimestamp);
    } catch (e) {
      this._last_updated = 99999999;
    }
  }

  // Accessors

  public getId(): number {
      return this._id;
  }

  public getName(): string {
      return this._name;
  }

  public getMovies(): Array<object> {
      return this._movies;
  }

  public getCreateDate(): number {
      return this._created;
  }

  public getLastUpdated(): number {
      return this._last_updated;
  }

  // Mutators

  public setId(newId: number): void {
      this._id = newId;
  }

  public setName(newName: string): void {
      this._name = newName;
  }

  public setMovies(movieList: Array<object>): void {
      this._movies = movieList;
  }

  public addMovieToWatchlist(aMovie: object): void {
      this._movies.push(aMovie);
  }

  public setLastUpdated(timestamp: number): void {
      this._last_updated = timestamp;
  }
}
