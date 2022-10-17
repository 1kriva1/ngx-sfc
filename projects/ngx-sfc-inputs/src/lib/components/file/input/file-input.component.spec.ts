import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ComponentSizeDirective } from 'ngx-sfc-common';
import { ButtonType, CloseComponent, CommonConstants } from 'ngx-sfc-common';
import { ButtonComponent } from 'ngx-sfc-common';
import { InputConstants } from '../../../constants/input.constants';
import { InputReferenceDirective } from '../../../directives';
import { FileInputConstants } from '../file-input.constants';
import { FileInputComponent } from './file-input.component';

describe('Component: FileInput', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ComponentSizeDirective, ButtonComponent, CloseComponent, InputReferenceDirective, FileInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input[type="file"]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input.text-input')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.right-side-info')).toBeTruthy();
    });
  });

  describe('File button', () => {
    fit("Should exist when icon not defined", () => {
      expect(fixture.nativeElement.querySelector('sfc-button')).toBeTruthy();
    });

    fit("Should not exist when icon defined", () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-button')).toBeNull();
    });

    fit('Should have constant text', () => {
      expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.text).toEqual('File');
    });

    fit('Should have constant types', () => {
      expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
    });

    fit("Should not be disabled", () => {
      expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.disabled).toBeTrue();
    });
  });

  describe('File input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input[type="file"]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type="file"]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input[type="file"]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type="file"]').disabled).toBeTrue();
    });

    fit("Should have default title", () => {
      expect(fixture.nativeElement.querySelector('input[type="file"]').title).toEqual(FileInputConstants.NO_FILE_TITLE);
    });

    fit("Should have value defined title", () => {
      const assertFileName = 'test.png';
      component.writeValue(getHugeFile(assertFileName, 100));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type="file"]').title).toEqual(assertFileName);
    });

    fit("Should change value", () => {
      const assertFileName = 'test.png',
        assertFileSize = 1000,
        testFile = getHugeFile(assertFileName, assertFileSize),
        fileInputEl = fixture.debugElement.query(By.css('input[type="file"]')),
        textInputEl = fixture.debugElement.query(By.css('input.text-input'));

      fileInputEl.triggerEventHandler('change', {
        target: {
          target: fileInputEl.nativeElement,
          files: {
            item: function () {
              return testFile;
            }
          }
        }
      });

      fixture.detectChanges();

      expect(textInputEl.nativeElement.value).toEqual(assertFileName);
      expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual('1000 Bytes');
    });
  });

  describe('Icon', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('fa-icon.icon')).toBeNull();
    });

    fit('Should exist', () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon.icon')).toBeTruthy();
    });

    fit('Should have defined value', () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon.icon svg.fa-user')).toBeTruthy();
    });
  });

  describe('Text input', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('input.text-input').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      const assertValue = 'test value';
      component.writeValue(getHugeFile(assertValue, 100));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input.text-input').value).toEqual(assertValue);
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input.text-input').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input.text-input').disabled).toBeTrue();
    });
  });

  describe('Placeholder', () => {
    fit("Should be empty by default", () => {
      const inputEl = fixture.nativeElement.querySelector('input.text-input');
      expect(inputEl.placeholder).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have value", () => {
      const placeholderAssertValue = "test placeholder",
        inputEl = fixture.nativeElement.querySelector('input.text-input');
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(inputEl.placeholder).toEqual(placeholderAssertValue);
    });
  });

  describe('Label', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit("Should be linked to file input element", () => {
      const inputEl = fixture.nativeElement.querySelector('input[type="file"]');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    fit("Should be active always", () => {
      expect(fixture.nativeElement.querySelector('label.active')).toBeTruthy();
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

  describe('File size', () => {
    fit("Should be empty by default", () => {
      expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have value", () => {
      component.writeValue(getHugeFile('test.png', 100));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual('100 Bytes');
    });
  });

  describe('Clear button', () => {
    fit("Should not exist when value not defined", () => {
      expect(fixture.nativeElement.querySelector('sfc-close')).toBeNull();
    });

    fit("Should not exist when clear is false", () => {
      component.writeValue(getHugeFile('test.png', 100));
      component.clear = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-close')).toBeNull();
    });

    fit("Should exist with permanent class", () => {
      component.writeValue(getHugeFile('test.png', 100));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-close.clear-button')).toBeTruthy();
    });

    fit("Clear Button: clear data event", () => {
      const testFile = getHugeFile('test.png', 1000);
      component.writeValue(testFile);
      fixture.detectChanges();

      const debugClearBtnEl = fixture.debugElement.query(By.css('sfc-close.clear-button'));
      debugClearBtnEl.nativeElement.click();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input.text-input').value).toEqual(CommonConstants.EMPTY_STRING);
      expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });
  });

  function getHugeFile(name: string, size: number): File {
    const file = new File([''], name);
    Object.defineProperty(
      file, 'size', { value: size, writable: false });
    return file;
  }
});