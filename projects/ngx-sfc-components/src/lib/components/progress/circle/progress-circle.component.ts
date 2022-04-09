import { Component, HostBinding } from '@angular/core';
import { CommonConstants, getCssLikeValue, UIConstants } from 'ngx-sfc-common';
import { ProgressBaseComponent } from '../progress.component';

@Component({
  selector: 'sfc-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent
  extends ProgressBaseComponent {

  @HostBinding('class.reversed')
  get reversed(): boolean {
    return this.progress > 50;
  }

  get transformRotate() {
    return `rotate(${getCssLikeValue((this.progress * 360) / CommonConstants.FULL_PERCENTAGE,
      UIConstants.CSS_DEGREES)})`;
  }
}
