import {
  AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input,
  QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { getCssLikeValue } from 'ngx-sfc-common';
import { map, Observable } from 'rxjs';
import { SliderButtonType } from './parts/button/slider-button-type.enum';
import { SliderItemComponent } from './parts/item/slider-item.component';
import { ISliderItemModel } from './parts/item/slider-item.model';
import { SliderAutomaticService } from './service/automatic/slider-automatic.service';
import { SliderMoveType } from './service/slider/slider-move-type.enum';
import { SliderService } from './service/slider/slider.service';
import { SliderType } from './slider-type.enum';
import { faPauseCircle, faPlayCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [SliderService, SliderAutomaticService]
})
export class SliderComponent implements AfterViewInit, AfterViewChecked {

  readonly PAUSE_ICON = faPauseCircle;

  readonly PLAY_ICON = faPlayCircle;

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

  @ViewChild('slider', { static: false })
  private slider!: ElementRef;

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

  get isAutomatic() {
    return this.type == SliderType.Automatic;
  }

  get automaticIcon(): IconDefinition {
    return this.automaticService.pause ? this.PLAY_ICON : this.PAUSE_ICON;
  }

  constructor(public sliderService: SliderService,
    private automaticService: SliderAutomaticService,
    private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const count$ = this.sliderItems.changes.pipe(map(c => c.length));
    this.sliderService.init(count$);

    this.vm$ = this.sliderService.model$.pipe(
      map(model => {
        return {
          index: model.index,
          styles: this.getStyles(model.index, model.count),
          label: `${model.count > 0 ? model.index + 1 : 0} / ${model.count}`,
          count: model.count
        }
      })
    );

    if (this.isAutomatic)
      this.automaticService.start();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  getStyles(index: number, count: number) {
    if (this.slider) {
      const width = this.slider.nativeElement.offsetWidth;
      return {
        width: getCssLikeValue(width * count),
        left: getCssLikeValue(-width * index)
      };
    }

    return null;
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
}
