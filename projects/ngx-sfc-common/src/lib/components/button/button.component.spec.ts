import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UIClass } from '../../enums';
import { ButtonType } from './button-type.enum';
import { ButtonComponent } from './button.component';

describe('Component: Button', () => {

  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
      .compileComponents();
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
      expect(fixture.nativeElement.querySelector('a.button')).toBeDefined();
      expect(fixture.nativeElement.querySelector('a.button span')).toBeDefined();
    });
  });

  describe('Disabled', () => {
    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('a.button').className)
        .not.toContain(UIClass.Disabled);
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('a.button').className)
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
      expect(fixture.nativeElement.querySelector('i.icon.before')).toBeNull();
    });

    fit("Should have before icon", () => {
      component.iconBefore = 'fa fa-test';
      fixture.detectChanges();

      const iconBefore = fixture.nativeElement.querySelector('i.icon.before');

      expect(iconBefore).toBeDefined();
      expect(iconBefore.className).toContain('fa');
      expect(iconBefore.className).toContain('fa-test');
    });

    fit("Should not have after icon", () => {
      expect(fixture.nativeElement.querySelector('i.icon.after')).toBeNull();
    });

    fit("Should have after icon", () => {
      component.iconAfter = 'fa fa-test';
      fixture.detectChanges();

      const afterBefore = fixture.nativeElement.querySelector('i.icon.after');

      expect(afterBefore).toBeDefined();
      expect(afterBefore.className).toContain('fa');
      expect(afterBefore.className).toContain('fa-test');
    });

    fit("Should have before and after icons", () => {
      component.iconAfter = 'fa fa-test';
      component.iconBefore = 'fa fa-test';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('i.icon.after')).toBeDefined();
      expect(fixture.nativeElement.querySelector('i.icon.before')).toBeDefined();
    });
  });

  describe('Text', () => {
    fit("Should have default text", () => {
      expect(fixture.nativeElement.querySelector('span.text').innerText).toEqual('Button');
    });

    fit("Should have defined text", () => {
      component.text = 'Custom button';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.text').innerText)
        .toEqual(component.text);
    });
  });
});
