import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UIClass } from 'ngx-sfc-common';
import { CommonConstants, getCssLikeValue, getValueFromCssLikeValue } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { TextAreaInputComponent } from './text-area-input.component';

describe('Component: TextAreaInput', () => {
  let component: TextAreaInputComponent;
  let fixture: ComponentFixture<TextAreaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [InputReferenceDirective, TextAreaInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('textarea.text-input')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.right-side-info')).toBeTruthy();
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
  });

  describe('TextArea', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('textarea')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('textarea')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('textarea.text-input').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      const assertValue = 'test value';
      component.writeValue(assertValue);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('textarea.text-input').value).toEqual(assertValue);
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('textarea.text-input').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('textarea.text-input').disabled).toBeTrue();
    });

    fit("Should change value", () => {
      const value = 'trigger textarea event',
        textAreaEl = fixture.debugElement.query(By.css('textarea'));
      textAreaEl.triggerEventHandler('input', { target: { nativeElement: textAreaEl.nativeElement, value: value } });
      fixture.detectChanges();

      expect(textAreaEl.nativeElement.value).toEqual(value);
    });

    fit("Should add active class for label on focus event", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea'));
      textAreaEl.triggerEventHandler('focus', { target: textAreaEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should toggle placeholder value on focus event", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea')),
        placeholderAssertValue = 'test placeholder';
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(textAreaEl.nativeElement.placeholder).toEqual(placeholderAssertValue);

      textAreaEl.triggerEventHandler('focus', { target: textAreaEl.nativeElement });
      fixture.detectChanges();

      expect(textAreaEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should remove active class from label on blur event", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea'));
      textAreaEl.triggerEventHandler('focus', { target: textAreaEl.nativeElement });
      textAreaEl.triggerEventHandler('blur', { target: textAreaEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have appropriate height after keyUp event", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea')),
        initialHeight = textAreaEl.nativeElement.clientHeight;
      textAreaEl.triggerEventHandler('keydown.space', { target: textAreaEl.nativeElement });
      textAreaEl.triggerEventHandler('keyup', { target: textAreaEl.nativeElement });
      fixture.detectChanges();

      expect(getValueFromCssLikeValue(textAreaEl.nativeElement.style.height))
        .toEqual(getValueFromCssLikeValue(getCssLikeValue(initialHeight)) + 1); // border height
    });

    fit("Should have appropriate height after adding new word", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea'));
      inputWithKeyUp('first word', 'a');
      const initialHeight = textAreaEl.nativeElement.clientHeight;
      inputWithKeyUp('second word', 'a');
      const resultHeight = getValueFromCssLikeValue(textAreaEl.nativeElement.style.height);

      expect(resultHeight).toEqual(initialHeight + 1); // border height
    });

    fit("Should have appropriate height after removing line (press backspace)", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea'));
      inputWithKeyUp('first line \n', InputConstants.BACKSPACE_KEY);
      const initialHeight = textAreaEl.nativeElement.clientHeight;
      inputWithKeyUp('first line', InputConstants.BACKSPACE_KEY);
      const resultHeight = getValueFromCssLikeValue(textAreaEl.nativeElement.style.height);

      expect(resultHeight).toBeLessThan(initialHeight);
    });

    fit("Should have appropriate height after adding new line (press enter)", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea'));
      const initialHeight = textAreaEl.nativeElement.clientHeight;
      inputWithKeyUp('\n', InputConstants.ENTER_KEY);
      const resultHeight = getValueFromCssLikeValue(textAreaEl.nativeElement.style.height);

      expect(resultHeight).toBeGreaterThan(initialHeight);
    });
  });

  describe('Placeholder', () => {
    fit("Should be empty by default", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea'));
      expect(textAreaEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have value", () => {
      const placeholderAssertValue = "test placeholder",
        textAreaEl = fixture.debugElement.query(By.css('textarea'));
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(textAreaEl.nativeElement.placeholder).toEqual(placeholderAssertValue);
    });

    fit("Should be empty when input focused", () => {
      const placeholderAssertValue = "test placeholder",
        textAreaEl = fixture.debugElement.query(By.css('textarea'));
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      textAreaEl.triggerEventHandler('focus', { target: textAreaEl.nativeElement });
      fixture.detectChanges();

      expect(textAreaEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
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

    fit("Should be linked to input element", () => {
      const inputEl = fixture.nativeElement.querySelector('textarea.text-input');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    fit("Should be active, when placeholder exist", () => {
      component.placeholder = 'test placeholder';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should be active, when value defined", () => {
      component.writeValue('test value');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should be active, when input in focus", () => {
      const textAreaEl = fixture.debugElement.query(By.css('textarea'));
      textAreaEl.triggerEventHandler('focus', { target: textAreaEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
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

  function inputWithKeyUp(value: string, key: string) {
    const textAreaEl = fixture.debugElement.query(By.css('textarea'));
    textAreaEl.nativeElement.value = value;
    textAreaEl.triggerEventHandler('input', { target: textAreaEl.nativeElement });
    textAreaEl.triggerEventHandler('keyup', {
      target: textAreaEl.nativeElement,
      key: key
    });
    fixture.detectChanges();
  }
});
