import { Injectable } from '@angular/core';
import { isDefined } from 'ngx-sfc-common';
import { SliderMoveType } from '../slider/slider-move-type.enum';
import { SliderService } from '../slider/slider.service';

@Injectable()
export class SliderAutomaticService {

  private readonly AUTOMATIC_INTERVAL_MS = 3000;

  /**
   * Interval reference (for stop if required)
   */
  private autoSlider!: any;

  public pause: boolean = true;

  constructor(private sliderService: SliderService) { }

  start() {
    this.pause = false;

    // stop previous if exist
    if (isDefined(this.autoSlider))
      this.stop();

    this.autoSlider = setInterval(() =>
      this.sliderService.move(SliderMoveType.Next), this.AUTOMATIC_INTERVAL_MS);
  }

  stop() {
    clearInterval(this.autoSlider);
  }

  toggle() {
    this.pause = !this.pause;

    if (this.pause)
      this.stop();
    else
      this.start();
  }
}
