import { Component, HostBinding, Input } from '@angular/core';
import { CommonConstants, isDefined, isNullOrEmptyString } from 'ngx-sfc-common';
import { TimelineItemPosition } from './timeline-item-position.enum';
import { ITimelineItemModel } from './timeline-item.model';

@Component({
  selector: 'sfc-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent {

  @Input()
  model: ITimelineItemModel = { title: CommonConstants.EMPTY_STRING };

  @HostBinding('class')
  get position(): TimelineItemPosition {
    return this.model.position || TimelineItemPosition.Left;
  }

  @HostBinding('class.period')
  get period(): boolean {
    return this.model.period || false;
  }

  get showImage(): boolean {
    return !isNullOrEmptyString(this.model.image) && !isDefined(this.model.icon);
  }
}
