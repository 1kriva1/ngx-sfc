import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, ShowHideElementDirective, UIConstants } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputNumberDirective, InputReferenceDirective } from '../../directives';
import { NumberInputComponent } from './number-input.component';
import { NumberSpinnerComponent } from './parts/spinner/number-spinner.component';

describe('Component: NumberInput', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, InputReferenceDirective, InputNumberDirective,
        NumberSpinnerComponent, NumberInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.component')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-number-spinner')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
    });

    fit('Should focus input on container click', () => {
      spyOn(component.inputElementRef.nativeElement, 'focus');

      fixture.debugElement.query(By.css('div.container'))
        .nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.inputElementRef.nativeElement.focus).toHaveBeenCalled();
    });

    fit('Should not be bordered', () => {
      expect(component.bordered).toBeFalse();
    });

    fit("Should hide lever next", () => {
      const prevLeverEl = fixture.debugElement.query(By.css('sfc-number-spinner .lever.next fa-icon'));

      expect(prevLeverEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
      expect(prevLeverEl.styles['opacity']).toEqual('1');

      component.disableNext = true;
      fixture.detectChanges();

      expect(prevLeverEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
      expect(prevLeverEl.styles['opacity']).toEqual('0');
    });

    fit("Should hide lever previous", () => {
      const prevLeverEl = fixture.debugElement.query(By.css('sfc-number-spinner .lever.previous fa-icon'));

      expect(prevLeverEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
      expect(prevLeverEl.styles['opacity']).toEqual('1');

      component.disablePrevious = true;
      fixture.detectChanges();

      expect(prevLeverEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
      expect(prevLeverEl.styles['opacity']).toEqual('0');
    });

    fit("Should have default value", () => {
      expect(component.spinnerModel.value).toEqual(0);
    });

    fit("Should have default value as min", () => {
      component.min = 10;

      expect(component.spinnerModel.value).toEqual(10);
    });

    fit("Should not have default value as min", () => {
      component.min = Number.MIN_SAFE_INTEGER;

      expect(component.spinnerModel.value).toEqual(0);
    });

    fit("Should have default value as value", () => {
      component.value = 4;

      expect(component.spinnerModel.value).toEqual(4);
    });

    fit("Should have default max", () => {
      expect(component.max).toEqual(Number.MAX_SAFE_INTEGER);
    });

    fit("Should have default min", () => {
      expect(component.min).toEqual(Number.MIN_SAFE_INTEGER);
    });

    fit("Should have default sign", () => {
      expect(component.sign).toBeTrue();
    });

    fit("Should call unsubscribe on resize observable, when component destroyed", () => {
      const unsubscribeSpy = spyOn(
        (component as any)._subscription,
        'unsubscribe'
      ).and.callThrough();

      component?.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('Input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input[type=number]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=number]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('input[type=number]').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      component.writeValue(4);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=number]').value).toEqual('4');
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input[type=number]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=number]').disabled).toBeTrue();
    });
  });

  describe('Label', () => {
    fit("Should not exist", () => {
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });

    fit("Should have defined value", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit("Should be linked to input element", () => {
      component.label = 'test label';
      fixture.detectChanges();

      const inputEl = fixture.nativeElement.querySelector('input[type=number]');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
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

  describe('Spinner', () => {
    fit("Should have defined model", () => {
      component.disabled = true;
      component.fixedActions = true;
      component.fixedWidth = true;
      component.max = 100;
      component.min = 2;
      component.step = 3;
      component.nextIcon = faUser;
      component.prevIcon = faUser;
      fixture.detectChanges();

      const spinnerComponent = fixture.debugElement.query(By.css('sfc-number-spinner')).componentInstance;

      expect(spinnerComponent.model).toEqual({
        disabled: true,
        fixedActions: true,
        fixedWidth: true,
        nextIcon: faUser,
        prevIcon: faUser,
        step: 3,
        value: 2,
        max: 100,
        min: 2,
        edit: false,
        disableNext: false,
        disablePrevious: false
      });
    });

    fit("Should change value", () => {
      fixture.nativeElement.querySelector('sfc-number-spinner .lever.next')
        .dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.value).toEqual(1);
    });

    fit("Should not change value by max validation", () => {
      component.value = 4;
      component.max = 4;
      fixture.detectChanges();

      fixture.nativeElement.querySelector('sfc-number-spinner .lever.next').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.value).toEqual(4);
    });

    fit("Should not change value by min validation", () => {
      component.value = 4;
      component.min = 4;
      fixture.detectChanges();

      fixture.nativeElement.querySelector('sfc-number-spinner .lever.previous').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(component.value).toEqual(4);
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

  describe('Edit', () => {
    fit('Should number input not exist', () => {
      component.edit = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=number]')).toBeNull();
    });

    fit('Should text input exist', () => {
      component.edit = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]')).toBeTruthy();
    });

    fit('Should text input has sfcnumberinput directive', () => {
      component.edit = true;
      fixture.detectChanges();

      const attributes = fixture.debugElement.query(By.css('input[type=text]')).attributes;

      expect(attributes['sfcNumberInput']).toBeDefined();
    });

    fit("Should have default id value", () => {
      component.edit = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.edit = true;
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have default value", () => {
      component.edit = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('0');
    });

    fit("Should have defined value", () => {
      component.edit = true;
      component.writeValue(4);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('4');
    });

    fit("Should not be disabled", () => {
      component.edit = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.edit = true;
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeTrue();
    });

    fit("Should update width on key up event", () => {
      component.edit = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]')),
        initialWidth = inputEl.nativeElement.style.width;

      inputEl.nativeElement.value = '123123';
      inputEl.triggerEventHandler('keyup', { target: inputEl.nativeElement });
      fixture.detectChanges();

      const newWidth = inputEl.nativeElement.style.width;

      expect(initialWidth != newWidth).toBeTrue();
      expect(newWidth).toEqual(`6${UIConstants.CSS_CH}`);
    });

    fit("Should update width on blur event", () => {
      component.edit = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]')),
        initialWidth = inputEl.nativeElement.style.width;

      inputEl.nativeElement.value = '13';
      inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
      fixture.detectChanges();

      const newWidth = inputEl.nativeElement.style.width;

      expect(initialWidth != newWidth).toBeTrue();
      expect(newWidth).toEqual(`2${UIConstants.CSS_CH}`);
    });

    fit("Should update width on value change", () => {
      component.edit = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]')),
        initialWidth = inputEl.nativeElement.style.width;

      component.writeValue(4);
      fixture.detectChanges();

      const newWidth = inputEl.nativeElement.style.width;

      expect(initialWidth != newWidth).toBeTrue();
      expect(newWidth).toEqual(`1${UIConstants.CSS_CH}`);
    });

    fit("Should update width on lever action", () => {
      component.edit = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]')),
        initialWidth = inputEl.nativeElement.style.width;

      fixture.nativeElement.querySelector('sfc-number-spinner .lever.next')
        .dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      const newWidth = inputEl.nativeElement.style.width;

      expect(initialWidth != newWidth).toBeTrue();
      expect(newWidth).toEqual(`1${UIConstants.CSS_CH}`);
    });

    fit("Should update width on value set", () => {
      component.edit = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]'));

      component.value = 4;
      component.ngAfterViewInit();
      fixture.detectChanges();


      expect(inputEl.nativeElement.style.width).toEqual(`1${UIConstants.CSS_CH}`);
    });

    fit("Should set value on input event", () => {
      component.edit = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      inputEl.nativeElement.value = '123';
      inputEl.nativeElement.dispatchEvent(new Event('input'));

      expect(component.value).toEqual(123);
    });

    fit("Should set previous value if new value is invalid on input event", () => {
      component.edit = true;
      component.min = 4;
      component.writeValue(4);
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      inputEl.nativeElement.value = '3';
      inputEl.nativeElement.dispatchEvent(new Event('input'));

      expect(component.value).toEqual(4);
    });

    fit("Should set value on paste event", () => {
      component.edit = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      inputEl.nativeElement.value = '123';
      inputEl.nativeElement.dispatchEvent(new Event('paste'));

      expect(component.value).toEqual(123);
    });

    fit("Should set previous value if new value is invalid on paste event", () => {
      component.edit = true;
      component.min = 4;
      component.writeValue(4);
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      inputEl.nativeElement.value = '3';
      inputEl.nativeElement.dispatchEvent(new Event('paste'));

      expect(component.value).toEqual(4);
    });
  });
});
