import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { IBubbleInnerModel } from './bubble.model';

@Component({
  selector: 'sfc-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent {

  @Input()
  model: IBubbleInnerModel = {
    key: CommonConstants.DEFAULT_KEY_VALUE,
    label: CommonConstants.EMPTY_STRING,
    active: false,
    disabled: false
  };

  @Output()
  check = new EventEmitter<IBubbleInnerModel>();

  @HostListener('click')
  onClick = () => this.check.emit(this.model);

  @HostBinding(`class.${UIClass.Active}`)
  private get _active(): boolean {
    return this.model.active;
  }

  @HostBinding(`class.${UIClass.Disabled}`)
  private get _disabled(): boolean {
    return this.model.disabled;
  }
}
