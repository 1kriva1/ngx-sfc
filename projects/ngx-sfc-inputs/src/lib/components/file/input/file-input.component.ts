import { Component } from '@angular/core';
import { ButtonType, CommonConstants, parseFileSize } from 'ngx-sfc-common';
import { BaseFileInputComponent } from '../base-file-input.component';

@Component({
  selector: 'sfc-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['../../../styles/input.component.scss', './file-input.component.scss',
    './file-input-bordered.component.scss']
})
export class FileInputComponent extends BaseFileInputComponent {

  ButtonType = ButtonType;

  override get placeholderValue() {
    return this.placeholder || CommonConstants.EMPTY_STRING;
  }

  get fileSize() {
    return this.value ? parseFileSize(this.value.size) : CommonConstants.EMPTY_STRING;
  }
}
