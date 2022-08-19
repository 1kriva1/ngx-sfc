import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, ShowHideElementDirective } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { NumberInputComponent } from './number-input.component';
import { NumberSpinnerComponent } from './parts/spinner/number-spinner.component';

describe('Component: NumberInput', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, NumberSpinnerComponent, NumberInputComponent]
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
      expect(fixture.nativeElement.querySelector('input[type=number]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.component')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-number-spinner')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
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
        value: 0,
        max: 100,
        min: 2
      });
    });

    fit("Should change value", () => {
      fixture.nativeElement.querySelector('sfc-number-spinner .lever.next').dispatchEvent(new MouseEvent('click', {}));
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
});
