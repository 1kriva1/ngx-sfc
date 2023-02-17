import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from '../../enums';
import { ButtonType } from './button-type.enum';
import { ButtonComponent } from './button.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonConstants } from '../../constants';

describe('Component: Button', () => {

  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('a.button')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('a.button span')).toBeTruthy();
    });
  });

  describe('Disabled', () => {
    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.className)
        .not.toContain(UIClass.Disabled);
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className)
        .toContain(UIClass.Disabled);
    });
  });

  describe('Button types', () => {
    fit("Should have default type", () => {
      expect(fixture.nativeElement.querySelector(`a.button.${ButtonType.Bordered}`)).toBeDefined();
    });

    fit("Should have defined type", () => {
      component.types = [ButtonType.Filled];
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector(`a.button.${ButtonType.Filled}`)).toBeDefined();
    });

    fit("Should have several defined types", () => {
      component.types = [ButtonType.Filled, ButtonType.Rounded];
      fixture.detectChanges();

      expect(fixture.nativeElement
        .querySelector(`a.button.${ButtonType.Filled}.${ButtonType.Rounded}`))
        .toBeDefined();
    });
  });

  describe('Icons', () => {
    fit("Should not have before icon", () => {
      expect(fixture.nativeElement.querySelector('fa-icon.icon.before')).toBeNull();
    });

    fit("Should have before icon", () => {
      component.iconBefore = faTShirt;
      fixture.detectChanges();

      const iconBefore = fixture.nativeElement.querySelector('fa-icon.icon.before svg');

      expect(iconBefore).toBeTruthy();
      expect(iconBefore.classList).toContain('fa-shirt');
    });

    fit("Should not have after icon", () => {
      expect(fixture.nativeElement.querySelector('fa-icon.icon.after')).toBeNull();
    });

    fit("Should have after icon", () => {
      component.iconAfter = faTShirt;
      fixture.detectChanges();

      const afterBefore = fixture.nativeElement.querySelector('fa-icon.icon.after svg');

      expect(afterBefore).toBeDefined();
      expect(afterBefore.classList).toContain('fa-shirt');
    });

    fit("Should have before and after icons", () => {
      component.iconAfter = faTShirt;
      component.iconBefore = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon.icon.after')).toBeDefined();
      expect(fixture.nativeElement.querySelector('fa-icon.icon.before')).toBeDefined();
    });
  });

  describe('Text', () => {
    fit("Should have default text", () => {
      expect(fixture.nativeElement.querySelector('span.text').innerText).toEqual('Button');
    });

    fit("Should not have default text, if before icon defined", () => {
      component.iconBefore = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.text').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should not have default text, if after icon defined", () => {
      component.iconAfter = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.text').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined text", () => {
      component.text = 'Custom button';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.text').innerText)
        .toEqual(component.text);
    });
  });
});
