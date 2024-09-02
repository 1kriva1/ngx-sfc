import { Component, OnInit } from '@angular/core';
import { CarouselInputComponent } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './carousel-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss', './carousel-presentation.component.scss']
})
export class CarouselPresentationComponent extends BasePresentationComponent
  implements OnInit {

  public schemas: any[] = [
    {
      key: 0,
      value: [3, 4, 3]
    },
    {
      key: 1,
      value: [3, 5, 2]
    },
    {
      key: 2,
      value: [4, 5, 1]
    },
    {
      key: 3,
      value: [4, 3, 3]
    },
    {
      key: 4,
      value: [4, 4, 2]
    }
  ];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputCarouselNull: [null],
        inputCarouselLabel: [null],
        inputCarouselHelper: [null],
        inputCarouselIcon: [null],
        inputCarouselLabelHelperIcon: [null],
        inputCarouselDisabled: [{
          value: [null],
          disabled: true
        }],
        inputCarouselMultiple: [null],
        inputCarouselDots: [null],
        inputCarouselItems: [null],
        inputCarouselValue: [{
          value: [3],
          disabled: false
        }],
        inputCarouselMultipleValue: [{
          value: [0, 2, 4],
          disabled: false
        }],
        inputCarouselDisabledMultipleValue: [{
          value: [0, 2, 4],
          disabled: true
        }],
        inputCarouselSmall: [{
          value: [3],
          disabled: false
        }],
        inputCarouselLarge: [{
          value: [3],
          disabled: false
        }],
        inputCarouselCustom: [{
          value: [3],
          disabled: false
        }]
      }
    );
  }

  public isActive(slide: CarouselInputComponent, key: number): boolean {
    return Array.isArray(slide.value)
      ? slide.value!.indexOf(key) > -1
      : slide.value === key;
  }
}