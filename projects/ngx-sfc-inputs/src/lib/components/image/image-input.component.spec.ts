import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonConstants, DefaultModalFooterComponent, ModalService, TemplateReferenceDirective } from 'ngx-sfc-common';
import { ModalComponent, ModalOpenDirective } from 'ngx-sfc-common';
import { CloseComponent } from 'ngx-sfc-common';
import { InputReferenceDirective } from '../../directives';
import { ImageEditorComponent } from './parts/editor/image-editor.component';
import { ImageInputComponent } from './image-input.component';
import { ImageService } from './service/image.service';
import { By } from '@angular/platform-browser';
import { InputConstants } from '../../constants/input.constants';
import { TemplateContentComponent } from 'ngx-sfc-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModalHeaderComponent } from 'ngx-sfc-common';
import { ButtonComponent } from 'ngx-sfc-common';
import { ComponentSizeDirective } from 'ngx-sfc-common';
import { ValidationConstants } from '../../constants/validation.constants';
import { ImageInputConstants } from './image-input.constants';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ImageInputType } from './image-input-type.enum';
import { IImageExportEvent } from './service/image-export.event';

describe('Component: ImageInput', () => {
  let component: ImageInputComponent;
  let fixture: ComponentFixture<ImageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, BrowserAnimationsModule],
      declarations: [InputReferenceDirective, CloseComponent, ModalComponent, ModalOpenDirective, TemplateContentComponent,
        DefaultModalHeaderComponent, DefaultModalFooterComponent, ButtonComponent, ComponentSizeDirective, TemplateReferenceDirective, ImageEditorComponent, ImageInputComponent],
      providers: [ModalService, ImageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input[type=file]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.component')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.image')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('fa-icon')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.overlay')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
    });

    fit("Should have defined value", () => {
      const assertValue = getHugeFile('test.png', 1000);
      component.writeValue(assertValue);
      fixture.detectChanges();

      expect(component.value).toEqual(assertValue);
    });

    fit("Should have constant validations", () => {
      expect(component.validations).toEqual({ ...ValidationConstants.FORMAT_VALIDATION });
    });

    fit("Should call unsubscribe on export subscription", () => {
      const unsubscribeSpy = spyOn(
        (component as any)._exportSubscription,
        'unsubscribe'
      ).and.callThrough();

      component?.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    fit("Should have constant modal header model", () => {
      expect(component.headerModalModel).toEqual({
        showCloseIcon: true, icon: component.icon, text: component.label
      });
    });

    fit("Should have constant modal footer model", () => {
      expect(component.footerModalModel.cancelButton).toBeTrue();
      expect(component.footerModalModel.applyButton).toBeTrue();
      expect(component.footerModalModel.onApply).toBeDefined();
    });

    fit("Should have default type", () => {
      expect(fixture.nativeElement.className).toContain(ImageInputType.Circle);
      expect(fixture.nativeElement.className).not.toContain(ImageInputType.Square);
    });

    fit("Should have defined type", () => {
      component.type = ImageInputType.Square;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(ImageInputType.Square);
      expect(fixture.nativeElement.className).not.toContain(ImageInputType.Circle);
    });

    fit("Should have inner error", () => {
      component.value = getHugeFile('test.text', 1000);

      expect(component.isInnerInvalid).toBeTrue();
      expect(Object.keys(component.innerErrors).length).toEqual(1);
      expect(component.innerErrors[ValidationConstants.FORMAT_VALIDATOR_KEY]).toBeTrue();
    });

    fit("Should still have inner error", () => {
      component.value = getHugeFile('test.text', 1000);
      component.value = null;

      expect(component.isInnerInvalid).toBeTrue();
      expect(Object.keys(component.innerErrors).length).toEqual(1);
      expect(component.innerErrors[ValidationConstants.FORMAT_VALIDATOR_KEY]).toBeTrue();
    });

    fit("Should not have inner error", () => {
      component.value = getHugeFile('test.text', 1000);
      component.value = getHugeFile('test.png', 1000);

      expect(component.isInnerInvalid).toBeFalse();
      expect(Object.keys(component.innerErrors).length).toEqual(0);
    });

    fit("Should close modal after export image", () => {
      const modalServiceSpy = spyOn((component as any).modalService, 'close'),
        exportEvent: IImageExportEvent = { file: new File([], 'test.png'), base64: 'base_64' };

      (component as any).imageService.export(exportEvent);

      expect(modalServiceSpy).toHaveBeenCalledTimes(1);
    });

    fit("Should change value after export image", () => {
      const imageMock = new File([], 'test.png'),
        exportEvent: IImageExportEvent = { file: imageMock };

      (component as any).imageService.export(exportEvent);

      expect(component.value).toEqual(imageMock);
    });
  });

  describe('Input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input[type="file"]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type="file"]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have constant value", () => {
      expect(fixture.nativeElement.querySelector('input[type=file]').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input[type="file"]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type="file"]').disabled).toBeTrue();
    });

    fit("Should be hidden", () => {
      expect(fixture.nativeElement.querySelector('input[type="file"]').hidden).toBeTrue();
    });

    fit("Should refresh value for input", () => {
      emitImage();

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type="file"]')).nativeElement.value)
        .toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should set image value", () => {
      emitImage();

      expect((component as any).imageService.imageFile).toEqual(getHugeFile('test.png', 1000));
    });

    fit("Should not set image value", () => {
      emitImage(getHugeFile('test.text', 1000));

      expect((component as any).imageService.imageFile).toBeUndefined();
    });

    fit("Should call open modal", () => {
      const modalServiceSpy = spyOn((component as any).modalService, 'open');

      emitImage();

      expect(modalServiceSpy).toHaveBeenCalledTimes(1);
    });

    fit("Should not call open modal", () => {
      const modalServiceSpy = spyOn((component as any).modalService, 'open');

      emitImage(getHugeFile('test.text', 1000));

      expect(modalServiceSpy).not.toHaveBeenCalled();
    });

    fit("Should have inner error", () => {
      emitImage(getHugeFile('test.text', 1000));

      expect(component.isInnerInvalid).toBeTrue();
      expect(Object.keys(component.innerErrors).length).toEqual(1);
      expect(component.innerErrors[ValidationConstants.FORMAT_VALIDATOR_KEY]).toBeTrue();
    });
  });

  describe('Image', () => {
    fit("Should have default url", () => {
      expect(component.url).toEqual(ImageInputConstants.DEFAULT_IMAGE);
    });

    fit("Should have defined default url", () => {
      component.defaultPhoto = 'default.png';

      expect(component.url).toEqual(component.defaultPhoto);
    });

    fit("Should have background image", () => {
      component.url = 'default.png';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.image')).styles['background-image']).toEqual(`url("${component.url}")`);
    });
  });

  describe('Label', () => {
    fit("Should not exist", () => {
      expect(fixture.nativeElement.querySelector('label span')).toBeNull();
    });

    fit("Should exist", () => {
      component.label = 'test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label span')).toBeTruthy();
    });

    fit("Should have defined value", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit("Should be linked to input element", () => {
      const inputEl = fixture.nativeElement.querySelector('input[type=file]');

      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    describe('Clear', () => {
      fit("Should not exist", () => {
        expect(fixture.nativeElement.querySelector('sfc-close')).toBeNull();
      });

      fit("Should exist", () => {
        component.writeValue(getHugeFile('test.png', 1000));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-close')).toBeTruthy();
      });

      fit("Should not exist, if clearButton is false", () => {
        component.clearButton = false;
        component.writeValue(getHugeFile('test.png', 1000));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-close')).toBeNull();
      });

      fit("Should clear value", () => {
        component.writeValue(getHugeFile('test.png', 1000));
        fixture.detectChanges();

        const clearBtn = fixture.debugElement.query(By.css('sfc-close'));
        clearBtn.triggerEventHandler('click', { target: clearBtn.nativeElement });
        fixture.detectChanges();

        expect(component.value).toBeNull();
      });

      fit("Should reset url", () => {
        component.url = 'test.png';
        component.writeValue(getHugeFile('test.png', 1000));
        fixture.detectChanges();

        const clearBtn = fixture.debugElement.query(By.css('sfc-close'));
        clearBtn.triggerEventHandler('click', { target: clearBtn.nativeElement });
        fixture.detectChanges();

        expect(component.url).toEqual(ImageInputConstants.DEFAULT_IMAGE);
      });

      fit("Should clear inner errors", () => {
        const fileMock = getHugeFile('test.text', 1000);

        component.writeValue(fileMock);
        emitImage(fileMock);
        fixture.detectChanges();

        expect(component.isInnerInvalid).toBeTrue();
        expect(Object.keys(component.innerErrors).length).toEqual(1);

        const clearBtn = fixture.debugElement.query(By.css('sfc-close'));
        clearBtn.triggerEventHandler('click', { target: clearBtn.nativeElement });
        fixture.detectChanges();

        expect(component.isInnerInvalid).toBeFalse();
        expect(Object.keys(component.innerErrors).length).toEqual(0);
      });
    });
  });

  describe('Icon', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('label fa-icon svg.fa-circle-user')).toBeTruthy();
    });

    fit('Should have defined value', () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label fa-icon svg.fa-user')).toBeTruthy();
    });
  });

  describe('Helper text', () => {
    fit("Should be empty by default", () => {
      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have value", () => {
      const helperTextAssertValue = 'test helper text';
      component.helperText = helperTextAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
    });
  });

  describe('Modal', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('sfc-modal')).toBeNull();
    });

    fit('Should exist', () => {
      emitImage();

      expect(fixture.nativeElement.querySelector('sfc-modal')).toBeTruthy();
    });

    fit('Should have all related attributes', () => {
      emitImage();

      const modalEl = fixture.debugElement.query(By.css('sfc-modal'));

      expect(modalEl.componentInstance.defaultHeaderModel).toEqual(component.headerModalModel);
      expect(modalEl.componentInstance.defaultFooterModel).toEqual(component.footerModalModel);
      expect(modalEl.componentInstance.hideOnClickOutside).toBeFalse();
    });

    fit('Should image editor has all related attributes', () => {
      emitImage();

      const editorEl = fixture.debugElement.query(By.css('sfc-image-editor'));

      expect(editorEl.componentInstance.type).toEqual(component.type);
    });

    fit('Should call for crop', () => {
      const imageServiceSpy = spyOn((component as any).imageService, 'crop');

      emitImage();
      
      const okBtn = fixture.debugElement.query(By.css('sfc-default-modal-footer sfc-button'));
      okBtn.triggerEventHandler('click', { target: okBtn.nativeElement });
      fixture.detectChanges();

      expect(imageServiceSpy).toHaveBeenCalledTimes(1);
    });
  });

  function emitImage(image: File | null = null) {
    const fileInputEl = fixture.debugElement.query(By.css('input[type="file"]'));

    fileInputEl.triggerEventHandler('change', {
      target: {
        target: fileInputEl.nativeElement,
        files: { item: () => image ?? getHugeFile('test.png', 1000) }
      }
    });
    fixture.detectChanges();
  }

  function getHugeFile(name: string, size: number): File {
    const file = new File([''], name);
    Object.defineProperty(
      file, 'size', { value: size, writable: false });
    return file;
  }
});
