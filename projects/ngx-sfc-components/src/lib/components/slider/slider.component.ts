import {
  AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input,
  QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { SliderButtonType } from './parts/button/slider-button-type.enum';
import { SliderItemComponent } from './parts/item/slider-item.component';
import { ISliderItemModel } from './parts/item/slider-item.model';
import { SliderAutomaticService } from './service/automatic/slider-automatic.service';
import { SliderMoveType } from './service/slider/slider-move-type.enum';
import { SliderService } from './service/slider/slider.service';
import { SliderType } from './slider-type.enum';
import { faPauseCircle, faPlayCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ResizeService, ImageLoadService } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [SliderService, SliderAutomaticService]
})
export class SliderComponent implements AfterViewInit, AfterViewChecked {

  private readonly SIZE_FACTOR = 0.00225;

  private readonly PAUSE_ICON = faPauseCircle;

  private readonly PLAY_ICON = faPlayCircle;

  SliderButtonType = SliderButtonType;

  SliderMoveType = SliderMoveType;

  @Input()
  items: ISliderItemModel[] = [];

  @Input()
  type: SliderType = SliderType.Default;

  @Input()
  showCount: boolean = true;

  @Input()
  pagination: boolean = true;

  @Input()
  handlers: boolean = true;

  @Input()
  showAutomaticToggle: boolean = true;

  @ViewChildren(SliderItemComponent)
  private sliderItems!: QueryList<SliderItemComponent>;

  /**
   * If active show buttons
   */
  active: boolean = false;

  public vm$!: Observable<any>;

  @HostListener('mouseenter')
  onEnter() {
    this.active = true;

    // stop automatic move on hover
    if (this.isAutomatic)
      this.automaticService.stop();
  }

  @HostListener('mouseleave')
  onLeave() {
    this.active = false;

    // start automatic move on hover end
    if (this.isAutomatic && !this.automaticService.pause)
      this.automaticService.start();
  }

  @ViewChild('itemsContainer')
  private itemsEl!: ElementRef;

  @HostBinding('style.font-size.em')
  private _sizeFactor: number = 1;

  @HostBinding('style.max-width.px')
  private _maxWidth!: number;

  get isAutomatic() {
    return this.type == SliderType.Automatic;
  }

  get automaticIcon(): IconDefinition {
    return this.automaticService.pause ? this.PLAY_ICON : this.PAUSE_ICON;
  }

  constructor(public sliderService: SliderService,
    private automaticService: SliderAutomaticService,
    private resizeService: ResizeService,
    public imageLoadService: ImageLoadService,
    private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const count$ = this.sliderItems.changes.pipe(map(c => c.length));
    this.sliderService.init(count$);

    this.vm$ = this.sliderService.model$.pipe(
      map(model => {
        return {
          index: model.index,
          label: `${model.count > 0 ? model.index + 1 : 0} / ${model.count}`,
          count: model.count
        }
      })
    );

    if (this.isAutomatic)
      this.automaticService.start();

    this.imageLoadService.load$.subscribe((sizeEvent: any) => {
      this._sizeFactor = this.getSizeFactor(sizeEvent.offset.height);
      this._maxWidth = sizeEvent.natural.width;
    });

    this.resizeService.onResize$.subscribe(() => this._sizeFactor = this.getSizeFactor(this.itemsEl.nativeElement.offsetHeight));

    this.changeDetector.detectChanges();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  move(type: SliderMoveType): void {
    this.sliderService.move(type);
  }

  select(index: number): void {
    this.sliderService.select(index);
  }

  toggleAutomatic(): void {
    this.automaticService.toggle();
  }

  private getSizeFactor(value: number) {
    return value * this.SIZE_FACTOR;
  }
}