import { Component, HostBinding, Input } from '@angular/core';
import { faArrowRight, faArrowLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UIClass } from 'ngx-sfc-common';
import { SliderButtonType } from './slider-button-type.enum';

@Component({
  selector: 'sfc-slider-button',
  templateUrl: './slider-button.component.html',
  styleUrls: ['./slider-button.component.scss']
})
export class SliderButtonComponent {

  private readonly ICON_NEXT = faArrowRight;
  private readonly ICON_PREVIOUS = faArrowLeft;

  @Input()
  @HostBinding('class')
  type: SliderButtonType = SliderButtonType.Next;

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  get icon(): IconDefinition {
    return this.type == SliderButtonType.Next
      ? this.ICON_NEXT
      : this.ICON_PREVIOUS;
  }
}
