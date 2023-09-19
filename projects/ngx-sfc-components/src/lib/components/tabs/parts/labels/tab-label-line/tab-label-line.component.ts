import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { isNullOrEmptyString } from 'ngx-sfc-common';
import { TabLabelContentBase } from '../tab-label-content-base.component';

@Component({
  selector: 'sfc-tab-label-line',
  templateUrl: './tab-label-line.component.html',
  styleUrls: ['./tab-label-line.component.scss']
})
export class TabLabelLineComponent extends TabLabelContentBase {

  @Input()
  image: string | null = null;

  get tabLineIcon(): IconDefinition | null {
    return isNullOrEmptyString(this.image) ? this.tabIcon : null;
  }
}
