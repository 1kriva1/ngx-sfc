import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { BasePresentationComponent } from '../base-presentations.component';
import { AvatarBadgePosition, IAvatarProgressModel, IAvatarDataModel } from 'ngx-sfc-components';
import { faCopyright, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './avatars-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class AvatarsPresentationComponent extends BasePresentationComponent {

  faCopyright = faCopyright;

  faPlus = faPlus;

  ComponentSize = ComponentSize;

  AvatarBadgePosition = AvatarBadgePosition;

  progressOne = 1;

  progressHalf = 50;

  progress99 = 99;

  progressColor: IAvatarProgressModel = {
    color: 'red'
  }

  progressFilledColor: IAvatarProgressModel = {
    filledColor: 'red'
  }

  progressFullColor: IAvatarProgressModel = {
    color: 'yellow',
    filledColor: 'green'
  }

  data: IAvatarDataModel = {
    firstName: 'Andrii',
    lastName: 'Kryvoruk',
    title: 'Goalkeeper'
  }

  dataImage: IAvatarDataModel = {
    firstName: 'Eden',
    lastName: 'Hazard',
    title: 'Midfielder',
    image: '../../assets/belgium_eden_hazard.png'
  }

  updateProgressValue() {
    this.progressOne += 10;

    if (this.progressOne > 100)
      this.progressOne = 1;
  }
}
