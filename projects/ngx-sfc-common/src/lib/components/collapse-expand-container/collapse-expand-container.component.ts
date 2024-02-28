import { Component, Input } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-collapse-expand-container',
  templateUrl: './collapse-expand-container.component.html',
  styleUrls: ['./collapse-expand-container.component.scss']
})
export class CollapseExpandContainerComponent {

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  @Input()
  expand: boolean = false;

  @Input()
  labelExpand!: string;

  @Input()
  labelCollapse!: string;

  @Input()
  delimeter: boolean = false;
}
