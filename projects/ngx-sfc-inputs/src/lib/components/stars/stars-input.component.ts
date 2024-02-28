import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { any, Direction, firstItem, lastItem, isEqual, sort } from 'ngx-sfc-common';
import { BaseInputComponent } from '../base/base-input.component';
import { StarsInputConstants } from './stars-input.constants';
import { StarsState } from './stars.enum';

@Component({
  selector: 'sfc-stars-input',
  templateUrl: './stars-input.component.html',
  styleUrls: ['../../styles/input.component.scss', '../../styles/vertical-input.component.scss',
    './stars-input.component.scss'],
  animations: [
    trigger('counterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
      ]),
      transition(':leave',
        animate(0, style({ opacity: 0 })))
    ])
  ]
})
export class StarsInputComponent extends BaseInputComponent<number> implements OnInit {

  @Input()
  counter: boolean = false;

  @Input()
  reset: boolean = false;

  @Input()
  resetLabel: string = StarsInputConstants.RESET_LABEL_DEFAULT;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  @Input()
  items: number[] = [1, 2, 3, 4, 5];

  override bordered: boolean = false;

  ngOnInit(): void {
    if (any(this.items))
      this.items = sort(this.items);
  }

  get showSideInfo(): boolean {
    return this.hasValue && (this.counter || this.reset);
  }

  get index(): number | null {
    return this.hasValue && any(this.items)
      ? this.items.indexOf(this.value as number) + 1
      : null;
  }

  override onChange(value: number | null): void {
    if (!isEqual(this.value, value))
      super.onChange(value);
  }

  public selectAll(): void {
    this.onChange(lastItem(this.items) as number);
  }

  public getStarsState(item: number): StarsState {
    if (this.hasValue && any(this.items)) {
      if (lastItem(this.items) === this.value)
        return StarsState.Max;

      if (firstItem(this.items) === item && item === this.value)
        return StarsState.Min;

      if (this.value as number >= item)
        return StarsState.Common;
    }

    return StarsState.None;
  }
}
