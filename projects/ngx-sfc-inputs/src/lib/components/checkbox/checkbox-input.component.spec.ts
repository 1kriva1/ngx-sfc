import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CheckmarkComponent, CheckmarkType, CommonConstants, ShowHideElementDirective } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { CheckboxInputComponent } from './checkbox-input.component';

describe('Component: CheckboxInput', () => {
  let component: CheckboxInputComponent;
  let fixture: ComponentFixture<CheckboxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, CheckmarkComponent, InputReferenceDirective, CheckboxInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxInputComponent);
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
      expect(fixture.nativeElement.querySelector('sfc-checkmark')).toBeTruthy();
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

  describe('Checkmark', () => {
    fit('Should have default attributes value', () => {
      const checkMark = fixture.debugElement.query(By.css('sfc-checkmark')).componentInstance;

      expect(checkMark.type).toEqual(CheckmarkType.Square);
      expect(checkMark.disabled).toBeFalse();
      expect(checkMark.showNotActive).toBeFalse();
      expect(checkMark.active).toBeFalse();
    });

    fit("Should not be disabled", () => {
      expect(fixture.debugElement.query(By.css('sfc-checkmark')).componentInstance.disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark')).componentInstance.disabled).toBeTrue();
    });

    fit("Should have defined checkmark type", () => {
      component.checkmarkType = CheckmarkType.Rounded;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark')).componentInstance.type).toEqual(CheckmarkType.Rounded);
    });

    fit("Should change value", () => {
      const checkMark = fixture.debugElement.query(By.css('sfc-checkmark')).componentInstance;

      component.writeValue(true);
      fixture.detectChanges();

      expect(checkMark.active).toBeTrue();

      fixture.nativeElement.querySelector('sfc-checkmark').dispatchEvent(new MouseEvent('click', {}));
      fixture.detectChanges();

      expect(checkMark.active).toBeFalse();
    });
  });

  describe('Label', () => {
    describe('Common', () => {
      fit("Should not exist", () => {
        expect(fixture.nativeElement.querySelector('label')).toBeNull();
      });

      fit("Should have defined value", () => {
        const labelAssertValue = 'test label';
        component.label = labelAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
      });

      fit("Should have tabindex", () => {
        const labelAssertValue = 'test label';
        component.label = labelAssertValue;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('label')).attributes['tabindex']).toEqual('0');
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

    describe('Side', () => {
      fit("Should not exist", () => {
        expect(fixture.nativeElement.querySelector('label')).toBeNull();
      });

      fit("Should have defined value", () => {
        const labelAssertValue = 'test label';
        component.sideLabel = labelAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
      });

      fit("Should have tabindex", () => {
        const labelAssertValue = 'test label';
        component.sideLabel = labelAssertValue;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('label')).attributes['tabindex']).toEqual('0');
      });

      fit("Should have side-label class", () => {
        const labelAssertValue = 'test label';
        component.sideLabel = labelAssertValue;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.content').className).toContain('side-label');
      });

      fit("Should be linked to input element", () => {
        component.sideLabel = 'test label';
        fixture.detectChanges();

        const inputEl = fixture.nativeElement.querySelector('input[type=checkbox]');
        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(1);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
      });
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
