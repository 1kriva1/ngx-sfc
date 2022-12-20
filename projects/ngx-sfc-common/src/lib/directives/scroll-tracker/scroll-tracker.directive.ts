import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Position } from '../../enums';
import { hasItem } from '../../utils';

@Directive({
  selector: '[sfcScrollTracker]'
})
export class ScrollTrackerDirective {

  @Input()
  positions: Position[] = [];

  @Output()
  sfcScrollTracker: EventEmitter<Position> = new EventEmitter<Position>();

  @HostListener('scroll', ['$event'])
  private onScroll(event: Event) {
    const position = this.getPosition(event)
    if (position && hasItem(this.positions, position))
      this.sfcScrollTracker.emit(position);
  }

  private getPosition(event: Event): Position | null {
    const tracker: any = event.target,
      limit = tracker.scrollHeight - tracker.clientHeight;

    if (tracker.scrollTop >= limit)
      return Position.Bottom;
    else if (tracker.scrollTop <= 0)
      return Position.Top;

    return null;
  }
}