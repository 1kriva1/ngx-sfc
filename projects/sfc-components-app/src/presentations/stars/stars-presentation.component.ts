import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './stars-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class StarsPresentationComponent extends BasePresentationComponent {
  public ComponentSize = ComponentSize;
}
