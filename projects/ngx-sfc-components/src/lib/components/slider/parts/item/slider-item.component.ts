import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
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

  @ViewChild('image')
  private imageEl!: ElementRef;

  @HostBinding('style.height.px')
  private get _height(): number {
    return this.imageEl?.nativeElement.offsetHeight || 0;
  };
}
