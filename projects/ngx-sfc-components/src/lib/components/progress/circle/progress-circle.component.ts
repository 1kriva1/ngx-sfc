import { Component, HostBinding, Input } from '@angular/core';
import { CommonConstants, getCssLikeValue, UIConstants } from 'ngx-sfc-common';
import { ProgressBaseComponent } from '../progress.component';

@Component({
  selector: 'sfc-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent
  extends ProgressBaseComponent {

  @Input()
  total: number = CommonConstants.FULL_PERCENTAGE;

  @HostBinding('class.reversed')
  get reversed(): boolean {
    return (this.progress / this.total) * CommonConstants.FULL_PERCENTAGE > 50;
  }

  get transformRotate() {
    return `rotate(${getCssLikeValue((this.progress * 360) / this.total,
      UIConstants.CSS_DEGREES)})`;
  }
}
