import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT, WINDOW } from 'ngx-sfc-common';
import { tap, switchMap, first, Observable, Subscription, of, filter, merge } from 'rxjs';
import { CarouselProperty, CarouselState } from '../../carousel.enum';
import { CarouselService } from '../carousel/carousel.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselAutoplayService implements OnDestroy {

  private autoplaySubscription!: Subscription;

  private timeout: number = 0;

  private paused = false;

  private isArtificialAutoplayTimeout: boolean = false;

  private _isAutoplayStopped = false;
  get isAutoplayStopped() {
    return this._isAutoplayStopped;
  }
  set isAutoplayStopped(value) {
    this._isAutoplayStopped = value;
  }

  private winRef: Window;
  private docRef: Document;

  constructor(private carouselService: CarouselService,
    @Inject(WINDOW) winRef: any,
    @Inject(DOCUMENT) docRef: any,
  ) {
    this.winRef = winRef as Window;
    this.docRef = docRef as Document;
    this.initDataStreams();
  }

  ngOnDestroy() {
    this.autoplaySubscription.unsubscribe();
  }

  play() {
    if (this.paused) {
      this.paused = false;
      this.setAutoPlayInterval(this.carouselService.settings.autoplayMouseleaveTimeout);
    }

    if (this.carouselService.is(CarouselState.Rotating))
      return;

    this.carouselService.enter(CarouselState.Rotating);

    this.setAutoPlayInterval();
  };

  stop() {
    if (!this.carouselService.is(CarouselState.Rotating)) {
      return;
    }
    this.paused = true;

    this.winRef.clearTimeout(this.timeout);
    this.carouselService.leave(CarouselState.Rotating);
  };

  pause() {
    if (!this.carouselService.is(CarouselState.Rotating))
      return;

    this.paused = true;
  };

  startPausing() {
    if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is(CarouselState.Rotating)) {
      this.pause();
    }
  }

  startPlayingMouseLeave() {
    if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is(CarouselState.Rotating)) {
      this.play();
      this.playAfterTranslated();
    }
  }

  private initDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.initializedState.pipe(
      tap(() => {
        if (this.carouselService.settings.autoplay) {
          this.play();
        }
      })
    );

    const changedSettings$: Observable<any> = this.carouselService.changedState.pipe(
      tap(data => {
        this.handleChangeObservable(data);
      })
    );

    const resized$: Observable<any> = this.carouselService.resizedState.pipe(
      tap(() => {
        if (this.carouselService.settings.autoplay)
          this.play();
        else
          this.stop();
      })
    )

    this.autoplaySubscription = merge(initializedCarousel$, changedSettings$, resized$).subscribe();
  }

  private getNextTimeout(timeout?: number, speed?: number): number {
    if (this.timeout)
      this.winRef.clearTimeout(this.timeout);

    this.isArtificialAutoplayTimeout = timeout ? true : false;

    return this.winRef.setTimeout(() => {
      if (this.paused || this.carouselService.is(CarouselState.Busy) || this.carouselService.is(CarouselState.Interacting) || this.docRef.hidden)
        return;
      this.carouselService.next(speed || this.carouselService.settings.autoplaySpeed || 0);
    }, timeout || this.carouselService.settings.autoplayTimeout);
  };

  private setAutoPlayInterval(timeout?: number) {
    this.timeout = this.getNextTimeout(timeout);
  };

  private handleChangeObservable(data: any) {
    if (data.property.name === CarouselProperty.Settings) {
      if (this.carouselService.settings.autoplay) {
        this.play();
      } else {
        this.stop();
      }
    } else if (data.property.name === CarouselProperty.Position) {
      if (this.carouselService.settings.autoplay) {
        this.setAutoPlayInterval();
      }
    }
  }

  private playAfterTranslated() {
    of('translated').pipe(
      switchMap(() => this.carouselService.translatedState),
      first(),
      filter(() => this.isArtificialAutoplayTimeout),
      tap(() => this.setAutoPlayInterval())
    ).subscribe(() => { });
  }
}
