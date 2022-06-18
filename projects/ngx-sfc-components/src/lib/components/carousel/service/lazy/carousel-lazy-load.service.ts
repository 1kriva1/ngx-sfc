import { Injectable, OnDestroy } from '@angular/core';
import { tap, merge, Observable, Subscription } from 'rxjs';
import { CarouselEventType, CarouselProperty } from '../../carousel.enum';
import { CarouselService } from '../carousel/carousel.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselLazyLoadService implements OnDestroy {

  private lazyLoadSubscription!: Subscription;

  constructor(private carouselService: CarouselService) {
    this.initDataStreams();
  }

  ngOnDestroy() {
    this.lazyLoadSubscription.unsubscribe();
  }

  private initDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.initializedState.pipe(
      tap(() => {
        const isLazyLoad = this.carouselService.settings && !this.carouselService.settings.lazyLoad;
        this.carouselService.slidesModel.forEach(item => item.load = isLazyLoad ? true : false);
      })
    );

    const changeSettings$: Observable<any> = this.carouselService.changeState;

    const resizedCarousel$: Observable<string> = this.carouselService.resizedState;

    this.lazyLoadSubscription = merge(initializedCarousel$, changeSettings$, resizedCarousel$).pipe(
      tap(data => this.defineLazyLoadSlides(data))
    ).subscribe();
  }

  private defineLazyLoadSlides(data: any) {
    if (!this.carouselService.settings || !this.carouselService.settings.lazyLoad)
      return;

    if ((data.property && data.property.name === CarouselProperty.Position) || data === CarouselEventType.Initialized || data === CarouselEventType.Resized) {
      const settings = this.carouselService.settings,
        clones = this.carouselService.clones().length;
      let n = (settings.center && Math.ceil((settings.items || 0) / 2) || settings.items) || 0,
        i = ((settings.center && n * -1) || 0),
        position = (data.property && data.property.value !== undefined ? data.property.value : this.carouselService.current()) + i;
      if ((settings.lazyLoadEager || 0) > 0) {
        n += settings.lazyLoadEager || 0;
        if (settings.loop) {
          position -= settings.lazyLoadEager || 0;
          n++;
        }
      }

      while (i++ < n) {
        this.load(clones / 2 + this.carouselService.relative(position));
        if (clones) {
          this.carouselService.clones(this.carouselService.relative(position)).forEach(value => this.load(value));

        }
        position++;
      }
    }
  }

  private load(position: number) {
    if (this.carouselService.slidesModel[position].load)
      return;

    this.carouselService.slidesModel[position].load = true;
  }
}
