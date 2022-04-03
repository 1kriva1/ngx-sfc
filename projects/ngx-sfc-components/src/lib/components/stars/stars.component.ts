import { Component, Input } from '@angular/core';
import { StarType } from './star-type.enum';

@Component({
  selector: 'sfc-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  private readonly DEFAULT_COUNT = 5;

  @Input()
  value: number = 0;

  @Input()
  count: number = this.DEFAULT_COUNT;

  get stars(): Array<number> {
    return new Array(this.count);
  }

  getStarType(index: number) {
    index += 1;

    if ((index - this.value) >= 1) {
      return StarType.None;
    }

    if (this.value >= index) {
      return StarType.Full;
    }

    const part = this.value - Math.floor(this.value);

    if (part < 0.25 || (part >= 0.25 && part < 0.5)) {
      return StarType.S25;
    }

    if (part >= 0.5 && part < 0.75) {
      return StarType.Half;
    }

    return StarType.S75;
  }
}
