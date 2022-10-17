import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fileExtensions, fileMaxSize } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './file-input-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class FileInputPresentationComponent extends BasePresentationComponent implements OnInit {

  ngOnInit(): void {
    const file = new File([''], "name.jpg");
    Object.defineProperty(
      file, 'size', { value: 200, writable: false });

    const fileInvalid = new File([''], "name.jpg");
    Object.defineProperty(
      fileInvalid, 'size', { value: 2001, writable: false });

    this.formGroup = this.formBuilder.group(
      {
        inputFileNull: [null],
        inputFileLabel: [null],
        inputFilePlaceholder: [null],
        inputFileLabPlace: [null],
        inputFileDisabled: [{
          value: null,
          disabled: true
        }],
        inputFileIcon: [null],
        inputFileHelper: [null],
        inputFileValidationUndefined: [null, {
          validators: [Validators.required, fileExtensions(["jpg", "jpeg"])]
        }],
        inputFileValidationDefined: [null, {
          validators: [Validators.required, fileMaxSize(2000)]
        }],
        inputFileWithValue: [file, {
          validators: [Validators.required, fileMaxSize(2000)]
        }],
        inputFileWithValueInvalid: [fileInvalid, {
          validators: [Validators.required, fileMaxSize(2000)]
        }],
        inputFileSmall: [null],
        inputFileLarge: [null],
        inputFileCustomSize: [file]
      }
    );
  }
}
