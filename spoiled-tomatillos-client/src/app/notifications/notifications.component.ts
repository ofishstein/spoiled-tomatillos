import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public notifications: Array<any>;
  public unseenCount: number;

  constructor(private _notificationService: NotificationService) {}

  ngOnInit() {
    this._notificationService.getNotifications().subscribe((response) => {
      if (response) {
        console.log('GET NOTIFICATIONS RESPONSE["notifications"]: '+response['notifications']);
        this.notifications = response['notifications'];
        this.unseenCount = response['unseenCount'];
      }
    });

    this._notificationService.updateUnseenCount();
  }

}
