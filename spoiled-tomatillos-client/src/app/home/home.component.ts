import { Component, OnInit } from '@angular/core';
import { RecommendService } from '../services/recommend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public recommendations;

  constructor(private _recommendService: RecommendService) { }

  ngOnInit() {
    this._recommendService.getAllRecommendations().subscribe(
      data => {
        this.recommendations = data;
      }, err => console.error(err)
    );
  }

}
