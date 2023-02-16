import { Component, HostBinding, Input } from '@angular/core';
import { Direction } from '../../enums';

@Component({
  selector: 'sfc-delimeter',
  template: ``,
  styleUrls: ['./delimeter.component.scss']
})
export class DelimeterComponent {

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;
}
