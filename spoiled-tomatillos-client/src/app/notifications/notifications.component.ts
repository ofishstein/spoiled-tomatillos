import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  private notifications: Array<any>;
  private unseenCount: number;

  constructor(private _notificationService: NotificationService) {}

  ngOnInit() {
    this._notificationService.getNotifications().subscribe((response) => {
      if (response) {
        console.log('GET NOTIFICATIONS RESPONSE: '+response);
        this.notifications = response['notifications'];
        this.unseenCount = response['unseenCount'];
      }
    });
  }

}
