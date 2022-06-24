import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-badge',
  templateUrl: './table-badge.component.html',
  styleUrls: ['./table-badge.component.scss']
})
export class TableBadgeComponent {

  @Input()
  label!: string;

  @Input()
  icon!: IconDefinition;

  @Input()
  color!: string;
}