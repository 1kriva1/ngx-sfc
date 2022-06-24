import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { ITimelineItemModel, TimelineItemPosition } from 'ngx-sfc-components';
import { BasePresentationComponent } from '../base-presentations.component';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './timelines-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class TimelinesPresentationComponent extends BasePresentationComponent {

  ComponentSize = ComponentSize;

  firstHalfOnly: ITimelineItemModel[] = [
    { title: 'First half', period: true },
    { title: 'Fernando Torres', position: TimelineItemPosition.Left, description: 'Assist - Steven Gerrard', dateTimeLabel: "11'", icon: faFutbol },
    { title: 'Diedie Drogba', position: TimelineItemPosition.Right, description: 'Assist - Frank Lampard', dateTimeLabel: "23'", icon: faFutbol },
    { title: 'Xabi Alonso', position: TimelineItemPosition.Left, description: 'Dirty game', dateTimeLabel: "24'", image: '../assets/yellow.png' },
    { title: 'Xabi Alonso', position: TimelineItemPosition.Left, description: 'Yelling on referee', dateTimeLabel: "44'", image: '../assets/red.png' },
    { title: 'Second half', period: true }
  ];

  secondHalfOnly: ITimelineItemModel[] = [
    { title: 'First half', period: true },
    { title: 'Second half', period: true },
    { title: 'John Terry', position: TimelineItemPosition.Right, description: 'Assist - Frank Lampard', dateTimeLabel: "83'", icon: faFutbol }
  ];

  nothingHappened: ITimelineItemModel[] = [
    { title: 'First half', period: true },
    { title: 'Second half', period: true }
  ];

  items: ITimelineItemModel[] = [
    { title: 'First half', period: true },
    { title: 'Fernando Torres', position: TimelineItemPosition.Left, description: 'Assist - Steven Gerrard', dateTimeLabel: "11'", icon: faFutbol },
    { title: 'Diedie Drogba', position: TimelineItemPosition.Right, description: 'Assist - Frank Lampard', dateTimeLabel: "23'", icon: faFutbol },
    { title: 'Xabi Alonso', position: TimelineItemPosition.Left, description: 'Dirty game', dateTimeLabel: "24'", image: '../assets/yellow.png' },
    { title: 'Xabi Alonso', position: TimelineItemPosition.Left, description: 'Yelling on referee', dateTimeLabel: "44'", image: '../assets/red.png' },
    { title: 'Second half', period: true },
    { title: 'John Terry', position: TimelineItemPosition.Right, description: 'Assist - Frank Lampard', dateTimeLabel: "83'", icon: faFutbol }
  ];

  full: ITimelineItemModel[] = [
    { title: 'First half', period: true },
    { title: 'Fernando Torres', position: TimelineItemPosition.Left, description: 'Assist - Steven Gerrard', dateTimeLabel: "11'", icon: faFutbol },
    { title: 'Diedie Drogba', position: TimelineItemPosition.Right, description: 'Assist - Frank Lampard', dateTimeLabel: "23'", icon: faFutbol },
    { title: 'Diedie Drogba', position: TimelineItemPosition.Right, description: 'Throw T-Shirt', dateTimeLabel: "23'", image: '../assets/yellow.png' },
    { title: 'Xabi Alonso', position: TimelineItemPosition.Left, description: 'Dirty game', dateTimeLabel: "24'", image: '../assets/yellow.png' },
    { title: 'Joe Cole', position: TimelineItemPosition.Right, description: 'Penalty', dateTimeLabel: "43'", icon: faFutbol },
    { title: 'Xabi Alonso', position: TimelineItemPosition.Left, description: 'Yelling on referee', dateTimeLabel: "44'", image: '../assets/red.png' },
    { title: 'Second half', period: true },
    { title: 'Steven Gerrard', position: TimelineItemPosition.Left, description: '', dateTimeLabel: "54'", icon: faFutbol },
    { title: 'John Terry', position: TimelineItemPosition.Right, description: 'Assist - Frank Lampard', dateTimeLabel: "83'", icon: faFutbol },
    { title: 'Dirk Kuyt', position: TimelineItemPosition.Left, description: 'Assist - Riise', dateTimeLabel: "90'+4", icon: faFutbol }
  ];
}
