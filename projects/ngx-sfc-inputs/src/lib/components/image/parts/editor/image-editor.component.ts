import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { faArrowsAlt, faArrowsH, faArrowsV, faCrop, faRefresh, faRotateLeft, faRotateRight, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import Cropper from 'cropperjs';
import { getFileExtension, isNullOrEmptyString, readAsDataURL } from 'ngx-sfc-common';
import { Subscription } from 'rxjs';
import { ImageService } from '../../service/image.service';
import { ImageEditorConstants } from './image-editor.constants';
import { CropperDragMode } from './cropper-drag-mode.enum';
import { ImageInputType } from '../../image-input-type.enum';

@Component({
  selector: 'sfc-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageEditorComponent implements OnInit, OnDestroy {

  faCrop = faCrop;
  faArrowsAlt = faArrowsAlt;
  faSearchPlus = faSearchPlus;
  faSearchMinus = faSearchMinus;
  faArrowsV = faArrowsV;
  faArrowsH = faArrowsH;
  faRotateLeft = faRotateLeft;
  faRotateRight = faRotateRight;
  faRefresh = faRefresh;

  CropperDragMode = CropperDragMode;

  @Input()
  type: ImageInputType = ImageInputType.Circle;

  public url!: string;

  private dragMode: CropperDragMode = CropperDragMode.Crop;
  public get isCrop(): boolean {
    return this.dragMode == CropperDragMode.Crop;
  }

  private get format(): string {
    const extension = getFileExtension(this.imageService.imageFile);
    return isNullOrEmptyString(extension) ? ImageEditorConstants.DEFAULT_FORMAT : extension;
  }

  private cropper!: Cropper;
  private _cropSubscription!: Subscription;

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
    this._cropSubscription = this.imageService.crop$.subscribe(() => this.export());

    if (this.imageService.imageFile)
      readAsDataURL(this.imageService.imageFile, (result: string | ArrayBuffer | null) => this.url = result as string);
  }

  ngOnDestroy(): void {
    this._cropSubscription.unsubscribe();
  }

  onImageLoad(image: any) {
    this.cropper = new Cropper(image, {
      aspectRatio: ImageEditorConstants.ASPECT_RATIO,
      autoCropArea: ImageEditorConstants.CROP_AREA,
      autoCrop: ImageEditorConstants.AUTO_CROP,
      modal: ImageEditorConstants.MASK,
      guides: ImageEditorConstants.GUIDES,
      center: ImageEditorConstants.CENTER_INDICATOR,
      viewMode: ImageEditorConstants.VIEW_MODE,
      scalable: ImageEditorConstants.SCALABLE,
      zoomable: ImageEditorConstants.ZOOMABLE,
      cropBoxMovable: ImageEditorConstants.CROP_BOX_MOVABLE,
      cropBoxResizable: ImageEditorConstants.CROP_BOX_RESIZABLE
    });
  }

  rotateRight() {
    this.cropper.rotate(ImageEditorConstants.IMAGE_ROTATE_ANGLE);
  }

  rotateLeft() {
    this.cropper.rotate(-ImageEditorConstants.IMAGE_ROTATE_ANGLE);
  }

  crop() {
    this.dragMode = CropperDragMode.Crop;
    this.cropper.setDragMode(this.dragMode);
  }

  move() {
    this.dragMode = CropperDragMode.Move;
    this.cropper.setDragMode(this.dragMode);
  }

  zoomIn() {
    this.cropper.zoom(ImageEditorConstants.ZOOM_VALUE);
  }

  zoomOut() {
    this.cropper.zoom(-ImageEditorConstants.ZOOM_VALUE);
  }

  flipH() {
    this.cropper.scaleX(-this.cropper.getImageData().scaleX);
  }

  flipV() {
    this.cropper.scaleY(-this.cropper.getImageData().scaleY);
  }

  reset() {
    this.cropper.reset();
  }

  private export() {
    const cropedCanvas = this.cropper.getCroppedCanvas({
      imageSmoothingEnabled: ImageEditorConstants.IMAGE_SMOOTHING_ENABLED,
      imageSmoothingQuality: ImageEditorConstants.IMAGE_SMOOTHING_QUALITY
    }), type = `image/${this.format}`;

    cropedCanvas.toBlob(blob => {
      if (blob) {
        this.imageService.export({
          base64: cropedCanvas.toDataURL(type, ImageEditorConstants.DEFAULT_IMAGE_QUALITY),
          file: new File([blob], Date.now() + '.' + this.format, { type })
        });
      }
    }, type, ImageEditorConstants.DEFAULT_IMAGE_QUALITY / 100);
  }
}
