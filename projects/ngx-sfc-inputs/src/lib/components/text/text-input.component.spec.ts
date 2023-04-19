import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { TextInputComponent } from './text-input.component';
import { TextType } from './text-type.enum';

describe('Component: TextInput', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, InputReferenceDirective, TextInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.input')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input.text-input')).toBeTruthy();
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

  describe('Password', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('.password-icon')).toBeNull();
    });

    fit('Should exist', () => {
      component.type = TextType.Password;
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.password-icon')).toBeTruthy();
    });

    fit('Should have eye icon', () => {
      component.type = TextType.Password;
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.password-icon svg.fa-eye')).toBeTruthy();
    });

    fit('Should have eye-slash icon', () => {
      component.type = TextType.Password;
      component.ngOnInit();
      fixture.detectChanges();

      const passwordIconEl = fixture.debugElement.query(By.css('.password-icon'));
      passwordIconEl.triggerEventHandler('click', { target: passwordIconEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.password-icon svg.fa-eye-slash')).toBeTruthy();
    });

    fit('Should toggle icon', () => {
      component.type = TextType.Password;
      component.ngOnInit();
      fixture.detectChanges();

      const passwordIconEl = fixture.debugElement.query(By.css('.password-icon'));
      passwordIconEl.triggerEventHandler('click', { target: passwordIconEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.password-icon svg.fa-eye-slash')).toBeTruthy();

      passwordIconEl.triggerEventHandler('click', { target: passwordIconEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.password-icon svg.fa-eye')).toBeTruthy();
    });
  });

  describe('Input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit("Should have defined id value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit("Should have default type", () => {
      expect(fixture.debugElement.query(By.css('input')).nativeElement.type).toEqual(TextType.Text);
    });

    fit("Should have defined type", () => {
      const typeAssertValue = 'email';
      component.type = typeAssertValue;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input')).nativeElement.type).toEqual(typeAssertValue);
    });

    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('input.text-input').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      const assertValue = 'test value';
      component.writeValue(assertValue);
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

    fit("Should add active class for label on focus event", () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit("Should toggle placeholder value on focus event", () => {
      const inputEl = fixture.debugElement.query(By.css('input')),
        placeholderAssertValue = 'test placeholder';
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(inputEl.nativeElement.placeholder).toEqual(placeholderAssertValue);

      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should remove active class from label on blur event", () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should change value", () => {
      const value = 'trigger input event',
        inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
      fixture.detectChanges();

      expect(inputEl.nativeElement.value).toEqual(value);
    });
  });

  describe('Placeholder', () => {
    fit("Should be empty by default", () => {
      const inputEl = fixture.nativeElement.querySelector('input');
      expect(inputEl.placeholder).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have value", () => {
      const placeholderAssertValue = "test placeholder",
        inputEl = fixture.nativeElement.querySelector('input');
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(inputEl.placeholder).toEqual(placeholderAssertValue);
    });

    fit("Should be empty when input focused", () => {
      const placeholderAssertValue = "test placeholder",
        inputEl = fixture.debugElement.query(By.css('input'));
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
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
      const inputEl = fixture.nativeElement.querySelector('input.text-input');
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
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
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

  describe('Characters counter', () => {
    fit("Should be hidden", () => {
      expect(fixture.nativeElement.querySelector('span.right-side-info').style.visibility).toEqual(UIClass.Hidden);
    });
  });
});
