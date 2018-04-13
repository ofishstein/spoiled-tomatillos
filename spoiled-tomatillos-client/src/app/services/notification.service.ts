import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {

  public unseenCount: BehaviorSubject<number | boolean>;
  public notifications: any;

  constructor(private http: HttpClient) {
    this.unseenCount = new BehaviorSubject(false);
  }

  public getNotifications(): Observable<any> {
    return this.http.get('/api/notifications', {withCredentials: true});
  }

  public updateUnseenCount(): void {
    this.http.get('/api/notifications/unseenCount', {withCredentials: true})
      .subscribe((res) => {
        if (this.unseenCount.value !== res) {
          this.unseenCount.next(Number(res));
        }
      }, (err) => {
        console.log('Checking for new notifications failed.', err);
      });
  }

  // on logout, reset unseen count to false
  public resetUnseenCount(): void {
    this.unseenCount.next(false);
  }



}
