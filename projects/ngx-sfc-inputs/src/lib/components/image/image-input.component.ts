import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, NgZone, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalTemplate, readAsDataURL, IDefaultModalFooterModel, isImage, isNullOrEmptyString, IDefaultModalHeaderModel, ModalService, CommonConstants } from 'ngx-sfc-common';
import { Subscription } from 'rxjs';
import { ValidationConstants } from '../../constants/validation.constants';
import { BaseInputComponent } from '../base/base-input.component';
import { ImageInputConstants } from './image-input.constants';
import { ImageInputType } from './image-input-type.enum';
import { IImageExportEvent } from './service/image-export.event';
import { ImageService } from './service/image.service';

@Component({
  selector: 'sfc-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './image-input.component.scss'],
  providers: [ModalService, ImageService]
})
export class ImageInputComponent
  extends BaseInputComponent<File>
  implements OnInit, OnDestroy {

  ModalTemplate = ModalTemplate;

  @Input()
  defaultPhoto!: string;

  @Input()
  clearButton: boolean = true;

  @Input()
  @HostBinding('class')
  type: ImageInputType = ImageInputType.Circle;

  override set value(value: File | null) {
    this._value = value;
    if (value) {
      if (this.validateFormat(value))
        readAsDataURL(value, (result: string | ArrayBuffer | null) => this.url = result as string);
    }
  }
  override get value(): File | null {
    return this._value;
  }

  override icon: IconDefinition = ImageInputConstants.DEFAULT_ICON;

  private _url: string | null = null;
  public set url(value: string | null) {
    this._url = value;
  }
  public get url(): string | null {
    return isNullOrEmptyString(this._url)
      ? isNullOrEmptyString(this.defaultPhoto)
        ? ImageInputConstants.DEFAULT_IMAGE
        : this.defaultPhoto
      : this._url;
  }

  public headerModalModel!: IDefaultModalHeaderModel;

  public footerModalModel!: IDefaultModalFooterModel;

  public get showClearButton(): boolean {
    return this.hasValue && this.clearButton;
  }

  private _exportSubscription!: Subscription;

  constructor(@Optional() ngControl: NgControl,
    changeDetector: ChangeDetectorRef,
    renderer: Renderer2,
    elementRef: ElementRef,
    private modalService: ModalService,
    private imageService: ImageService,
    private ngZone: NgZone) {
    super(ngControl, changeDetector, renderer, elementRef);
  }

  ngOnInit(): void {
    this.validations = { ...this.validations, ...ValidationConstants.FORMAT_VALIDATION };
    this._exportSubscription = this.imageService.export$.subscribe(event => this.onExport(event));

    this.headerModalModel = {
      showCloseIcon: true, icon: this.icon, text: this.label
    };

    this.footerModalModel = {
      cancelButton: true, applyButton: true, onApply: () => this.imageService.crop()
    }
  }

  ngOnDestroy(): void {
    this._exportSubscription.unsubscribe();
  }

  onEmitFile(event: FileList) {
    const file = event.item(0) as File;
    if (this.validateFormat(file)) {
      this.imageService.imageFile = file;
      this.modalService.open();
    }
    this.inputElementRef.nativeElement.value = CommonConstants.EMPTY_STRING;
  }

  onExport(event: IImageExportEvent) {
    this.ngZone.run(() => this.onChange(event.file));
    this.modalService.close();
  }

  onClear() {
    this.toggleInnerErrors(ValidationConstants.FORMAT_VALIDATOR_KEY, true);
    this.url = null;
    this.onChange(null);
  }

  private validateFormat(file: File) {
    const result = isImage(file);
    this.toggleInnerErrors(ValidationConstants.FORMAT_VALIDATOR_KEY, result);
    return result;
  }
}