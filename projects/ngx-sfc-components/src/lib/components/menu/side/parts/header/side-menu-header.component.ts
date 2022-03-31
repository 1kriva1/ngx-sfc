import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-side-menu-header',
  templateUrl: './side-menu-header.component.html',
  styleUrls: ['./side-menu-header.component.scss']
})
export class SideMenuHeaderComponent implements OnInit {

  private readonly DEFAULT_MENU_HEADER_TEXT = 'Menu';

  @Input()
  label: string = CommonConstants.EMPTY_STRING;

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @Output()
  toggle: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.label = this.label || this.DEFAULT_MENU_HEADER_TEXT;
  }
}
