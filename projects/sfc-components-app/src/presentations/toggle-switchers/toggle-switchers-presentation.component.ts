import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { BasePresentationComponent } from '../base-presentations.component';
import { faCar, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './toggle-switchers-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class ToggleSwitchersPresentationComponent extends BasePresentationComponent {
  public ComponentSize = ComponentSize;
  faCar = faCar;
  faStar = faStar;
}
