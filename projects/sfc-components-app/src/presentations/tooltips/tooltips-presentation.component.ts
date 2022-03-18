import { Component } from '@angular/core';
import { ComponentSize, TooltipType, Position } from 'ngx-sfc-common';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './tooltips-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss',
    './tooltips-presentation.component.scss']
})
export class TooltipsPresentationComponent extends BasePresentationComponent {
  public Position = Position;
  public TooltipType = TooltipType;
  public ComponentSize = ComponentSize;
}
