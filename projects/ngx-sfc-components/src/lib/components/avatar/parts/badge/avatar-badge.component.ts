import { Component, HostBinding, Input } from '@angular/core';
import { getCssLikeValue, UIConstants } from 'ngx-sfc-common';
import { AvatarConstants } from '../../avatar.constants';
import { AvatarBadgePosition } from './avatar-badge-position.enum';
import { AvatarBadgeConstants } from './avatar-badge.constants';
import { IAvatarBadgeModel } from './avatar-badge.model';

@Component({
  selector: 'sfc-avatar-badge',
  templateUrl: './avatar-badge.component.html',
  styleUrls: ['./avatar-badge.component.scss']
})
export class AvatarBadgeComponent {

  @Input()
  background?: string;

  @Input()
  model: IAvatarBadgeModel = { position: AvatarBadgePosition.Bottom };

  @Input()
  radius: number = AvatarConstants.DEFAULT_RADIUS;

  @Input()
  normalizedRadius: number = AvatarConstants.DEFAULT_RADIUS;

  @Input()
  stroke: number = AvatarConstants.DEFAULT_STROKE;

  @HostBinding('style')
  get styles() {
    const badgeSize = getCssLikeValue(this.sizePart);
    return {
      ...{
        height: badgeSize,
        width: badgeSize,
        background: this.model.background || this.background,
        fontSize: getCssLikeValue(this.radius * AvatarBadgeConstants.TEXT_SIZE_MULTIPLIER)
      },
      ...this.positionStyle
    }
  }

  private get positionStyle(): any {
    const halfNormilizedSizePart = this.normalizedRadius * AvatarBadgeConstants.SIZE_MULTIPLIER / 2,
      halfNormilizedSizePartPx = getCssLikeValue(halfNormilizedSizePart),
      strokedHalfNormilizedSizePartPx = `-${getCssLikeValue(Math.abs(halfNormilizedSizePart - this.stroke))}`,
      strokePx = getCssLikeValue(this.stroke),
      positionPart = `calc(50${UIConstants.CSS_PERCENTAGE} - ${getCssLikeValue((this.sizePart / 2))}`,
      positionBottomPart = `calc(25${UIConstants.CSS_PERCENTAGE} - ${halfNormilizedSizePartPx}`,
      positionTopPart = `calc(75${UIConstants.CSS_PERCENTAGE} - ${halfNormilizedSizePartPx}`;
    switch (this.model.position) {
      case AvatarBadgePosition.Top:
        return {
          right: positionPart,
          top: strokedHalfNormilizedSizePartPx
        };
      case AvatarBadgePosition.Right:
        return {
          right: strokedHalfNormilizedSizePartPx,
          bottom: positionPart
        };
      case AvatarBadgePosition.RightTop:
        return {
          right: strokePx,
          bottom: positionTopPart
        };
      case AvatarBadgePosition.RightBottom:
        return {
          right: strokePx,
          bottom: positionBottomPart
        };
      case AvatarBadgePosition.Bottom:
        return {
          right: positionPart,
          bottom: strokedHalfNormilizedSizePartPx,
        };
      case AvatarBadgePosition.Left:
        return {
          left: strokedHalfNormilizedSizePartPx,
          bottom: positionPart
        };
      case AvatarBadgePosition.LeftTop:
        return {
          left: strokePx,
          bottom: positionTopPart
        };
      case AvatarBadgePosition.LeftBottom:
        return {
          left: strokePx,
          bottom: positionBottomPart
        };
    }
  }

  private get sizePart(): number {
    return this.radius * AvatarBadgeConstants.SIZE_MULTIPLIER;
  }
}
