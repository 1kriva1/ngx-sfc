import { Injectable, OnDestroy } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { tap, filter, merge, Observable, Subscription } from 'rxjs';
import { CarouselProperty } from '../../carousel.enum';
import { CarouselSlideDirective } from '../../directive/carousel-slide.directive';
import { CarouselNavigationDotsModel, CarouselNavigationModel } from '../../models/navigation.model';
import { CarouselOptionsModel } from '../../models/options.model';
import { CarouselService } from '../carousel/carousel.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselNavigationService implements OnDestroy {

  private navSubscription!: Subscription;

  private pages: any[] = [];

  private navigationModel: CarouselNavigationModel = {
    disabled: false,
    previous: {
      disabled: false,
      label: CommonConstants.EMPTY_STRING
    },
    next: {
      disabled: false,
      label: CommonConstants.EMPTY_STRING
    }
  };

  private navigationDotsModel: CarouselNavigationDotsModel = {
    disabled: false,
    dots: []
  };

  constructor(private carouselService: CarouselService) {
    this.initDataStreams();
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

  next(speed: number | boolean) {
    this.carouselService.to(this.getPosition(true), speed);
  };

  previous(speed: number | boolean) {
    this.carouselService.to(this.getPosition(false), speed);
  };

  to(position: number, speed: number | boolean, standard?: boolean) {
    let length: number;
    if (!standard && this.pages.length) {
      length = this.pages.length;
      this.carouselService.to(this.pages[((position % length) + length) % length].start, speed);
    } else {
      this.carouselService.to(position, speed);
    }
  };

  moveByDot(dotId: string) {
    const index: number = this.navigationDotsModel.dots.findIndex(dot => dotId === dot.id);
    this.to(index, this.carouselService.settings.dotsSpeed || 0);
  }

  toSlideById(id: string) {
    const position = this.carouselService.slidesModel.findIndex(slide => slide.id === id && slide.isCloned === false);

    if (position === -1 || position === this.carouselService.current())
      return;

    this.carouselService.to(this.carouselService.relative(position), false);
  }

  private initDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.initializedState.pipe(
      tap(() => {
        this.initialize();
        this.updateNavPages();
        this.draw();
        this.update();
        this.carouselService.sendChanges();
      })
    );

    const changedSettings$: Observable<any> = this.carouselService.changedState.pipe(
      filter(data => data.property.name === CarouselProperty.Position),
      tap(() => this.update())
    );

    const refreshedCarousel$: Observable<string> = this.carouselService.refreshedState.pipe(
      tap(() => {
        this.updateNavPages();
        this.draw();
        this.update();
        this.carouselService.sendChanges();
      })
    );

    this.navSubscription = merge(initializedCarousel$, changedSettings$, refreshedCarousel$).subscribe();
  }

  private initialize() {
    this.navigationModel.disabled = true;
    if (this.carouselService.settings.navText) {
      this.navigationModel.previous.label = this.carouselService.settings.navText[0];
      this.navigationModel.next.label = this.carouselService.settings.navText[1];
    }

    this.navigationDotsModel.disabled = true;

    this.carouselService.navigationModel = this.navigationModel;
    this.carouselService.navigationDotsModel = this.navigationDotsModel;
  }

  private updateNavPages() {
    let i: number, j: number, k: number;
    const lower: number = this.carouselService.clones().length / 2,
      upper: number = lower + this.carouselService.items().length,
      maximum: number = this.carouselService.maximum(true),
      pages: any[] = [],
      settings: CarouselOptionsModel = this.carouselService.settings;
    let size = settings.center || settings.autoWidth || settings.navigationDotsModel
      ? 1 : settings.dotsEach || settings.items;
    size = +(size as number);
    if (settings.slideBy !== 'page') {
      settings.slideBy = Math.min(+(settings.slideBy as number), settings.items || 0);
    }

    if (settings.dots || settings.slideBy === 'page') {

      for (i = lower, j = 0, k = 0; i < upper; i++) {
        if (j >= size || j === 0) {
          pages.push({
            start: Math.min(maximum, i - lower),
            end: i - lower + size - 1
          });
          if (Math.min(maximum, i - lower) === maximum) {
            break;
          }
          j = 0, ++k;
        }
        j += this.carouselService.mergers(this.carouselService.relative(i)) as number;
      }
    }
    this.pages = pages;
  }

  private draw() {
    let difference: number;
    const settings: CarouselOptionsModel = this.carouselService.settings,
      items: CarouselSlideDirective[] = this.carouselService.items(),
      disabled = items.length <= (settings.items || 0);

    this.navigationModel.disabled = !settings.nav || disabled;
    this.navigationDotsModel.disabled = !settings.dots || disabled;

    if (settings.dots) {
      difference = this.pages.length - this.navigationDotsModel.dots.length;

      if (settings.navigationDotsModel && difference !== 0) {
        this.navigationDotsModel.dots = [];
        items.forEach(item => {
          this.navigationDotsModel.dots.push({
            active: false,
            id: `dot-${item.id}`
          });
        });
      } else if (difference > 0) {
        const startI: number = this.navigationDotsModel.dots.length > 0 ? this.navigationDotsModel.dots.length : 0;
        for (let i = 0; i < difference; i++) {
          this.navigationDotsModel.dots.push({
            active: false,
            id: `dot-${i + startI}`
          });
        }
      } else if (difference < 0) {
        this.navigationDotsModel.dots.splice(difference, Math.abs(difference))
      }
    }

    this.carouselService.navigationModel = this.navigationModel;
    this.carouselService.navigationDotsModel = this.navigationDotsModel;
  };

  private update() {
    this.updateNavButtons();
    this.updateDots();
  }

  private updateNavButtons() {
    const settings: CarouselOptionsModel = this.carouselService.settings,
      loop: boolean = settings.loop || settings.rewind || false,
      index: number = this.carouselService.relative(this.carouselService.current() || 0);

    if (settings.nav) {
      this.navigationModel.previous.disabled = !loop && index <= this.carouselService.minimum(true);
      this.navigationModel.next.disabled = !loop && index >= this.carouselService.maximum(true);
    }

    this.carouselService.navigationModel = this.navigationModel;
  }

  private updateDots() {
    let curActiveDotI: number;

    if (!this.carouselService.settings.dots)
      return;

    this.navigationDotsModel.dots.forEach(item => {
      if (item.active === true) {
        item.active = false;
      }
    })

    curActiveDotI = this.getCurrent();
    if (this.navigationDotsModel.dots.length) {
      this.navigationDotsModel.dots[curActiveDotI].active = true;
    }
    this.carouselService.navigationDotsModel = this.navigationDotsModel;
  }

  private getCurrent(): any {
    const current: number = this.carouselService.relative(this.carouselService.current() || 0);
    let finalCurrent: number;
    const pages: any = this.pages.filter((page, index) => {
      return page.start <= current && page.end >= current;
    }).pop();

    finalCurrent = this.pages.findIndex(page => {
      return page.start === pages.start && page.end === pages.end;
    });

    return finalCurrent;
  };

  private getPosition(successor: number | boolean): number {
    let position: number, length: number;
    const settings: CarouselOptionsModel = this.carouselService.settings;

    if (settings.slideBy === 'page') {
      position = this.getCurrent();
      length = this.pages.length;
      successor ? ++position : --position;
      position = this.pages[((position % length) + length) % length].start;
    } else {
      position = this.carouselService.relative(this.carouselService.current() || 0);
      length = this.carouselService.items().length;
      successor ? position += +(settings.slideBy as number) : position -= +(settings.slideBy as number);
    }

    return position;
  };
}
