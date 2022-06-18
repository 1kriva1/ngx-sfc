import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { CarouselOptionsModel } from 'ngx-sfc-components';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './carousel-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss', './carousel-presentation.component.scss']
})
export class CarouselPresentationComponent extends BasePresentationComponent {

  ComponentSize = ComponentSize;

  customOptions: CarouselOptionsModel = {
    loop: true,
    center: false,
    autoplay: false,
    autoplaySpeed: 2000,
    autoplayHoverPause: false,
    dots: true,
    rtl: false,
    navSpeed: 700,
    navText: ['Next', 'Prev'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
