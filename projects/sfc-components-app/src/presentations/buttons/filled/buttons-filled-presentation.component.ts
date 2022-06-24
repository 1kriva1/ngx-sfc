import { Component } from '@angular/core';
import { ButtonType, ComponentSize } from 'ngx-sfc-common';
import { faStar, faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './buttons-filled-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class ButtonsFilledPresentationComponent {
  public ComponentSize = ComponentSize;
  public ButtonType = ButtonType;
  faStar = faStar;
  faCar = faCar;
}
