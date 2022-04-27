import { Component, HostBinding, Input } from '@angular/core';
import { UIClass } from 'ngx-sfc-common';
import { SliderButtonType } from './slider-button-type.enum';

@Component({
  selector: 'sfc-slider-button',
  templateUrl: './slider-button.component.html',
  styleUrls: ['./slider-button.component.scss']
})
export class SliderButtonComponent {

  private readonly ICON_NEXT = 'fa fa-arrow-right';
  private readonly ICON_PREVIOUS = 'fa fa-arrow-left';

  @Input()
  @HostBinding('class')
  type: SliderButtonType = SliderButtonType.Next;

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  get icon(): string {
    return this.type == SliderButtonType.Next
      ? this.ICON_NEXT
      : this.ICON_PREVIOUS;
  }
}
