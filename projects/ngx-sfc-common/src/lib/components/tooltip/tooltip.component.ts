import {
  AfterContentInit, Component, HostBinding, HostListener,
  Inject, Input, OnDestroy, OnInit
} from '@angular/core';
import { startWith, Subscription } from 'rxjs';
import { Position, MediaLimits } from '../../enums';
import { ResizeService, WINDOW } from '../../services';
import { empty } from '../../types';
import { TooltipType } from './tooltip-type.enum';

@Component({
  /* eslint-disable */
  selector: '[sfc-tooltip]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input('sfc-tooltip')
  @HostBinding('attr.value')
  value?: string | empty;

  @Input()
  @HostBinding('attr.type')
  tooltipType = TooltipType.Hover;

  @Input()
  @HostBinding('attr.position')
  tooltipPosition = Position.Top;

  @Input()
  @HostBinding('class.show')
  tooltipShow: boolean = false;

  @Input()
  resize: boolean = true;

  @HostListener('click')
  click() {
    if (this.tooltipType == TooltipType.Click) {
      this.tooltipShow = !this.tooltipShow;
    }
  }

  // preserved position
  private _position = Position.Top;

  private _resizeSubscription?: Subscription;

  constructor(private resizeService: ResizeService, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this._position = this.tooltipPosition;
  }

  ngAfterContentInit(): void {
    if (this.resize) {
      this._resizeSubscription = this.resizeService.onResize$
        .pipe(startWith(this.window))
        .subscribe(window => this.tooltipPosition = window.innerWidth <= MediaLimits.Tablet
          ? Position.Bottom : this._position);
    }
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }
}
