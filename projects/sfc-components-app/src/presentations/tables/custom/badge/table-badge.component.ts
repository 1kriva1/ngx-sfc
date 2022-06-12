import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-badge',
  templateUrl: './table-badge.component.html',
  styleUrls: ['./table-badge.component.scss']
})
export class TableBadgeComponent {

  @Input()
  label!: string;

  @Input()
  icon!: string;

  @Input()
  color!: string;
}