import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonConstants } from '../../constants';

@Directive({
  selector: '[sfc-mouse-down]'
})
export class MouseDownDirective {

  /**
   * Allowed mouse button
   */
  @Input()
  button: number = CommonConstants.MOUSE_BUTTON_LEFT;

  @Output('sfc-mouse-down')
  action: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent) {
    if ($event.button === this.button) {
      this.action.emit($event);
    }
    else {
      $event.preventDefault();
    }
  }
}