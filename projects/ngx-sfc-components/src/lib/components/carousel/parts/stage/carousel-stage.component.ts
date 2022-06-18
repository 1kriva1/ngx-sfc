import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { getCssLikeValue } from 'ngx-sfc-common';
import { CarouselSlideModel } from '../../models/slide.model';
import { CarouselAnimateService } from '../../service/animate/carousel-animate.service';
import { CarouselService } from '../../service/carousel/carousel.service';
import { CarouselStageModel } from './carousel-stage.model';

@Component({
  selector: 'sfc-carousel-stage',
  templateUrl: './carousel-stage.component.html',
  styleUrls: ['./carousel-stage.component.scss'],
  animations: [
    trigger('autoHeight', [
      state('nulled', style({ height: 0 })),
      state('full', style({ height: '*' })),
      transition('full => nulled', [
        animate('700ms 350ms')
      ]),
      transition('nulled => full', [
        animate(350)
      ]),
    ])
  ]
})
export class CarouselStageComponent {

  @Input()
  stageModel: CarouselStageModel = {
    width: 0,
    paddingL: 0,
    paddingR: 0,
    transform: CommonConstants.EMPTY_STRING,
    transition: CommonConstants.EMPTY_STRING
  };

  @Input()
  slidesModel: CarouselSlideModel[] = [];

  get styles() {
    return {
      width: getCssLikeValue(this.stageModel.width as number),
      transform: this.stageModel.transform,
      transition: this.stageModel.transition,
      paddingLeft: getCssLikeValue(this.stageModel.paddingL as number),
      paddingRight: getCssLikeValue(this.stageModel.paddingR as number)
    }
  }

  constructor(private carouselService: CarouselService, private animateService: CarouselAnimateService) { }

  getItemStyles(slide: CarouselSlideModel) {
    return {
      width: getCssLikeValue(slide.width as number),
      marginLeft: getCssLikeValue(slide.marginL as number),
      marginRight: getCssLikeValue(slide.marginR as number),
      left: getCssLikeValue(slide.left as number)
    }
  }

  onTransitionEnd() {
    this.carouselService.onTransitionEnd();
  }

  clear(id: string) {
    this.animateService.clear(id);
  }

  preparePublicSlide = (slide: CarouselSlideModel): CarouselSlideModel => {
    const newSlide = { ...slide };
    newSlide.tplRef = null;
    return newSlide;
  }
}
