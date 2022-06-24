import { Component } from '@angular/core';
import { ButtonType, ComponentSize } from 'ngx-sfc-common';
import { faStar, faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './buttons-circled-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class ButtonsCircledPresentationComponent {
  public ComponentSize = ComponentSize;
  public ButtonType = ButtonType;
  faStar = faStar;
  faCar = faCar;
}
