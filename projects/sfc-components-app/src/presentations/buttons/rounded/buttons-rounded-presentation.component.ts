import { Component } from '@angular/core';
import { ButtonType, ComponentSize } from 'ngx-sfc-common';

@Component({
  templateUrl: './buttons-rounded-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class ButtonsRoundedPresentationComponent {
  public ComponentSize = ComponentSize;
  public ButtonType = ButtonType;
}
