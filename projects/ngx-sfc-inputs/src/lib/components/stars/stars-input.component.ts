import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { sort } from 'ngx-sfc-common';
import { any, Direction, firstItem, lastItem } from 'ngx-sfc-common';
import { BaseInputComponent } from '../base/base-input.component';
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
        animate(800)
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
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  @Input()
  items: number[] = [];

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

  selectAll(): void {
    this.onChange(lastItem(this.items) as number);
  }

  getStarsState(item: number): StarsState {
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
