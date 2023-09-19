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
  icon?: IconDefinition | null = null;

  @Input()
  imageSrc?: string| null = null;

  get showImage(): boolean {
    return !isNullOrEmptyString(this.imageSrc) && !isDefined(this.icon);
  }
}
