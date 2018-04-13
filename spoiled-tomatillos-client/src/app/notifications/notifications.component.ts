import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public notifications: Array<any>;
  public unseenCount: number;

  constructor(private _notificationService: NotificationService, public utils: Utils) {}

  ngOnInit() {
    this._notificationService.getNotifications().subscribe((response) => {
      if (response) {
        this.notifications = response['notifications'];
        this.unseenCount = response['unseenCount'];
      }
    });

    this._notificationService.updateUnseenCount();
  }
}
