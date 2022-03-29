import { Component } from '@angular/core';
import { getCalcValue, UIConstants } from 'ngx-sfc-common';
import { TabSliderBase } from '../tab-slider-base.component';

@Component({
  selector: 'sfc-tab-label-icon-slider',
  templateUrl: './tab-label-icon-slider.component.html',
  styleUrls: ['./tab-label-icon-slider.component.scss']
})
export class TabLabelIconSliderComponent extends TabSliderBase {

  get style(): any {
    return {
      width: getCalcValue(this.count),
      transform: `translateX(${100 * this.index}${UIConstants.CSS_PERCENTAGE})`
    }
  }
}
