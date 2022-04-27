import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { ISliderItemModel, SliderType } from 'ngx-sfc-components';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './sliders-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class SlidersPresentationComponent extends BasePresentationComponent {

  ComponentSize = ComponentSize;

  SliderType = SliderType;

  items: ISliderItemModel[] = [
    {
      title: 'title 1',
      subTitle: 'sub-title 1',
      imageSrc: '../assets/belgium_eden_hazard.png'
    },
    {
      title: 'title 2',
      subTitle: 'sub-title 2',
      imageSrc: '../assets/argentina_messi.png'
    },
    {
      title: 'title 3',
      subTitle: 'sub-title 3',
      imageSrc: '../assets/costa_rica_ruis.png'
    },
    {
      title: 'title 4',
      subTitle: 'sub-title 4',
      imageSrc: '../assets/ecuador_nunies.png'
    },
    {
      title: 'title 5',
      subTitle: 'sub-title 5',
      imageSrc: '../assets/portugal_ronaldo.png'
    }
  ];
}
