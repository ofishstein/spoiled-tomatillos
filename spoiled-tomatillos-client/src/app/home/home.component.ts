import { Component, OnInit } from '@angular/core';
import { RecommendService } from '../services/recommend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public recommendations;
  public noRes: boolean;

  constructor(private _recommendService: RecommendService) {
      this.noRes = true;
   }

  ngOnInit() {
    this._recommendService.getAllRecommendations().subscribe(
      data => {
        this.recommendations = JSON.parse(data);

        if (this.recommendations.length > 0) {
          this.noRes = false;
        } else {
          this.noRes = true;
        }
        console.log(data);
        console.log(this.noRes);
      }, err => console.error(err)
    );
  }

}
