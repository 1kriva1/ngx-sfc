import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sfc-slider-pagination',
  templateUrl: './slider-pagination.component.html',
  styleUrls: ['./slider-pagination.component.scss']
})
export class SliderPaginationComponent {

  @Input()
  count: number = 0;

  @Input()
  index: number = 0;

  @Output()
  selected: EventEmitter<number> = new EventEmitter<number>();

  get items(): Array<any> {
    return Array.from({length: this.count});
  }

  selectItem(index: number): void {
    this.selected.emit(index);
  }
}
