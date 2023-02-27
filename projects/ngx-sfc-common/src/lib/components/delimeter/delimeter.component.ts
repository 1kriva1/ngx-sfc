import { Component, HostBinding, Input } from '@angular/core';
import { Direction, UIClass } from '../../enums';
import { isNullOrEmptyString } from '../../utils';

@Component({
  selector: 'sfc-delimeter',
  template: `<span>{{label}}</span>`,
  styleUrls: ['./delimeter.component.scss']
})
export class DelimeterComponent {

  @Input()
  label!: string;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  @HostBinding(`class.${UIClass.Empty}`)
  private get _empty(): boolean { return isNullOrEmptyString(this.label) };
}
