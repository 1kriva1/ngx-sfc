import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UIClass } from 'ngx-sfc-common';
import { ImageInputType } from '../../image-input-type.enum';
import { ImageService } from '../../service/image.service';
import { CropperDragMode } from './cropper-drag-mode.enum';
import { ImageEditorComponent } from './image-editor.component';
import { ImageEditorConstants } from './image-editor.constants';

describe('Component: ImageEditor', () => {
  let component: ImageEditorComponent;
  let fixture: ComponentFixture<ImageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ImageEditorComponent],
      providers: [ImageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.editor')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.actions')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('fa-icon').length).toEqual(9);
    });

    fit("Should call unsubscribe on crop subscription", () => {
      const unsubscribeSpy = spyOn(
        (component as any)._cropSubscription,
        'unsubscribe'
      ).and.callThrough();

      component?.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    fit('Should url be undefined', () => {
      expect(component.url).toBeUndefined();
    });

    fit('Should have default format', () => {
      expect((component as any).format).toEqual(ImageEditorConstants.DEFAULT_FORMAT);
    });

    fit('Should have defined format', () => {
      component.imageService.imageFile = new File([], 'test.text');
      component.ngOnInit();
      fixture.detectChanges();

      expect((component as any).format).toEqual('text')
    });

    // TODO
    fit("Export: default export", () => {
      loadImage();

      const toBlobSpy = jasmine.createSpy();
      spyOn<any>((component as any).cropper, 'getCroppedCanvas').and.returnValue({ toBlob: toBlobSpy });

      component.imageService.crop();

      expect(toBlobSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Image', () => {
    fit('Should have default type', () => {
      expect(fixture.nativeElement.querySelector(`div.editor.${ImageInputType.Circle}`)).toBeTruthy();
      expect(fixture.nativeElement.querySelector(`div.editor.${ImageInputType.Square}`)).toBeNull();
    });

    fit('Should have defined type', () => {
      component.type = ImageInputType.Square;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector(`div.editor.${ImageInputType.Square}`)).toBeTruthy();
      expect(fixture.nativeElement.querySelector(`div.editor.${ImageInputType.Circle}`)).toBeNull();
    });

    fit('Should have defimed url value', () => {
      component.url = 'testImage.png';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('img')).properties['src']).toEqual(component.url);
    });

    fit('Should load image', () => {
      spyOn<any>(component, 'onImageLoad').and.callThrough();
      component.url = 'testImage.png';
      fixture.detectChanges();

      loadImage();

      expect(component['onImageLoad']).toHaveBeenCalledTimes(1);
      expect(component['onImageLoad']).toHaveBeenCalledWith(fixture.debugElement.query(By.css('img')).nativeElement);
    });
  });

  describe('Actions', () => {
    describe('Crop', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-crop')).toBeTruthy();
      });

      fit('Should be active by default', () => {
        expect(fixture.nativeElement.querySelector(`fa-icon.${UIClass.Active} svg.fa-crop`)).toBeTruthy();
      });

      fit('Should become not active', () => {
        loadImage();

        clickAction('up-down-left-right');

        expect(fixture.nativeElement.querySelector(`fa-icon.${UIClass.Active} svg.fa-crop`)).toBeNull();
      });

      fit('Should call cropper setDragMode', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'setDragMode').and.callThrough();

        clickAction('crop')

        expect(cropperSpy).toHaveBeenCalledOnceWith(CropperDragMode.Crop);
      });
    });

    describe('Move', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-up-down-left-right')).toBeTruthy();
      });

      fit('Should not be active by default', () => {
        expect(fixture.nativeElement.querySelector(`fa-icon.${UIClass.Active} svg.fa-up-down-left-right`)).toBeNull();
      });

      fit('Should become active', () => {
        loadImage();

        clickAction('up-down-left-right');

        expect(fixture.nativeElement.querySelector(`fa-icon.${UIClass.Active} svg.fa-up-down-left-right`)).toBeTruthy();
      });

      fit('Should call cropper setDragMode', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'setDragMode').and.callThrough();

        clickAction('up-down-left-right')

        expect(cropperSpy).toHaveBeenCalledOnceWith(CropperDragMode.Move);
      });
    });

    describe('ZoomIn', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-magnifying-glass-plus')).toBeTruthy();
      });

      fit('Should call cropper zoom', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'zoom').and.callFake(() => { });

        clickAction('magnifying-glass-plus')

        expect(cropperSpy).toHaveBeenCalledOnceWith(ImageEditorConstants.ZOOM_VALUE);
      });
    });

    describe('ZoomOut', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-magnifying-glass-minus')).toBeTruthy();
      });

      fit('Should call cropper zoom', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'zoom').and.callFake(() => { });

        clickAction('magnifying-glass-minus')

        expect(cropperSpy).toHaveBeenCalledOnceWith(-ImageEditorConstants.ZOOM_VALUE);
      });
    });

    describe('FlipV', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-arrows-up-down')).toBeTruthy();
      });

      fit('Should call cropper scaleY', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'scaleY').and.callFake(() => { });
        spyOn<any>((component as any).cropper, 'getImageData').and.returnValue({ scaleY: 10 });

        clickAction('arrows-up-down')

        expect(cropperSpy).toHaveBeenCalledOnceWith(-10);
      });
    });

    describe('FlipH', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-arrows-left-right')).toBeTruthy();
      });

      fit('Should call cropper scaleX', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'scaleX').and.callFake(() => { });
        spyOn<any>((component as any).cropper, 'getImageData').and.returnValue({ scaleX: 10 });

        clickAction('arrows-left-right')

        expect(cropperSpy).toHaveBeenCalledOnceWith(-10);
      });
    });

    describe('RotateLeft', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-rotate-left')).toBeTruthy();
      });

      fit('Should call cropper rotate', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'rotate').and.callFake(() => { });

        clickAction('rotate-left')

        expect(cropperSpy).toHaveBeenCalledOnceWith(-ImageEditorConstants.IMAGE_ROTATE_ANGLE);
      });
    });

    describe('RotateRight', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-rotate-right')).toBeTruthy();
      });

      fit('Should call cropper rotate', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'rotate').and.callFake(() => { });

        clickAction('rotate-right')

        expect(cropperSpy).toHaveBeenCalledOnceWith(ImageEditorConstants.IMAGE_ROTATE_ANGLE);
      });
    });

    describe('Reset', () => {
      fit('Should have defined icon', () => {
        expect(fixture.nativeElement.querySelector('fa-icon svg.fa-arrows-rotate')).toBeTruthy();
      });

      fit('Should call cropper reset', () => {
        loadImage();

        const cropperSpy = spyOn<any>((component as any).cropper, 'reset').and.callThrough();

        clickAction('arrows-rotate')

        expect(cropperSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  function loadImage(): void {
    const imageEl = fixture.debugElement.query(By.css('img'));
    imageEl.nativeElement.dispatchEvent(new MouseEvent('load', {}));
    fixture.detectChanges();
  }

  function clickAction(action: string): void {
    const actionEl = fixture.debugElement.query(By.css(`fa-icon svg.fa-${action}`)).parent;
    actionEl?.triggerEventHandler('click', { target: actionEl.nativeElement });
    fixture.detectChanges();
  }
});
