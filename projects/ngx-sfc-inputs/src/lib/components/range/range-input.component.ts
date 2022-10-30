import { Component } from '@angular/core';
import { Position } from 'ngx-sfc-common';
import { RangeBaseComponent } from './base/range-base.component';

@Component({
  selector: 'sfc-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './base/range-base.component.scss', './range-input.component.scss']
})
export class RangeInputComponent extends RangeBaseComponent {

  public override tooltipPosition: Position = Position.Top;
}
