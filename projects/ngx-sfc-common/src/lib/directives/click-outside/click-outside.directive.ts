import {
  Directive, ElementRef, EventEmitter,
  Inject, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '../../services';
import { ClickOutsideEvent } from './click-outside.event';

@Directive({
  selector: '[sfcClickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {

  /**
   * Toggler for checking ouside click event
   */
  @Input('sfcClickOutside')
  public listening: boolean = false;

  /**
   * Emitter for click event
   */
  @Output()
  public action: EventEmitter<ClickOutsideEvent>
    = new EventEmitter<ClickOutsideEvent>();

  private _clickSubscription?: Subscription;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this._clickSubscription = fromEvent(this.document, 'click')
      .subscribe(event => {
        this.onClick(event);
      });
  }

  ngOnDestroy() {
    this._clickSubscription?.unsubscribe();
  }

  private onClick(event: Event) {
    if (event instanceof MouseEvent && this.listening) {
      const clickOutsideEvent: ClickOutsideEvent = {
        target: event.target,
        value: !this.isDescendant(this.elementRef.nativeElement, event.target as HTMLElement)
      };

      this.action.emit(clickOutsideEvent);
    }
  }

  private isDescendant(parent: HTMLElement, child: HTMLElement) {
    let node: HTMLElement = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode as HTMLElement;
      }
    }
    return false;
  }
}