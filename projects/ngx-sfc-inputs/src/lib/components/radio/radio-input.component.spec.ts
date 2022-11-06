import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, Direction, UIClass } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { RadioInputComponent } from './radio-input.component';
import { RadioItemType } from './radio-input.enum';

describe('Component: RadioInput', () => {
  let component: RadioInputComponent;
  let fixture: ComponentFixture<RadioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [InputReferenceDirective, RadioInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioInputComponent);
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
      expect(fixture.nativeElement.querySelector('.radios')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
    });

    fit("Should have default class", () => {
      expect(fixture.nativeElement.className).toContain(Direction.Vertical);
    });

    fit("Should have vertical class", () => {
      component.direction = Direction.Vertical;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(Direction.Vertical);
    });

    fit("Should have horizontal class", () => {
      component.direction = Direction.Horizontal;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(Direction.Horizontal);
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

  describe('Label', () => {
    fit("Should not exist", () => {
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });

    fit("Should exist", () => {
      component.label = 'test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
    });

    fit("Should have active class constantly", () => {
      component.label = 'test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toContain(UIClass.Active);
    });

    fit("Should have defined value", () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });
  });

  describe('Radios', () => {
    fit('Should be empty', () => {
      expect(fixture.debugElement.queryAll(By.css('div.radio-container')).length).toEqual(0);
    });

    fit('Should not be empty', () => {
      component.items = [{ value: 1, label: 'test label' }];
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('div.radio-container')).length).toEqual(component.items.length);
    });

    fit('Should have several items', () => {
      component.items = [{ value: 1, label: 'test label1' }, { value: 2, label: 'test label2' }];
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('div.radio-container')).length).toEqual(2);
    });

    describe('Input', () => {
      fit("Should have default id value", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('input[type=radio]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined-1`);
      });

      fit("Should have defined id value", () => {
        component.items = [{ value: 1, label: 'test label' }];
        component.id = 'test-id';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('input[type=radio]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id-1`);
      });

      fit("Should have defined value", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').value).toEqual('1');
      });

      fit("Should not be disabled", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').disabled).toBeFalse();
      });

      fit("Should be disabled", () => {
        component.items = [{ value: 1, label: 'test label' }];
        component.disabled = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').disabled).toBeTrue();
      });

      fit("Should be disabled by item", () => {
        component.items = [{ value: 1, label: 'test label', disabled: true }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').disabled).toBeTrue();
      });

      fit("Should not be checked", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').checked).toBeFalse();
      });

      fit("Should be checked", () => {
        component.items = [{ value: 1, label: 'test label' }];
        component.writeValue(1);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').checked).toBeTrue();
      });

      fit("Should be checked by default", () => {
        component.items = [{ value: 1, label: 'test label', default: true }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').checked).toBeTrue();
      });

      fit("Should change value", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').checked).toBeFalse();

        const inputEl = fixture.debugElement.query(By.css('input[type=radio]'));
        inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, checked: 1 } });
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio]').checked).toBeTrue();
      });
    });

    describe('Label', () => {
      fit("Should be linked to input element", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        const inputEl = fixture.nativeElement.querySelector('input[type=radio]');
        expect(inputEl.labels).toBeDefined();
        expect(inputEl.labels.length).toEqual(1);
        expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
      });

      fit("Should have circle type", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        const labelEl = fixture.nativeElement.querySelector('input[type=radio] +label div');

        expect(labelEl.className).toEqual(RadioItemType.Circle);
      });

      fit("Should have icon type", () => {
        component.items = [{ value: 1, label: 'test label', icon: faUser }];
        fixture.detectChanges();

        const labelEl = fixture.nativeElement.querySelector('input[type=radio] +label div');

        expect(labelEl.className).toEqual(RadioItemType.Icon);
      });

      fit("Should exist circle radio", () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div.radio')).toBeTruthy();
      });

      fit("Should exist icon radio", () => {
        component.items = [{ value: 1, label: 'test label', icon: faUser }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio] +label div fa-icon')).toBeTruthy();
      });

      fit('Should icon radio has defined value', () => {
        component.items = [{ value: 1, label: 'test label', icon: faUser }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio] +label div fa-icon svg.fa-user')).toBeTruthy();
      });

      fit('Should have defined label', () => {
        component.items = [{ value: 1, label: 'test label' }];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type=radio] +label span').innerText).toEqual(component.items[0].label);
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
