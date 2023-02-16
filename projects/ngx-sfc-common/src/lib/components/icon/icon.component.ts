import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { isDefined, isNullOrEmptyString } from '../../utils';

@Component({
  selector: 'sfc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input()
  icon?: IconDefinition;

  @Input()
  imageSrc?: string;

  get showImage(): boolean {
    return !isNullOrEmptyString(this.imageSrc) && !isDefined(this.icon);
  }
}
