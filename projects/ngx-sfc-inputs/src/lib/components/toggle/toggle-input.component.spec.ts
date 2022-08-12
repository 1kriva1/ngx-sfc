import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, ToggleSwitcherComponent } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { ToggleInputComponent } from './toggle-input.component';

describe('Component: ToggleInput', () => {
  let component: ToggleInputComponent;
  let fixture: ComponentFixture<ToggleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ToggleSwitcherComponent, InputReferenceDirective, ToggleInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input[type=checkbox]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-toggle-switcher')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();

    });
  });

  describe('Input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input[type=checkbox]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=checkbox]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('input[type=checkbox]').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      const assertValue = true;
      component.writeValue(assertValue);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=checkbox]').value).toEqual(assertValue.toString());
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input[type=checkbox]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=checkbox]').disabled).toBeTrue();
    });

    fit("Should not be checked", () => {
      expect(fixture.nativeElement.querySelector('input[type=checkbox]').checked).toBeFalse();
    });

    fit("Should be checked", () => {
      component.writeValue(true);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=checkbox]').checked).toBeTrue();
    });

    fit("Should change value", () => {
      const value = true,
        inputEl = fixture.debugElement.query(By.css('input[type=checkbox]'));
      inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, checked: value } });
      fixture.detectChanges();

      expect(inputEl.nativeElement.value).toEqual(value.toString());
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

    fit("Should have defined placeholder value", () => {
      const labelAssertValue = 'test placeholder';
      component.placeholder = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit("Should be linked to input element", () => {
      component.label = 'test label';
      fixture.detectChanges();

      const inputEl = fixture.nativeElement.querySelector('input[type=checkbox]');
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

  describe('Toggle', () => {
    fit('Should have default attributes value', () => {
      const toggleSwitcher = fixture.debugElement.query(By.css('sfc-toggle-switcher')).componentInstance;

      expect(toggleSwitcher.disabled).toBeFalse();
      expect(toggleSwitcher.leftModel).toEqual({ label: '', icon: faTimes });
      expect(toggleSwitcher.rightModel).toEqual({ label: '', icon: faCheck });
      expect(toggleSwitcher.active).toBeFalse();
    });

    fit("Should not be disabled", () => {
      expect(fixture.debugElement.query(By.css('sfc-toggle-switcher')).componentInstance.disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-toggle-switcher')).componentInstance.disabled).toBeTrue();
    });

    fit("Should have defined models", () => {
      component.leftModel = { label: 'Left test', icon: faUser };
      component.rightModel = { label: 'Right test', icon: faUser };
      fixture.detectChanges();

      const toggleSwitcher = fixture.debugElement.query(By.css('sfc-toggle-switcher')).componentInstance;

      expect(toggleSwitcher.leftModel).toEqual(component.leftModel);
      expect(toggleSwitcher.rightModel).toEqual(component.rightModel);
    });

    fit("Should change value", () => {
      const toggleSwitcher = fixture.debugElement.query(By.css('sfc-toggle-switcher')).componentInstance;

      component.writeValue(true);
      fixture.detectChanges();

      expect(toggleSwitcher.active).toBeTrue();

      fixture.nativeElement.querySelector('sfc-toggle-switcher').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(toggleSwitcher.active).toBeFalse();
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
