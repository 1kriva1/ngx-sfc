import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { isNullOrEmptyString } from 'ngx-sfc-common';
import { AvatarConstants } from './avatar.constants';
import { IAvatarDataModel } from './models/avatar-data.model';
import { AvatarImageModel } from './models/avatar-image.model';
import { IAvatarProgressModel } from './models/avatar-progress.model';
import { AvatarBadgeComponent } from './parts/badge/avatar-badge.component';

@Component({
  selector: 'sfc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, AfterContentInit {

  readonly PROGRESS_MODEL_DEFAULT: IAvatarProgressModel = {
    color: AvatarConstants.PROGRESS_DEFAULT_COLOR,
    filledColor: AvatarConstants.PROGRESS_DEFAULT_FILLED_COLOR
  };

  readonly DATA_MODEL_DEFAULT: IAvatarDataModel = {
    image: AvatarConstants.DATA_DEFAULT_IMAGE
  };

  readonly STROKE_HOVER_VALUE = 2;

  readonly FULLNAME_PART_VALUE = 4;

  readonly TITLE_PART_VALUE = 5;

  /**
   * Avatar radius (80 by default)
   */
  @Input()
  radius: number = AvatarConstants.DEFAULT_RADIUS;

  /**
   * Size of avatar progress circle (2 by default)
   */
  @Input()
  stroke: number = AvatarConstants.DEFAULT_STROKE;

  /**
   * Progress value
   */
  @Input()
  progress: number = 0;

  /**
   * Progress colors model
   */
  @Input()
  progressModel: IAvatarProgressModel = this.PROGRESS_MODEL_DEFAULT;

  @Input()
  data: IAvatarDataModel = this.DATA_MODEL_DEFAULT;

  @Input()
  stars: boolean = false;

  @Input()
  starsValue: number = 0;

  @ContentChildren(AvatarBadgeComponent, { read: AvatarBadgeComponent })
  badges: QueryList<AvatarBadgeComponent> = new QueryList<AvatarBadgeComponent>();

  /**
   * Avatar image calculated values
   */
  imageModel!: AvatarImageModel;

  ngOnInit(): void {
    this.imageModel = new AvatarImageModel(this.radius, this.stroke, this.data.image as string);
    this.progressModel = { ...this.PROGRESS_MODEL_DEFAULT, ...this.progressModel };
    this.data = { ...this.DATA_MODEL_DEFAULT, ...this.data };
  }

  ngAfterContentInit(): void {
    this.badges.forEach(badge => {
      badge.radius = this.radius;
      badge.normalizedRadius = this.imageModel.NormalizedRadius;
      badge.stroke = this.stroke;

      if (isNullOrEmptyString(badge.background))
        badge.background = this.progressModel.filledColor;
    });
  }

  get strokeDashOffset(): number {
    return Math.round(this.imageModel.Circumference - (this.progress / 100 * this.imageModel.Circumference));
  }
}
