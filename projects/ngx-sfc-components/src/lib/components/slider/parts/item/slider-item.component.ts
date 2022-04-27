import { Component, Input } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { ISliderItemModel } from './slider-item.model';

@Component({
  selector: 'sfc-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss']
})
export class SliderItemComponent {

  @Input()
  model: ISliderItemModel = { imageSrc: CommonConstants.EMPTY_STRING };

}
