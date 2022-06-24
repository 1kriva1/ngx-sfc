import { Component } from '@angular/core';
import { isDefined } from 'ngx-sfc-common';
import { TabLabelContentBase } from '../tab-label-content-base.component';
import { faCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-tab-label-icon',
  templateUrl: './tab-label-icon.component.html',
  styleUrls: ['./tab-label-icon.component.scss']
})
export class TabLabelIconComponent
  extends TabLabelContentBase {

  get tabIcon(): IconDefinition {
    return isDefined(this.icon) ? this.icon as IconDefinition : faCircle;
  }
}
