import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants, getCssLikeValue, UIConstants } from 'ngx-sfc-common';
import { ProgressBaseComponent } from '../progress.component';

@Component({
  selector: 'sfc-progress-semi-circle',
  templateUrl: './progress-semi-circle.component.html',
  styleUrls: ['./progress-semi-circle.component.scss']
})
export class ProgressSemiCircleComponent
  extends ProgressBaseComponent
  implements OnInit {

  @Input()
  limits: boolean = true;

  @Input()
  min: number = 0;

  @Input()
  max: number = CommonConstants.FULL_PERCENTAGE;

  ngOnInit(): void {
    if (this.min > this.max)
      this.min = 0;

    if (this.progress < this.min)
      this.progress = this.min;

    if (this.progress > this.max)
      this.progress = this.max;
  }

  get barStyles() {
    const color = this.getColor(this.progress),
      differenceLimits = this.max - this.min,
      rotateValue = 45 + (180 - ((this.max - this.progress) * 180 / differenceLimits));

    return {
      transform: `rotate(${getCssLikeValue(rotateValue, UIConstants.CSS_DEGREES)})`,
      borderBottomColor: color,
      borderRightColor: color
    }
  }
}
