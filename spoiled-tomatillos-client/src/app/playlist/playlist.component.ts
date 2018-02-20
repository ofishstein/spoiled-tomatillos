import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { UserService } from '../user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  private playlist;
  private uid;
  // private pages;

  constructor(private route: ActivatedRoute) {
    this.uid = this.route.snapshot.params.uid;
  }

  ngOnInit() {
    this.getPlaylist();
  }

  getPlaylist() {
    // this.userService.getUserPlaylist(this.uid)
    //   .subscribe(playlist => this.playlist = playlist);
    this.playlist = [
      {id: 1, Title: "Shrek", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
      {id: 2, Title: "Requiem for a Dream", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"},
      {id: 3, Title: "Superstar", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BN2Q2YjFlMzYtYjVlMC00MmZmLTg5MzQtZjUyYmY2N2U5MjIxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
      {id: 4, Title: "Goon", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxOTQwMTQ3MF5BMl5BanBnXkFtZTcwMDcyOTQwNw@@._V1_SX300.jpg"},
      {id: 5, Title: "Ex Machina", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg"},
    ];
  }

  removeFromPlaylist(movieId: number) : void {
    // call service to remove given movie from user's playlist
  }

}
