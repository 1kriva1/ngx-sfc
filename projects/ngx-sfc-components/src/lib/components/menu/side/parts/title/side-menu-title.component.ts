import { Component, HostBinding, Input } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-side-menu-title',
  templateUrl: './side-menu-title.component.html',
  styleUrls: ['./side-menu-title.component.scss']
})
export class SideMenuTitleComponent {

  @Input()
  label: string = CommonConstants.EMPTY_STRING;

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

}
