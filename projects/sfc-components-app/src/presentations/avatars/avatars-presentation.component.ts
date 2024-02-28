import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { BasePresentationComponent } from '../base-presentations.component';
import { AvatarBadgePosition, IAvatarProgressModel, IAvatarDataModel, IAvatarBadgeModel } from 'ngx-sfc-components';
import { faCopyright, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './avatars-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class AvatarsPresentationComponent extends BasePresentationComponent {

  ComponentSize = ComponentSize;

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

  badges: IAvatarBadgeModel[] = [
    { position: AvatarBadgePosition.Top, label: '16' },
    { position: AvatarBadgePosition.Bottom, label: '26' },
    { position: AvatarBadgePosition.Right, label: '36' },
    { position: AvatarBadgePosition.RightBottom, label: '46' },
    { position: AvatarBadgePosition.RightTop, label: '56' },
    { position: AvatarBadgePosition.Left, label: '66' },
    { position: AvatarBadgePosition.LeftBottom, label: '76' },
    { position: AvatarBadgePosition.LeftTop, label: '86' }
  ];

  badgesIcons: IAvatarBadgeModel[] = [
    { position: AvatarBadgePosition.Right, background: '#8CC152', icon: faCopyright },
    { position: AvatarBadgePosition.RightBottom, label: '46' },
    { position: AvatarBadgePosition.RightTop, icon: faPlus, background: '#ED5565' }
  ];

  updateProgressValue() {
    this.progressOne += 10;

    if (this.progressOne > 100)
      this.progressOne = 1;
  }
}
