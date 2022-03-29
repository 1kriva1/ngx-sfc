import { Component } from '@angular/core';
import { getCalcValue } from 'ngx-sfc-common';
import { TabSliderBase } from '../tab-slider-base.component';

@Component({
  selector: 'sfc-tab-label-line-slider',
  templateUrl: './tab-label-line-slider.component.html',
  styleUrls: ['./tab-label-line-slider.component.scss']
})
export class TabLabelLineSliderComponent extends TabSliderBase {

  get style() {
    return {
      width: getCalcValue(this.count),
      left: getCalcValue((this.count / this.index))
    }
  }
}
