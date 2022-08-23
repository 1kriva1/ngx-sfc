import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fileExtensions } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './inline-file-input-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class InlineFileInputPresentationComponent extends BasePresentationComponent implements OnInit {
  
  ngOnInit(): void {
    const file = new File([''], "name.jpg");
    Object.defineProperty(
      file, 'size', { value: 200, writable: false });

    const fileInvalid = new File([''], "name.jpg");
    Object.defineProperty(
      fileInvalid, 'size', { value: 2001, writable: false });

    this.formGroup = this.formBuilder.group(
      {
        inlineFileNull: [null],
        inlineFileLabel: [null],
        inlineFilePlaceholder: [null],
        inlineFileIcon: [null],
        inlineFileHelper: [null],
        inlineFileDefaultIcon: [null],
        inlineFileFileName: [null],
        inlineFileFileNameIcon: [null],
        inlineFileClearFalse: [null],
        inlineFileDisabled: [{
          value: file,
          disabled: true
        }],
        inlineFileValUndf: [null, {
          validators: [Validators.required, fileExtensions(["jpg", "jpeg"])]
        }],
        inlineFileValDef: [null, {
          validators: [Validators.required, fileExtensions(["jpg", "jpeg"])]
        }],
        inlineFileHasValue: [file, {
          validators: [Validators.required, fileExtensions(["jpg", "jpeg"])]
        }],
        inlineFileHasValueInvalid: [file, {
          validators: [Validators.required, fileExtensions(["png", "jpeg"])]
        }],
        inlineFileSmall: [null],
        inlineFileLarge: [null],
        inlineFileCustomSize: [null]
      });
  }



}
