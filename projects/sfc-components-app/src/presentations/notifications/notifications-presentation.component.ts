import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { INotificationContentModel, NotificationTemplate, NotificationType } from 'ngx-sfc-components';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './notifications-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss', './notifications-presentation.component.scss']
})
export class NotificationsPresentationComponent extends BasePresentationComponent {

  ComponentSize = ComponentSize;

  NotificationType = NotificationType;

  NotificationTemplate = NotificationTemplate;

  onlyTitle: INotificationContentModel = { title: 'Only title' };

  subTitle: INotificationContentModel = { title: 'Only title', subTitle: 'Sub title' };

  btnText: INotificationContentModel = { title: 'Only title', subTitle: 'Sub title', buttonText: 'With button text', showButton: true };

  icon: INotificationContentModel = { title: 'Only title', subTitle: 'Sub title', buttonText: 'With button text', showButton: true, icon: 'fa fa-info' };

  closeNotification: INotificationContentModel = { title: 'Close notification title', subTitle: 'Sub title', buttonText: 'Close notification text', showButton: true, icon: 'fa fa-info' };

  btnNotification: INotificationContentModel = { title: 'Button handler title', subTitle: 'Sub title', buttonText: 'Button handler', showButton: true, icon: 'fa fa-info' };

  autoCloseModel: INotificationContentModel = { title: 'Auto close', subTitle: 'Sub title', buttonText: 'Auto close', showButton: true, icon: 'fa fa-info' };

  image: INotificationContentModel = { title: 'Only title', subTitle: 'Sub title', buttonText: 'With button text', showButton: true, image: '../assets/yellow.png' };

  notifications: INotificationContentModel[] = [];

  onCloseNotification() {
    alert('On close notification');
  }

  onButtonClick() {
    alert('On button click');
  }

  addNotification() {
    this.notifications.push(this.icon);
  }
}
