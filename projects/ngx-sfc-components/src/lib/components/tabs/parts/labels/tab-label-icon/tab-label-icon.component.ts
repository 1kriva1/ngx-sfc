import { Component, OnInit } from '@angular/core';
import { isNullOrEmptyString } from 'ngx-sfc-common';
import { TabLabelContentBase } from '../tab-label-content-base.component';

@Component({
  selector: 'sfc-tab-label-icon',
  templateUrl: './tab-label-icon.component.html',
  styleUrls: ['./tab-label-icon.component.scss']
})
export class TabLabelIconComponent
  extends TabLabelContentBase
  implements OnInit {

  private readonly TAB_DEFAULT_ICON = 'fa fa-circle';

  ngOnInit(): void {
    this.icon = !isNullOrEmptyString(this.icon) ? this.icon : this.TAB_DEFAULT_ICON;
  }
}
