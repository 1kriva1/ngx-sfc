import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ButtonType, isDefined, isNullOrEmptyString } from 'ngx-sfc-common';
import { NotificationType } from '../../enums/notification-type.enum';
import { INotificationContentModel } from './notification-content.model';

@Component({
  selector: 'sfc-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.scss']
})
export class NotificationContentComponent {

  ButtonType = ButtonType;

  @Input()
  @HostBinding('class')
  type: NotificationType = NotificationType.Info;

  @Input()
  model: INotificationContentModel = {};

  @Output()
  buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  get showImage(): boolean {
    return !isNullOrEmptyString(this.model.image) && !isDefined(this.model.icon);
  }
}
