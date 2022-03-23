import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './toggle-switchers-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class ToggleSwitchersPresentationComponent extends BasePresentationComponent {
  public ComponentSize = ComponentSize;
}
