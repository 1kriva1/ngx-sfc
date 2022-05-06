import { Component, ContentChildren, EventEmitter, HostBinding, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { isDefined, TemplateReferenceDirective } from 'ngx-sfc-common';
import { INotificationAutoCloseModel } from './notification-auto-close.model';
import { NotificationTemplate } from './enums/notification-template.enum';
import { NotificationType } from './enums/notification-type.enum';
import { INotificationContentModel } from './parts/content/notification-content.model';

@Component({
  selector: 'sfc-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  private readonly AUTO_CLOSE_INTERVAL_DEFAULT = 5000;

  readonly DESTROY_HOST_INTERVAL = 500;

  NotificationTemplate = NotificationTemplate;

  @Input()
  showClose: boolean = true;

  @Input()
  autoCloseModel: INotificationAutoCloseModel = { enabled: false, interval: this.AUTO_CLOSE_INTERVAL_DEFAULT };

  @Input()
  @HostBinding('class')
  type: NotificationType = NotificationType.Info;

  @Input()
  model: INotificationContentModel = { showButton: true };

  @Input()
  content?: TemplateRef<any>;

  @Output()
  closed: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
  templates: QueryList<TemplateReferenceDirective> | undefined;

  destroy: boolean = false;

  show: boolean = false;

  ngOnInit(): void {
    if (!isDefined(this.autoCloseModel.interval))
      this.autoCloseModel.interval = this.AUTO_CLOSE_INTERVAL_DEFAULT;

    if (this.autoCloseModel.enabled)
      setTimeout(() => {
        if (this.show) {
          this.close();
        }
      }, this.autoCloseModel.interval);

    // for animation purpose
    setTimeout(() => this.show = true);
  }

  close() {
    this.show = false;
    this.destroy = true;
    this.closed.emit();
  }
}
