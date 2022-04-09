import { Component, Input, OnInit } from '@angular/core';
import {
  CommonConstants, getCssLikeValue,
  isNullOrEmptyString, UIConstants
} from 'ngx-sfc-common';
import { ProgressBaseComponent } from '../progress.component';

@Component({
  selector: 'sfc-progress-line',
  templateUrl: './progress-line.component.html',
  styleUrls: ['./progress-line.component.scss']
})
export class ProgressLineComponent
  extends ProgressBaseComponent
  implements OnInit {

  @Input()
  total: number = CommonConstants.FULL_PERCENTAGE;

  @Input()
  labelStart?: string;

  @Input()
  labelEnd?: string;

  @Input()
  hideEnd: boolean = false;

  ngOnInit(): void {
    if (this.progress > this.total)
      this.progress = this.total = CommonConstants.FULL_PERCENTAGE;
  }

  get label(): string {
    return isNullOrEmptyString(this.labelEnd) ? `${this.progress}` : this.labelEnd as string;
  }

  get progressStyles() {
    return {
      width: getCssLikeValue((this.progress / this.total) * CommonConstants.FULL_PERCENTAGE,
        UIConstants.CSS_PERCENTAGE),
      backgroundColor: this.getColor(this.progress)
    }
  }
}
