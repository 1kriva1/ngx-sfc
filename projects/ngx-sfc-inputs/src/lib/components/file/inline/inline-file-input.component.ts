import { Component, Input, OnInit } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { BaseFileInputComponent } from '../base-file-input.component';
import { FileInputConstants } from '../file-input.constants';

@Component({
  selector: 'sfc-inline-file-input',
  templateUrl: './inline-file-input.component.html',
  styleUrls: ['./inline-file-input.component.scss']
})
export class InlineFileInputComponent extends BaseFileInputComponent implements OnInit {

  @Input()
  defaultIcon = false;

  @Input()
  showFileName = true;

  override bordered: boolean = false;

  ngOnInit() {
    if (this.defaultIcon || !this.showFileName && !this.icon)
      this.icon = FileInputConstants.DEFAULT_ICON;
  }

  get text() {
    if (this.showFileName) {
      return this.fileName
        ? this.fileName
        : this.placeholder || this.label || FileInputConstants.DEFAULT_PLACEHOLDER;
    }

    return CommonConstants.EMPTY_STRING;
  }
}
