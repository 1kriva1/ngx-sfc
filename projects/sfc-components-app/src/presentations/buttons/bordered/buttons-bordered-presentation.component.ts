import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { faStar, faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './buttons-bordered-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class ButtonsBorderedPresentationComponent {
  public ComponentSize = ComponentSize;
  faStar = faStar;
  faCar = faCar;
}
