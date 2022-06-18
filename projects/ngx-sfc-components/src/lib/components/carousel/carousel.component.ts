import {
  AfterContentInit, ChangeDetectorRef,
  Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, OnDestroy, OnInit, Output, QueryList
} from '@angular/core';
import { any, UIClass } from 'ngx-sfc-common';
import { DOCUMENT, ResizeService } from 'ngx-sfc-common';
import { switchMap, delay, tap, Observable, Subscription, filter, skip, take, map, from, of, toArray, merge } from 'rxjs';
import { CarouselProperty } from './carousel.enum';
import { CarouselSlideDirective } from './directive/carousel-slide.directive';
import { CarouselDOMModel } from './models/dom.model';
import { CarouselNavigationDotsModel, CarouselNavigationModel } from './models/navigation.model';
import { CarouselOptionsModel } from './models/options.model';
import { CarouselSlideModel, CarouselSlideEvent } from './models/slide.model';
import { CarouselStageModel } from './parts/stage/carousel-stage.model';
import { CarouselAnimateService } from './service/animate/carousel-animate.service';
import { CarouselAutoplayService } from './service/autoplay/carousel-autoplay.service';
import { CarouselServiceConstants } from './service/carousel/carousel-service.constants';
import { CarouselService } from './service/carousel/carousel.service';
import { CarouselLazyLoadService } from './service/lazy/carousel-lazy-load.service';
import { CarouselNavigationService } from './service/navigation/carousel-navigation.service';

