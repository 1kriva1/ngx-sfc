import { Component } from '@angular/core';
import { ButtonType, ComponentSize } from 'ngx-sfc-common';

@Component({
  templateUrl: './buttons-rounded-filled-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class ButtonsRoundedFilledPresentationComponent {
  public ComponentSize = ComponentSize;
  public ButtonType = ButtonType;
}
