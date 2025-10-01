import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { CommonConstants, empty, isDefined, UIClass } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-side-menu-header',
  templateUrl: './side-menu-header.component.html',
  styleUrls: ['./side-menu-header.component.scss']
})
export class SideMenuHeaderComponent implements OnInit {

  private readonly DEFAULT_MENU_HEADER_TEXT = 'Menu';

  @Input()
  label?: string | empty = CommonConstants.EMPTY_STRING;

  @Input()
  switch: boolean = true;

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @Output()
  toggle: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.label = isDefined(this.label) ? this.label : this.DEFAULT_MENU_HEADER_TEXT;
  }
}
