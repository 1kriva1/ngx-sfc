import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckmarkComponent, DelimeterComponent, MouseDownDirective, ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { SelectItemComponent } from './select-item.component';
import { SelectItemConstants } from './select-item.constants';

describe('Component: SelectItem', () => {
  let component: SelectItemComponent;
  let fixture: ComponentFixture<SelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, MouseDownDirective, DelimeterComponent, CheckmarkComponent, SelectItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
    });

    fit('Should exist text', () => {
      component.item = { key: 0, value: 'Test value' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
    });

    fit('Should have defined text', () => {
      component.item = { key: 0, value: 'Test value' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(component.item.value);
    });

    fit('Should not exist image', () => {
      expect(fixture.nativeElement.querySelector('img')).toBeNull();
    });

    fit('Should exist image', () => {
      component.item = { key: 0, value: 'Test value', image: '/test.png' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    });

    fit('Should image has defined src', () => {
      component.item = { key: 0, value: 'Test value', image: '/test.png' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img').src).toContain(component.item.image);
    });
  });

  describe('Host classes', () => {
    fit("Should not have active class by default", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit("Should have active class", () => {
      component.active = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);
    });

    fit("Should not have has group class by default", () => {
      expect(fixture.nativeElement.className).not.toContain(SelectItemConstants.HAS_GROUP_CLASS);
    });

    fit("Should have has group class", () => {
      component.hasGroup = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(SelectItemConstants.HAS_GROUP_CLASS);
    });

    fit("Should not have group class", () => {
      expect(fixture.nativeElement.className).not.toContain(SelectItemConstants.GROUP_CLASS);
    });

    fit("Should have has group class", () => {
      component.item = { value: 'Test value', group: true };
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(SelectItemConstants.GROUP_CLASS);
    });

    fit("Should not have multiple class by default", () => {
      expect(fixture.nativeElement.className).not.toContain(SelectItemConstants.MULTIPLE_CLASS);
    });

    fit("Should have multiple class", () => {
      component.multiple = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(SelectItemConstants.MULTIPLE_CLASS);
    });

    fit("Should not have default class, when key is not null", () => {
      component.item = { key: 1, value: 'Test value' };
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Default);
    });

    fit("Should not have default class, item is group", () => {
      component.item = { value: 'Test value', group: true };
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Default);
    });

    fit("Should have default class", () => {
      component.item = { key: null, value: 'Test value' };
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Default);
    });
  });

  describe('Delimeter', () => {
    fit('Should not exist delimeter', () => {
      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
    });

    fit('Should exist delimeter', () => {
      component.item = { value: 'Test value', group: true };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
    });
  });

  describe('Checkmark', () => {
    fit('Should not exist checkmark, when not multiple', () => {
      expect(fixture.nativeElement.querySelector('sfc-checkmark.sfc-default-theme')).toBeNull();
    });

    fit('Should not exist checkmark, when default', () => {
      component.item = { key: null, value: 'Test value' };
      component.multiple = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-checkmark.sfc-default-theme')).toBeNull();
    });

    fit('Should exist checkmark', () => {
      component.item = { key: 1, value: 'Test value' };
      component.multiple = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-checkmark.sfc-default-theme')).toBeTruthy();
    });

    fit('Should checkmark be not active', () => {
      component.item = { key: 1, value: 'Test value' };
      component.multiple = true;
      fixture.detectChanges();


      expect(fixture.debugElement.query(By.css('sfc-checkmark.sfc-default-theme')).componentInstance.active).toBeFalse();
    });

    fit('Should checkmark be active', () => {
      component.item = { key: 1, value: 'Test value' };
      component.multiple = true;
      component.active = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-checkmark.sfc-default-theme')).componentInstance.active).toBeTrue();
    });
  });

  describe('Select', () => {
    fit('Should emit selected event', () => {
      spyOn(component.selected, 'emit');

      component.item = { key: 0, value: 'test 1' };

      const el = fixture.debugElement.query(By.css('div'));
      fixture.debugElement.query(By.css('div')).triggerEventHandler('mousedown', new MouseEvent('mousedown'));

      expect(component.selected.emit).toHaveBeenCalledOnceWith(component.item);
    });

    fit('Should not emit selected event', () => {
      spyOn(component.selected, 'emit');

      component.item = { value: 'test 1', group: true };

      const el = fixture.debugElement.query(By.css('div'));
      fixture.debugElement.query(By.css('div')).triggerEventHandler('mousedown', new MouseEvent('mousedown'));

      expect(component.selected.emit).not.toHaveBeenCalled();
    });

    fit("Should prevent default, when group", () => {
      component.item = { value: 'test 1', group: true };

      const buttonEl = fixture.debugElement.query(By.css('div')),
        event: MouseEvent = new MouseEvent('mousedown');

      spyOn(event, 'preventDefault');

      buttonEl.triggerEventHandler('mousedown', event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    fit("Should prevent default, when multiple and not default", () => {
      component.multiple = true;
      component.item = { key: 1, value: 'test 1' };

      const buttonEl = fixture.debugElement.query(By.css('div')),
        event: MouseEvent = new MouseEvent('mousedown');

      spyOn(event, 'preventDefault');

      buttonEl.triggerEventHandler('mousedown', event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    fit("Should not prevent default", () => {
      component.multiple = true;
      component.item = { key: null, value: 'test 1' };

      const buttonEl = fixture.debugElement.query(By.css('div')),
        event: MouseEvent = new MouseEvent('mousedown');

      spyOn(event, 'preventDefault');

      buttonEl.triggerEventHandler('mousedown', event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });
});
