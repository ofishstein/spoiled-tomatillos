import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnInit {

  public userInfo: object;
  public cases: Array<object>;

  constructor() { }

  ngOnInit() {
    this.populateUserInfo();

    this.populateUserCases();
  }

  public isDate(anObj: any): boolean {
    return anObj instanceof Date;
  }

  public getOwnPropertyNames(anObject: object) {
    return Object.getOwnPropertyNames(anObject);
  }

  private populateUserInfo(): void {
    this.userInfo = {
      'user Id': 9344028,
      'username': 'Onaje Baxley',
      'join date': new Date(),
      'violation count': 119,
      'latest violation date': new Date()
    };
  }

  private populateUserCases(): void {
    this.cases = [
      { caseId: 128493, movieId: 102948, movieTitle: 'Black Panther', flagCount: 12, reportDate: new Date(), actionTaken: 'Pending Reiew',
      comment: 'Everyone sucks and blah blah whatever you say i hate you.' },
      { caseId: 238479, movieId: 203191, movieTitle: 'Forrest Gump', flagCount: 47, reportDate: new Date(), actionTaken: 'Closed',
      comment: 'This is the worlds worst platform that anyone has ever developed.' },
      { caseId: 2944911, movieId: 357790, movieTitle: 'Apollo', flagCount: 99, reportDate: new Date(), actionTaken: 'Pending Reiew',
      comment: 'Yoooo hit me up on here or on Facebook if you need that loud my snapchats @420SMokeweedxx4LYFExxx.' }
    ];
  }

}
