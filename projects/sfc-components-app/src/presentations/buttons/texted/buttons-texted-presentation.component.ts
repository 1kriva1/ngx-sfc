import { Component } from '@angular/core';
import { ButtonType, ComponentSize } from 'ngx-sfc-common';

@Component({
  templateUrl: './buttons-texted-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class ButtonsTextedPresentationComponent {
  public ComponentSize = ComponentSize;
  public ButtonType = ButtonType;
}
