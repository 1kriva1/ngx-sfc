import { Component, Input } from '@angular/core';
import { ITimelineItemModel } from './parts/item/timeline-item.model';

@Component({
  selector: 'sfc-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  @Input()
  items: ITimelineItemModel[] = [];

}