@Component({
  selector: 'sfc-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [
    CarouselNavigationService,
    CarouselAutoplayService,
    CarouselService,
    CarouselAnimateService,
    CarouselLazyLoadService
  ]
})
export class CarouselComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input()
  options!: CarouselOptionsModel;

  @Output()
  translated = new EventEmitter<CarouselSlideEvent>();

  @Output()
  initialized = new EventEmitter<CarouselSlideEvent>();

  @Output()
  changing = new EventEmitter<CarouselSlideEvent>();

  @Output()
  changed = new EventEmitter<CarouselSlideEvent>();

  @ContentChildren(CarouselSlideDirective)
  slides!: QueryList<CarouselSlideDirective>;

  // SUBSCRIPTIONS

  private resizeSubscription!: Subscription;

  private carouselSubscription!: Subscription;

  private slidesChangesSubscription!: Subscription;

  // END SUBSCRIPTIONS

  // MODELS

  carouselDOMModel!: CarouselDOMModel;

  stageModel!: CarouselStageModel;

  slidesModel: CarouselSlideModel[] = [];

  navigationModel!: CarouselNavigationModel;

  navigationDotsModel!: CarouselNavigationDotsModel;

  // END MODELS

  slideEvent!: CarouselSlideEvent;

  carouselLoaded = false;

  @HostBinding('class.rtl')
  get rtl(): boolean {
    return this.carouselDOMModel?.rtl || false;
  }

  get clientWidth(): number {
    return this.el.nativeElement.querySelector('.container').clientWidth;
  }

  private carouselWindowWidth: number = 0;

  private documentRef: Document;

  constructor(
    private el: ElementRef,
    private resizeService: ResizeService,
    private carouselService: CarouselService,
    private navigationService: CarouselNavigationService,
    private autoplayService: CarouselAutoplayService,
    private lazyLoadService: CarouselLazyLoadService,
    private animateService: CarouselAnimateService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) documentRef: any
  ) {
    this.documentRef = documentRef as Document;
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange() {
    if (this.carouselService.settings.autoplay) {
      switch (this.documentRef.visibilityState) {
        case UIClass.Visible:
          if (!this.autoplayService.isAutoplayStopped)
            this.autoplayService.play();
          break;
        case UIClass.Hidden:
          this.autoplayService.pause();
          break;
      }
    }
  };

  ngOnInit() {
    this.carouselWindowWidth = this.clientWidth;
    this.initDataStreams();
  }

  ngAfterContentInit() {
    if (any(this.slides.toArray())) {
      this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
      this.carouselService.initialize(this.slides.toArray());

      this.initResizeWatcher();
    }

    this.slidesChangesSubscription = this.slides.changes.pipe(
      tap((slides) => {
        if (any(slides)) {
          this.carouselService.setup(this.carouselWindowWidth, slides.toArray(), this.options);
          this.carouselService.initialize(slides.toArray());
        } else {
          this.carouselLoaded = false;
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.resizeSubscription)
      this.resizeSubscription.unsubscribe();

    if (this.slidesChangesSubscription)
      this.slidesChangesSubscription.unsubscribe();

    if (this.carouselSubscription)
      this.carouselSubscription.unsubscribe();
  }

  initDataStreams() {
    const _viewCurSettings$ = this.carouselService.viewCurrrentSettings.pipe(
      tap(data => {
        this.carouselDOMModel = data.carouselDOMModel;
        this.stageModel = data.stageModel;
        this.slidesModel = data.slidesModel;
        if (!this.carouselLoaded) {
          this.carouselLoaded = true;
        }
        this.navigationModel = data.navigationModel;
        this.navigationDotsModel = data.navigationDotsModel;
        this.changeDetectorRef.markForCheck();
      })
    );

    const _initializedCarousel$ = this.carouselService.initializedState.pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.initialized.emit(this.slideEvent);
      })
    )

    const _translatedCarousel$ = this.carouselService.translatedState.pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.translated.emit(this.slideEvent);
      })
    );

    const _changeCarousel$ = this.carouselService.changeState.pipe(
      tap(() => {
        this.gatherTranslatedData();
        this.changing.emit(this.slideEvent);
      })
    );

    const _changedCarousel$ = this.carouselService.changeState.pipe(
      switchMap(value => {
        const changedPosition: Observable<CarouselSlideEvent> = of(value).pipe(
          filter(() => value.property.name === CarouselProperty.Position),
          switchMap(() => from(this.slidesModel)),
          skip(value.property.value),
          take(this.carouselService.settings.items || 0),
          map(slide => {
            const id = slide.id.indexOf(CarouselServiceConstants.CLONE_ID_PREFIX) >= 0 ? slide.id.slice(CarouselServiceConstants.CLONE_ID_PREFIX.length) : slide.id;
            return { ...slide, id: id, isActive: true };
          }),
          toArray(),
          map(slides => {
            return {
              slides: slides,
              startPosition: this.carouselService.relative(value.property.value)
            }
          })
        );

        return merge(changedPosition);
      }),
      tap(slidesData => {
        this.gatherTranslatedData();
        this.changed.emit(slidesData.slides?.length ? slidesData : this.slideEvent);
      })
    );

    this.carouselSubscription = merge(
      _viewCurSettings$,
      _translatedCarousel$,
      _changeCarousel$,
      _changedCarousel$,
      _initializedCarousel$
    ).subscribe();
  }

  private initResizeWatcher() {
    if (Object.keys(this.carouselService.options.responsive || {}).length) {
      this.resizeSubscription = this.resizeService.onResize$
        .pipe(
          filter(() => this.carouselWindowWidth !== this.clientWidth),
          delay(this.carouselService.settings.responsiveRefreshRate || 0)
        ).subscribe(() => {
          this.carouselService.onResize(this.clientWidth);
          this.carouselWindowWidth = this.clientWidth;
        });
    }
  }

  onTransitionEnd() {
    this.carouselService.onTransitionEnd();
  }

  next() {
    if (this.carouselLoaded)
      this.navigationService.next(this.carouselService.settings.navSpeed || false);
  }

  previous() {
    if (this.carouselLoaded)
      this.navigationService.previous(this.carouselService.settings.navSpeed || false);
  }

  moveByDot(dotId: string) {
    if (this.carouselLoaded)
      this.navigationService.moveByDot(dotId);
  }

  pause() {
    this.autoplayService.startPausing();
  }

  play() {
    this.autoplayService.startPlayingMouseLeave();
  }

  stopAutoplay() {
    this.autoplayService.isAutoplayStopped = true;
    this.autoplayService.stop();
  }

  startAutoplay() {
    this.autoplayService.isAutoplayStopped = false;
    this.autoplayService.play();
  }

  private gatherTranslatedData() {
    let startPosition: number;
    const activeSlides: CarouselSlideModel[] = this.slidesModel
      .filter(slide => slide.isActive === true)
      .map(slide => {
        return {
          id: slide.id.indexOf(CarouselServiceConstants.CLONE_ID_PREFIX) >= 0 ? slide.id.slice(CarouselServiceConstants.CLONE_ID_PREFIX.length) : slide.id,
          width: slide.width,
          marginL: slide.marginL,
          marginR: slide.marginR,
          center: slide.isCentered,
          tplRef: null,
          classes: {}
        }
      });
    startPosition = this.carouselService.relative(this.carouselService.current() || 0);
    this.slideEvent = {
      startPosition: startPosition,
      slides: activeSlides
    }
  }
}
