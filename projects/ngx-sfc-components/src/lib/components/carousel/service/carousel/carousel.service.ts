import { Injectable } from '@angular/core';
import { CommonConstants, isNumeric } from 'ngx-sfc-common';
import { Observable, Subject } from 'rxjs';
import { CarouselEventType, CarouselProperty, CarouselState } from '../../carousel.enum';
import { CarouselSlideDirective } from '../../directive/carousel-slide.directive';
import { CarouselDOMModel } from '../../models/dom.model';
import { CarouselNavigationDotsModel, CarouselNavigationModel } from '../../models/navigation.model';
import { CarouselOptionsModel } from '../../models/options.model';
import { CarouselSlideModel } from '../../models/slide.model';
import { CarouselStageModel } from '../../parts/stage/carousel-stage.model';
import { CarouselServiceConstants } from './carousel-service.constants';
import { Width } from './carousel-service.enum';
import { CarouselCurrentData, States } from './carousel-service.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private _viewSettingsShipper$ = new Subject<CarouselCurrentData>();

  private _initializedCarousel$ = new Subject<string>();

  private _changeSettingsCarousel$ = new Subject<any>();

  private _changedSettingsCarousel$ = new Subject<any>();

  private _translateCarousel$ = new Subject<string>();

  private _translatedCarousel$ = new Subject<string>();

  private _resizeCarousel$ = new Subject<string>();

  private _resizedCarousel$ = new Subject<string>();

  private _refreshCarousel$ = new Subject<string>();

  private _refreshedCarousel$ = new Subject<string>();

  private carouselDOMModel: CarouselDOMModel = {
    rtl: false,
    isResponsive: false,
    isRefreshed: false,
    isLoaded: false,
    isLoading: false
  };

  private stageModel: CarouselStageModel = {
    transform: 'translate3d(0px,0px,0px)',
    transition: '0s',
    width: 0,
    paddingL: 0,
    paddingR: 0
  };

  private _width!: number;

  private _items: CarouselSlideDirective[] = [];

  private _widths: any[] = [];

  private _supress: any = {};

  private _current: number | null = null;

  private _clones: any[] = [];

  private _mergers: any[] = [];

  private _speed: number | null = null;

  private _coordinates: number[] = [];

  private _invalidated: any = {};

  private _states: States = {
    current: {},
    tags: {
      initializing: [CarouselState.Busy],
      animating: [CarouselState.Busy]
    }
  };

  private _pipe: any[] = [
    {
      filter: [CarouselProperty.Width, CarouselProperty.Items, CarouselProperty.Settings],
      run: (cache: any) => {
        cache.current = this._items && this._items[this.relative(this._current || 0)].id;
      }
    },
    {
      filter: [CarouselProperty.Width, CarouselProperty.Items, CarouselProperty.Settings],
      run: (cache: any) => {
        const margin = this.settings.margin || CommonConstants.EMPTY_STRING,
          grid = !this.settings.autoWidth,
          rtl = this.settings.rtl,
          css = {
            'margin-left': rtl ? margin : CommonConstants.EMPTY_STRING,
            'margin-right': rtl ? CommonConstants.EMPTY_STRING : margin
          };

        if (!grid) {
          this.slidesModel.forEach(slide => {
            slide.marginL = css['margin-left'];
            slide.marginR = css['margin-right'];
          });
        }

        cache.css = css;
      }
    }, {
      filter: [CarouselProperty.Width, CarouselProperty.Items, CarouselProperty.Settings],
      run: (cache: any) => {
        const width: any = +(this.width() / (this.settings.items || 0)).toFixed(3) - (this.settings.margin || 0),
          grid = !this.settings.autoWidth,
          widths = [];
        let merge = null,
          iterator = this._items.length;

        cache.items = {
          merge: false,
          width: width
        };

        while (iterator--) {
          merge = this._mergers[iterator];
          merge = this.settings.mergeFit && Math.min(merge, (this.settings.items || 0)) || merge;
          cache.items.merge = merge > 1 || cache.items.merge;

          widths[iterator] = !grid ? this._items[iterator].width ? this._items[iterator].width : width : width * merge;
        }

        this._widths = widths;

        this.slidesModel.forEach((slide, i) => {
          slide.width = this._widths[i];
          slide.marginR = cache.css['margin-right'];
          slide.marginL = cache.css['margin-left'];
        });
      }
    }, {
      filter: [CarouselProperty.Items, CarouselProperty.Settings],
      run: () => {
        const clones: any[] = [],
          items: CarouselSlideDirective[] = this._items,
          settings: any = this.settings,
          view = Math.max(settings.items * 2, 4),
          size = Math.ceil(items.length / 2) * 2;
        let append: any[] = [],
          prepend: any[] = [],
          repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0;

        repeat /= 2;

        while (repeat--) {
          clones.push(this.normalize(clones.length / 2, true));
          append.push({ ...this.slidesModel[clones[clones.length - 1]] });
          clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
          prepend.unshift({ ...this.slidesModel[clones[clones.length - 1]] });
        }

        this._clones = clones;

        append = append.map(slide => {
          slide.id = `${CarouselServiceConstants.CLONE_ID_PREFIX}${slide.id}`;
          slide.isActive = false;
          slide.isCloned = true;
          return slide;
        });

        prepend = prepend.map(slide => {
          slide.id = `${CarouselServiceConstants.CLONE_ID_PREFIX}${slide.id}`;
          slide.isActive = false;
          slide.isCloned = true;
          return slide;
        });

        this.slidesModel = prepend.concat(this.slidesModel).concat(append);
      }
    }, {
      filter: [CarouselProperty.Width, CarouselProperty.Items, CarouselProperty.Settings],
      run: () => {
        const rtl = this.settings.rtl ? 1 : -1,
          size = this._clones.length + this._items.length,
          coordinates = [];
        let iterator = -1,
          previous = 0,
          current = 0;

        while (++iterator < size) {
          previous = coordinates[iterator - 1] || 0;
          current = this._widths[this.relative(iterator)] + this.settings.margin;
          coordinates.push(previous + current * rtl);
        }

        this._coordinates = coordinates;
      }
    }, {
      filter: [CarouselProperty.Width, CarouselProperty.Items, CarouselProperty.Settings],
      run: () => {
        const padding = this.settings.stagePadding || 0,
          coordinates = this._coordinates,
          css = {
            'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
            'padding-left': padding || '',
            'padding-right': padding || ''
          };

        this.stageModel.width = css.width;
        this.stageModel.paddingR = css['padding-right'];
      }
    }, {
      filter: [CarouselProperty.Width, CarouselProperty.Items, CarouselProperty.Settings],
      run: (cache: any) => {
        let current = cache.current ? this.slidesModel.findIndex(slide => slide.id === cache.current) : 0;
        current = Math.max(this.minimum(), Math.min(this.maximum(), current));
        this.reset(current);
      }
    }, {
      filter: [CarouselProperty.Position],
      run: () => {
        this.animate(this.coordinates(this._current));
      }
    }, {
      filter: [CarouselProperty.Width, CarouselProperty.Position, CarouselProperty.Items, CarouselProperty.Settings],
      run: () => {
        const rtl = this.settings.rtl ? 1 : -1,
          padding = (this.settings.stagePadding || 0) * 2,
          matches = [];
        let begin: any, end, inner, outer, i, n;

        begin = this.coordinates(this.current());
        if (typeof begin === 'number') {
          begin += padding;
        } else {
          begin = 0;
        }

        end = begin + this.width() * rtl;

        if (rtl === -1 && this.settings.center) {
          const result = this._coordinates.filter(element => {
            return (this.settings.items || 0) % 2 === 1 ? element >= begin : element > begin;
          });
          begin = result.length ? result[result.length - 1] : begin;
        }

        for (i = 0, n = this._coordinates.length; i < n; i++) {
          inner = Math.ceil(this._coordinates[i - 1] || 0);
          outer = Math.ceil(Math.abs(this._coordinates[i]) + padding * rtl);

          if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
            || (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
            matches.push(i);
          }
        }

        this.slidesModel.forEach(slide => {
          slide.isActive = false;
          return slide;
        });
        matches.forEach(item => {
          this.slidesModel[item].isActive = true;
        });

        if (this.settings.center) {
          this.slidesModel.forEach(slide => {
            slide.isCentered = false;
            return slide;
          });
          const currentValue = this.current();
          if (currentValue)
            this.slidesModel[currentValue].isCentered = true;
        }
      }
    }
  ];

  settings: CarouselOptionsModel = {
    items: 0
  };

  slidesModel!: CarouselSlideModel[];

  navigationModel!: CarouselNavigationModel;

  navigationDotsModel!: CarouselNavigationDotsModel;

  options: CarouselOptionsModel = {};

  get viewCurrrentSettings(): Observable<CarouselCurrentData> {
    return this._viewSettingsShipper$.asObservable();
  }

  get initializedState(): Observable<string> {
    return this._initializedCarousel$.asObservable()
  }

  get changeState(): Observable<any> {
    return this._changeSettingsCarousel$.asObservable();
  }

  get changedState(): Observable<any> {
    return this._changedSettingsCarousel$.asObservable();
  }

  get translateState(): Observable<string> {
    return this._translateCarousel$.asObservable();
  }

  get translatedState(): Observable<string> {
    return this._translatedCarousel$.asObservable();
  }

  get resizeState(): Observable<string> {
    return this._resizeCarousel$.asObservable();
  }

  get resizedState(): Observable<string> {
    return this._resizedCarousel$.asObservable();
  }

  get refreshState(): Observable<string> {
    return this._refreshCarousel$.asObservable();
  }

  get refreshedState(): Observable<string> {
    return this._refreshedCarousel$.asObservable();
  }

  setup(carouselWidth: number, slides: CarouselSlideDirective[], options: CarouselOptionsModel) {
    this.setCarouselWidth(carouselWidth);
    this.setItems(slides);
    this.defineSlidesData();
    this.setOptions(options);

    this.settings = { ...this.options };

    this.setOptionsForViewport();

    this.trigger(CarouselEventType.Change, { property: { name: CarouselProperty.Settings, value: this.settings } });
    this.invalidate(CarouselProperty.Settings);
    this.trigger(CarouselEventType.Changed, { property: { name: CarouselProperty.Settings, value: this.settings } });
  }

  initialize(slides: CarouselSlideDirective[]) {
    this.enter(CarouselEventType.Initializing);

    this.carouselDOMModel.rtl = this.settings.rtl || false;

    if (this._mergers.length) {
      this._mergers = [];
    }

    slides.forEach(item => {
      const mergeN: number = this.settings.merge ? item.dataMerge : 1;
      this._mergers.push(mergeN);
    });
    this._clones = [];

    this.reset(isNumeric(this.settings.startPosition) ? +(this.settings.startPosition || 0) : 0);

    this.invalidate(CarouselProperty.Items);
    this.refresh();

    this.carouselDOMModel.isLoaded = true;

    this.sendChanges();

    this.leave(CarouselEventType.Initializing);
    this.trigger(CarouselEventType.Initialized);
  };

  sendChanges() {
    this._viewSettingsShipper$.next({
      carouselDOMModel: this.carouselDOMModel,
      stageModel: this.stageModel,
      slidesModel: this.slidesModel,
      navigationModel: this.navigationModel,
      navigationDotsModel: this.navigationDotsModel
    });
  }

  onResize(curWidth: number) {
    if (this._items.length) {
      this.setCarouselWidth(curWidth);
      this.enter(CarouselEventType.Resizing);
      this.trigger(CarouselEventType.Resize);
      this.invalidate(CarouselProperty.Width);
      this.refresh();
      this.leave(CarouselEventType.Resizing);
      this.trigger(CarouselEventType.Resized);
    }
  }

  is(state: string): boolean {
    return (this._states.current as any)[state] && (this._states.current as any)[state] > 0;
  };

  current(position?: number): number | undefined {
    if (position === undefined) {
      return this._current as number;
    }

    if (this._items.length === 0) {
      return undefined;
    }

    position = this.normalize(position);

    if (this._current !== position) {
      this.trigger(CarouselEventType.Change, { property: { name: CarouselProperty.Position, value: position } });

      this._current = position;

      this.invalidate(CarouselProperty.Position);
      this.trigger(CarouselEventType.Changed, { property: { name: CarouselProperty.Position, value: this._current } });
    }

    return this._current;
  }

  relative(position: number): number {
    position -= this._clones.length / 2;
    return this.normalize(position, true);
  }

  maximum(relative: boolean = false): number {
    const settings = this.settings;
    let maximum = this._coordinates.length,
      iterator,
      reciprocalItemsWidth,
      elementWidth;

    if (settings.loop) {
      maximum = this._clones.length / 2 + this._items.length - 1;
    } else if (settings.autoWidth || settings.merge) {
      iterator = this._items.length;
      reciprocalItemsWidth = this.slidesModel[--iterator].width;
      elementWidth = this._width;
      while (iterator--) {
        reciprocalItemsWidth += +(this.slidesModel[iterator].width as string) + (this.settings.margin || 0).toString();
        if ((reciprocalItemsWidth as number) > elementWidth) {
          break;
        }
      }
      maximum = iterator + 1;
    } else if (settings.center) {
      maximum = this._items.length - 1;
    } else {
      maximum = this._items.length - (settings.items || 0);
    }

    if (relative) {
      maximum -= this._clones.length / 2;
    }

    return Math.max(maximum, 0);
  }

  minimum(relative: boolean = false): number {
    return relative ? 0 : this._clones.length / 2;
  }

  items(position?: number): CarouselSlideDirective[] {
    if (position === undefined) {
      return this._items.slice();
    }

    position = this.normalize(position, true);
    return [this._items[position]];
  }

  mergers(position: number): number | number[] {
    if (position === undefined) {
      return this._mergers.slice();
    }

    position = this.normalize(position, true);
    return this._mergers[position];
  }

  clones(position?: number): number[] {
    const odd = this._clones.length / 2,
      even = odd + this._items.length,
      map = (index: number) => index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;

    if (position === undefined) {
      return this._clones.map((v, i) => map(i));
    }

    return this._clones.map((v, i) => v === position ? map(i) : null).filter(item => item) as number[];
  }

  speed(speed?: number): number {
    if (speed !== undefined) {
      this._speed = speed;
    }

    return this._speed || 0;
  }

  coordinates(position: number | null | undefined): number | number[] {
    let multiplier = 1,
      newPosition = (position || 0) - 1,
      coordinate,
      result: number[];

    if (position === undefined) {
      result = this._coordinates.map((_, index) => {
        return this.coordinates(index) as number;
      });
      return result;
    }

    if (this.settings.center) {
      if (this.settings.rtl) {
        multiplier = -1;
        newPosition = (position || 0) + 1;
      }

      coordinate = this._coordinates[(position || 0)];
      coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
    } else {
      coordinate = this._coordinates[newPosition] || 0;
    }

    coordinate = Math.ceil(coordinate);

    return coordinate;
  }

  to(position: number, speed: number | boolean) {
    let current = this.current(),
      revert = null,
      distance = position - this.relative(current || 0),
      maximum = this.maximum(),
      delayForLoop = 0;
    const direction = +(distance > 0) - +(distance < 0),
      items = this._items.length,
      minimum = this.minimum();

    if (this.settings.loop) {
      if (!this.settings.rewind && Math.abs(distance) > items / 2) {
        distance += direction * -1 * items;
      }

      position = (current || 0) + distance;
      revert = ((position - minimum) % items + items) % items + minimum;

      if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
        current = revert - distance;
        position = revert;
        delayForLoop = 30;
        this.reset(current);
        this.sendChanges();
      }
    } else if (this.settings.rewind) {
      maximum += 1;
      position = (position % maximum + maximum) % maximum;
    } else {
      position = Math.max(minimum, Math.min(maximum, position));
    }

    setTimeout(() => {
      this.speed(this.duration(current || 0, position, speed));
      this.current(position);

      this.update();
    }, delayForLoop);
  }

  next(speed: number | boolean) {
    speed = speed || false;
    this.to(this.relative(this.current() || 0) + 1, speed);
  }

  previous(speed: number | boolean) {
    speed = speed || false;
    this.to(this.relative(this.current() || 0) - 1, speed);
  }

  onTransitionEnd(event?: any) {
    if (!event) {
      this.leave(CarouselEventType.Animating);
      this.trigger(CarouselEventType.Translated);
    }
  }

  setCurrentSlideClasses(slide: CarouselSlideModel): { [key: string]: boolean } {
    const currentClasses: { [key: string]: boolean } = {
      'active': slide.isActive || false,
      'center': slide.isCentered || false,
      'cloned': slide.isCloned || false,
      'animated': slide.isAnimated || false,
      'animated-in': slide.isDefAnimatedIn || false,
      'animated-out': slide.isDefAnimatedOut || false
    };
    if (this.settings.animateIn) {
      currentClasses[this.settings.animateIn as string] = slide.isCustomAnimatedIn || false;
    }
    if (this.settings.animateOut) {
      currentClasses[this.settings.animateOut as string] = slide.isCustomAnimatedOut || false;
    }
    return currentClasses;
  }

  enter(name: string) {
    [name].concat(this._states.tags[name] || []).forEach((stateName) => {
      if ((this._states.current as any)[stateName] === undefined) {
        (this._states.current as any)[stateName] = 0;
      }

      (this._states.current as any)[stateName]++;
    });
  };

  leave(name: string) {
    [name].concat(this._states.tags[name] || []).forEach((stateName) => {
      if ((this._states.current as any)[stateName] === 0 || !!(this._states.current as any)[stateName]) {
        (this._states.current as any)[stateName]--;
      }
    })
  };

  private setOptions(options: CarouselOptionsModel) {
    this.options = { ...CarouselServiceConstants.DEFAULT_OPTIONS, ...options };
  }

  private validateItems(items: number, skip_validateItems: boolean): number {
    let result: number = items;

    if (items > this._items.length && !skip_validateItems) {
      result = this._items.length;
    }

    return result;
  }

  private setCarouselWidth(width: number) {
    this._width = width;
  }

  private setOptionsForViewport() {
    const viewport = this._width,
      overwrites = this.options.responsive || {};
    let match = -1;

    if (!Object.keys(overwrites).length) {
      return;
    }

    if (!viewport) {
      this.settings.items = 1;
      return;
    }

    for (const key in overwrites) {
      if (overwrites.hasOwnProperty(key)) {
        if (+key <= viewport && +key > match) {
          match = Number(key);
        }
      }
    }

    this.settings = { ...this.options, ...overwrites[match], items: (overwrites[match] && overwrites[match].items) ? this.validateItems(overwrites[match].items || 0, this.options.skip_validateItems || false) : this.options.items };

    delete this.settings.responsive;
    this.carouselDOMModel.isResponsive = true;

    const mergers: any[] = [];
    this._items.forEach(item => {
      const mergeN: number = this.settings.merge ? item.dataMerge : 1;
      mergers.push(mergeN);
    });
    this._mergers = mergers;

    this.invalidate(CarouselProperty.Settings);
  }

  private optionsLogic() {
    if (this.settings.autoWidth) {
      this.settings.stagePadding = 0;
      this.settings.merge = false;
    }
  }

  private update() {
    let i = 0;
    const n = this._pipe.length,
      filter = (item: string | number) => this._invalidated[item],
      cache = {};

    while (i < n) {
      const filteredPipe = this._pipe[i].filter.filter(filter);
      if (this._invalidated.all || filteredPipe.length > 0) {
        this._pipe[i].run(cache);
      }
      i++;
    }
    this.slidesModel.forEach(slide => slide.classes = this.setCurrentSlideClasses(slide));
    this.sendChanges();

    this._invalidated = {};

    if (!this.is('valid')) {
      this.enter('valid');
    }
  }

  private width(dimension?: Width): number {
    dimension = dimension || Width.Default;
    switch (dimension) {
      case Width.Inner:
      case Width.Outer:
        return this._width;
      default:
        return this._width - (this.settings.stagePadding || 0) * 2 + (this.settings.margin || 0);
    }
  }

  private refresh() {
    this.enter(CarouselEventType.Refreshing);
    this.trigger(CarouselEventType.Refresh);
    this.defineSlidesData();
    this.setOptionsForViewport();
    this.optionsLogic();
    this.update();
    this.leave(CarouselEventType.Refreshing);
    this.trigger(CarouselEventType.Refreshed);
  }

  private animate(coordinate: number | number[]) {
    const animate = this.speed() > 0;

    if (this.is(CarouselEventType.Animating)) {
      this.onTransitionEnd();
    }

    if (animate) {
      this.enter(CarouselEventType.Animating);
      this.trigger(CarouselEventType.Translate);
    }

    this.stageModel.transform = 'translate3d(' + coordinate + 'px,0px,0px)';
    this.stageModel.transition = (this.speed() / 1000) + 's' + (
      this.settings.slideTransition ? ' ' + this.settings.slideTransition : ''
    );
  }

  private invalidate(part: string): string[] {
    if (typeof part === 'string') {
      this._invalidated[part] = true;
      if (this.is('valid')) { this.leave('valid'); }
    }
    return Object.keys(this._invalidated);
  };

  private reset(position: number) {
    position = this.normalize(position);

    if (position === undefined) {
      return;
    }

    this._speed = 0;
    this._current = position;

    this.suppress([CarouselEventType.Translate, CarouselEventType.Translated]);

    this.animate(this.coordinates(position));

    this.release([CarouselEventType.Translate, CarouselEventType.Translated]);
  }

  private normalize(position: number, relative?: boolean): number {
    const n = this._items.length,
      m = relative ? 0 : this._clones.length;

    if (!isNumeric(position) || n < 1) {
      position = 0;
    } else if (position < 0 || position >= n + m) {
      position = ((position - m / 2) % n + n) % n + m / 2;
    }

    return position;
  }

  private duration(from: number, to: number, factor?: number | boolean): number {
    if (factor === 0) {
      return 0;
    }

    return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((+(factor as any)));
  }

  private setItems(content: CarouselSlideDirective[]) {
    this._items = content;
  }

  private defineSlidesData() {
    let loadMap: Map<string, boolean>;

    if (this.slidesModel && this.slidesModel.length) {
      loadMap = new Map();
      this.slidesModel.forEach(item => {
        if (item.load) {
          loadMap.set(item.id, item.load);
        }
      })
    }

    this.slidesModel = this._items.map(slide => {
      return {
        id: `${slide.id}`,
        isActive: false,
        tplRef: slide.tplRef,
        dataMerge: slide.dataMerge,
        width: 0,
        isCloned: false,
        load: loadMap ? loadMap.get(slide.id) : false,
        classes: {}
      };
    });
  }

  private op(a: number, o: string, b: number): boolean {
    const rtl = this.settings.rtl;
    switch (o) {
      case '<':
        return rtl ? a > b : a < b;
      case '>':
        return rtl ? a < b : a > b;
      case '>=':
        return rtl ? a <= b : a >= b;
      case '<=':
        return rtl ? a >= b : a <= b;
      default:
        return false;
    }
  }

  private trigger(name: string, data?: any) {
    switch (name) {
      case CarouselEventType.Initialized:
        this._initializedCarousel$.next(name);
        break;
      case CarouselEventType.Change:
        this._changeSettingsCarousel$.next(data);
        break;
      case CarouselEventType.Changed:
        this._changedSettingsCarousel$.next(data);
        break;
      case CarouselEventType.Resize:
        this._resizeCarousel$.next(name);
        break;
      case CarouselEventType.Resized:
        this._resizedCarousel$.next(name);
        break;
      case CarouselEventType.Refresh:
        this._refreshCarousel$.next(name);
        break;
      case CarouselEventType.Refreshed:
        this._refreshedCarousel$.next(name);
        break;
      case CarouselEventType.Translate:
        this._translateCarousel$.next(name);
        break;
      case CarouselEventType.Translated:
        this._translatedCarousel$.next(name);
        break;
      default:
        break;
    }
  }

  private suppress(events: string[]) {
    events.forEach(event => {
      this._supress[event] = true;
    });
  }

  private release(events: string[]) {
    events.forEach(event => {
      delete this._supress[event];
    });
  }
}
