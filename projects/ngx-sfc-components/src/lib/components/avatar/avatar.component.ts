import { Component, Input, OnInit } from '@angular/core';
import { AvatarConstants } from './avatar.constants';
import { IAvatarDataModel } from './models/avatar-data.model';
import { AvatarImageModel } from './models/avatar-image.model';
import { IAvatarProgressModel } from './models/avatar-progress.model';
import { IAvatarBadgeModel } from './parts/badge/avatar-badge.model';

@Component({
  selector: 'sfc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

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
  _progressModel: IAvatarProgressModel = this.PROGRESS_MODEL_DEFAULT
  @Input()
  get progressModel(): IAvatarProgressModel {
    return this._progressModel;
  }
  set progressModel(value: IAvatarProgressModel) {
    this._progressModel = { ...this.PROGRESS_MODEL_DEFAULT, ...value }
  }

  @Input()
  data: IAvatarDataModel = this.DATA_MODEL_DEFAULT;

  @Input()
  stars: boolean = false;

  @Input()
  starsValue: number = 0;

  @Input()
  badges: IAvatarBadgeModel[] = [];

  /**
   * Avatar image calculated values
   */
  imageModel!: AvatarImageModel;

  ngOnInit(): void {
    this.imageModel = new AvatarImageModel(this.radius, this.stroke, this.data.image!);
    this.data = { ...this.DATA_MODEL_DEFAULT, ...this.data };
  }

  get strokeDashOffset(): number {
    return Math.round(this.imageModel.Circumference - (this.progress / 100 * this.imageModel.Circumference));
  }
}
