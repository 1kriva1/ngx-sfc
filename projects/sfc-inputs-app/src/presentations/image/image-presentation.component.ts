import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fileMaxSize, ImageInputType } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../base-presentations.component';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';

@Component({
  templateUrl: './image-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss'],
  styles: ['sfc-image-input { max-width:20em;}']
})
export class ImagePresentationComponent extends BasePresentationComponent
  implements OnInit {

  ImageInputType = ImageInputType;

  public defaultImage = '../assets/argentina_messi.png';

  constructor(router: Router, activatedRoute: ActivatedRoute, formBuilder: UntypedFormBuilder, public httpClient: HttpClient) {
    super(router, activatedRoute, formBuilder);
  }

  ngOnInit(): void {
    const validValue$ = this.httpClient.get('/assets/costa_rica_ruis.png', { responseType: 'blob' });
    const invalidValue$ = this.httpClient.get('/assets/test.txt', { responseType: 'blob' });

    combineLatest([validValue$, invalidValue$])
      .subscribe(pairData => {
        const validImage = new File([pairData[0]], "Capture.png", { type: "image/png" }),
          invalidImage = new File([pairData[1]], "test.txt", { type: "text/txt" });
        this.formGroup.controls['inputImageValue'].setValue(validImage);
        this.formGroup.controls['inputImageWithotClearButton'].setValue(validImage);
        this.formGroup.controls['inputImageValidationSuccess'].setValue(validImage);
        this.formGroup.controls['inputImageInvalidValue'].setValue(invalidImage);
        this.formGroup.controls['inputImageValidationFailed'].setValue(validImage);
        this.formGroup.controls['inputImageValidationFailedMessage'].setValue(validImage);
        this.formGroup.controls['inputImageSmall'].setValue(validImage);
        this.formGroup.controls['inputImageLarge'].setValue(validImage);
        this.formGroup.controls['inputImageCustomSize'].setValue(validImage);
      });

    this.formGroup = this.formBuilder.group(
      {
        inputImageNull: [null],
        inputImageLabel: [null],
        inputImageIcon: [null],
        inputImageCustomDefaultImage: [null],
        inputImageHelperText: [null],
        inputImageSquareCropper: [null],
        inputImageDisabled: [{
          value: null,
          disabled: true
        }],
        inputImageValue: [null],
        inputImageWithotClearButton: [null],
        inputImageInvalidValue: [null],
        inputImageValidationSuccess: [null, {
          validators: [Validators.required, fileMaxSize(2000000)]
        }],
        inputImageValidationFailed: [null, {
          validators: [Validators.required, fileMaxSize(2000)]
        }],
        inputImageValidationFailedMessage: [null, {
          validators: [Validators.required, fileMaxSize(2000)]
        }],
        inputImageSmall: [null],
        inputImageLarge: [null],
        inputImageCustomSize: [null]
      }
    );
  }
}
