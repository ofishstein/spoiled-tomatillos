import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public userCases: Array<object>;

  constructor() {
  }

  ngOnInit() {
    this.populateUserCaseTable();
  }

  public formatDateStr(aDate: Date): string {
    const mm = aDate.getMonth() + 1;
    const dd = aDate.getDate();

    return [aDate.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd].join('/');
  }

  public populateUserCaseTable() {
    this.userCases = [
      { id: 1, date: new Date(), username: 'Mike Adams', userId: 149209, flagCount: 49, status: 'CLOSED' },
      { id: 2, date: new Date(), username: 'Holy Galivan', userId: 136209, flagCount: 44, status: 'OPEN' },
      { id: 3, date: new Date(), username: 'Mary Shea', userId: 144279, flagCount: 86, status: 'OPEN' },
      { id: 4, date: new Date(), username: 'Jim Adams', userId: 146209, flagCount: 23, status: 'PENDING' },
      { id: 5, date: new Date(), username: 'Henry Galivan', userId: 189209, flagCount: 44, status: 'OPEN' },
      { id: 6, date: new Date(), username: 'Bob Shea', userId: 299209, flagCount: 45, status: 'PENDING' },
      { id: 7, date: new Date(), username: 'Andy Parks', userId: 169899, flagCount: 47, status: 'CLOSED' },
      { id: 8, date: new Date(), username: 'Onaje Baxley', userId: 779209, flagCount: 31, status: 'OPEN' },
      { id: 9, date: new Date(), username: 'James Conan', userId: 178819, flagCount: 72, status: 'OPEN' },
      { id: 10, date: new Date(), username: 'Jerry Andrews', userId: 119209, flagCount: 14, status: 'OPEN' },
      { id: 11, date: new Date(), username: 'Mike Champion', userId: 149109, flagCount: 11, status: 'CLOSED' },
      { id: 12, date: new Date(), username: 'Jane Doe', userId: 149709, flagCount: 20, status: 'OPEN' }
    ];
  }

}
