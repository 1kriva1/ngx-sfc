import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, IconComponent, UIClass } from 'ngx-sfc-common';
import { BubbleComponent } from './bubble.component';

describe('Component: Bubble', () => {
  let component: BubbleComponent;
  let fixture: ComponentFixture<BubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [IconComponent, BubbleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.bubble')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content > span')).toBeTruthy();
    });

    fit('Should have default model', () => {
      expect(component.model).toEqual({
        key: CommonConstants.DEFAULT_KEY_VALUE,
        label: CommonConstants.EMPTY_STRING,
        active: false,
        disabled: false
      });
    });
  });

  describe('Disabled', () => {
    fit("Should not be disabled by default", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Disabled);
    });

    fit("Should be disabled", () => {
      component.model.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Disabled);
    });

    fit("Should not be disabled", () => {
      component.model.disabled = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Disabled);
    });
  });

  describe('Active', () => {
    fit("Should not be active by default", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit("Should be active", () => {
      component.model.active = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);
    });

    fit("Should not be active", () => {
      component.model.active = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });
  });

  describe('Content', () => {
    describe('Label', () => {
      fit("Should have default value", () => {
        expect(fixture.debugElement.query(By.css('.content > span')).nativeElement.innerText).toEqual(CommonConstants.EMPTY_STRING);
      });

      fit("Should have defined value", () => {
        component.model.label = 'test value';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.content > span')).nativeElement.innerText).toEqual(component.model.label);
      });
    });

    describe('Icon', () => {
      fit('Should not exist', () => {
        expect(fixture.nativeElement.querySelector('sfc-icon')).toBeNull();
      });

      fit('Should exist when icon', () => {
        component.model.icon = faTShirt;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-icon')).toBeTruthy();
      });

      fit('Should exist when image', () => {
        component.model.imageSrc = 'test.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-icon')).toBeTruthy();
      });

      fit('Should have defined icon', () => {
        component.model.icon = faTShirt;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-icon fa-icon svg').classList).toContain('fa-shirt');
      });

      fit('Should have defined image', () => {
        component.model.imageSrc = 'test.png';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-icon img').src).toContain(component.model.imageSrc);
      });
    });
  });

  describe('Check', () => {
    fit("Should emit event", () => {
      spyOn(component.check, 'emit');

      fixture.debugElement.triggerEventHandler('click', { target: fixture.debugElement.nativeElement });
      fixture.detectChanges();

      expect(component.check.emit).toHaveBeenCalled();
    });

    fit("Should emit value in event", () => {
      spyOn(component.check, 'emit');

      fixture.debugElement.triggerEventHandler('click', { target: fixture.debugElement.nativeElement });
      fixture.detectChanges();

      expect(component.check.emit).toHaveBeenCalledWith(component.model);
    });
  });
});
