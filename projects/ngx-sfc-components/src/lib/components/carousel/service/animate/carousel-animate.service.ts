import { Injectable, OnDestroy } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { getCssLikeValue } from 'ngx-sfc-common';
import { tap, Observable, Subscription, merge } from 'rxjs';
import { CarouselProperty } from '../../carousel.enum';
import { CarouselService } from '../carousel/carousel.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselAnimateService implements OnDestroy {

  private swapping = true;

  private previous?: number;

  private next = undefined;

  private animateSubscription!: Subscription;

  constructor(private carouselService: CarouselService) {
    this.initDataStreams();
  }

  ngOnDestroy() {
    this.animateSubscription.unsubscribe();
  }

  private initDataStreams() {
    const changeSettings$: Observable<any> = this.carouselService.changeState.pipe(
      tap(data => {
        if (data.property.name === CarouselProperty.Position) {
          this.previous = this.carouselService.current();
          this.next = data.property.value;
        }
      })
    );

    const translateCarousel$: Observable<string> = this.carouselService.translateState.pipe(
      tap(() => {
        if (this.swapping && (this.carouselService.options.animateOut || this.carouselService.options.animateIn)) {
          this.swap();
        }
      })
    );

    this.animateSubscription = merge(changeSettings$, translateCarousel$).subscribe();
  }

  private swap(): void {
    if (this.carouselService.settings.items !== 1)
      return;

    this.carouselService.speed(0);

    let left: number;
    const previous = this.carouselService.slidesModel[this.previous || 0],
      next = this.carouselService.slidesModel[this.next || 0],
      incoming = this.carouselService.settings.animateIn,
      outgoing = this.carouselService.settings.animateOut;

    if (this.carouselService.current() === this.previous)
      return;

    if (outgoing) {
      left = +this.carouselService.coordinates(this.previous) - +this.carouselService.coordinates(this.next);
      this.carouselService.slidesModel.forEach(slide => {
        if (slide.id === previous.id) {
          slide.left = getCssLikeValue(left);
          slide.isAnimated = true;
          slide.isDefAnimatedOut = true;
          slide.isCustomAnimatedOut = true;
        }
      });
    }

    if (incoming) {
      this.carouselService.slidesModel.forEach(slide => {
        if (slide.id === next.id) {
          slide.isAnimated = true;
          slide.isDefAnimatedIn = true;
          slide.isCustomAnimatedIn = true;
        }
      });
    }
  };

  clear(id: string) {
    this.carouselService.slidesModel.forEach(slide => {
      if (slide.id === id) {
        slide.left = CommonConstants.EMPTY_STRING;
        slide.isAnimated = false;
        slide.isDefAnimatedOut = false;
        slide.isCustomAnimatedOut = false;
        slide.isDefAnimatedIn = false;
        slide.isCustomAnimatedIn = false;
        slide.classes = this.carouselService.setCurrentSlideClasses(slide);
      }
    });
    this.carouselService.onTransitionEnd();
  };
}
