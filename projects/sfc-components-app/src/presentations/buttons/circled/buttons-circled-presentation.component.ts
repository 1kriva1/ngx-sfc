import { Component } from '@angular/core';
import { ButtonType, ComponentSize } from 'ngx-sfc-common';

@Component({
  templateUrl: './buttons-circled-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class ButtonsCircledPresentationComponent {
  public ComponentSize = ComponentSize;
  public ButtonType = ButtonType;
}
