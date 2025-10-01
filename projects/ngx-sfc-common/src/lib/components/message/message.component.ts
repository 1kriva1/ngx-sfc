import { Component, HostBinding, Input } from '@angular/core';
import { NotificationType } from '../../enums';
import { empty } from '../../types';

@Component({
  selector: 'sfc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input()
  message: string | empty;

  @Input()
  @HostBinding('class')
  type: NotificationType = NotificationType.Info;
}