import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CloseComponent, CommonConstants } from 'ngx-sfc-common';
import { InputConstants } from '../../../constants/input.constants';
import { InputReferenceDirective } from '../../../directives';
import { FileInputConstants } from '../file-input.constants';
import { InlineFileInputComponent } from './inline-file-input.component';

describe('Component: InlineFileInput', () => {
  let component: InlineFileInputComponent;
  let fixture: ComponentFixture<InlineFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CloseComponent, InputReferenceDirective, InlineFileInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineFileInputComponent);
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
      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('label span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
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

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input[type="file"]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type="file"]').disabled).toBeTrue();
    });
  });

  describe('Label', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(FileInputConstants.DEFAULT_PLACEHOLDER);
    });

    fit("Should have defined value", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit("Should have defined value by placeholder", () => {
      const placeholderAssertValue = 'test label';
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(placeholderAssertValue);
    });

    fit("Should have defined value by file name", () => {
      const assertFileName = 'test.png';
      component.writeValue(getHugeFile(assertFileName, 100));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(assertFileName);
    });

    fit("Should have empty value", () => {
      const assertFileName = 'test.png';
      component.writeValue(getHugeFile(assertFileName, 100));
      component.placeholder = 'placeholder';
      component.label = 'label';
      component.showFileName = false
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should be linked to file input element", () => {
      const inputEl = fixture.nativeElement.querySelector('input[type="file"]');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    fit("Should have default title", () => {
      expect(fixture.nativeElement.querySelector('label').title).toEqual(FileInputConstants.NO_FILE_TITLE);
    });

    fit("Should have value defined title", () => {
      const assertFileName = 'test.png';
      component.writeValue(getHugeFile(assertFileName, 100));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').title).toEqual(assertFileName);
    });
  });

  describe('Icon', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('.icon')).toBeNull();
    });

    fit('Should exist', () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.icon')).toBeTruthy();
    });

    fit('Should have defined value', () => {
      component.icon = faUser;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.icon svg.fa-user')).toBeTruthy();
    });

    fit('Should have default icon', () => {
      component.defaultIcon = true;
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.icon svg.fa-upload')).toBeTruthy();
    });

    fit('Should have default icon, when icon not provided and file name is hide', () => {
      component.showFileName = false;
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.icon svg.fa-upload')).toBeTruthy();
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

      expect(fixture.nativeElement.querySelector('label span').textContent).toEqual(FileInputConstants.DEFAULT_PLACEHOLDER);
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
});

function getHugeFile(name: string, size: number): File {
  const file = new File([''], name);
  Object.defineProperty(
    file, 'size', { value: size, writable: false });
  return file;
}