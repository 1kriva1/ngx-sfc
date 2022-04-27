import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from 'ngx-sfc-common';
import { SliderButtonType } from './slider-button-type.enum';
import { SliderButtonComponent } from './slider-button.component';

describe('Component: SliderButtonComponent', () => {
  let component: SliderButtonComponent;
  let fixture: ComponentFixture<SliderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('i')).toBeTruthy();
    });
  });

  describe('Icon', () => {
    fit('Should have next icon as default', () => {
      expect(fixture.nativeElement.querySelector('i.fa.fa-arrow-right')).toBeTruthy();
    });

    fit('Should have next icon as defined', () => {
      component.type = SliderButtonType.Next;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('i.fa.fa-arrow-right')).toBeTruthy();
    });

    fit('Should have previous icon as defined', () => {
      component.type = SliderButtonType.Previous;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('i.fa.fa-arrow-left')).toBeTruthy();
    });
  });

  describe('Active', () => {
    fit("Should not have active class", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit("Should have active class", () => {
      component.active = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);
    });
  });

  describe('Type', () => {
    fit("Should have Next class", () => {
      expect(fixture.nativeElement.className).toContain(SliderButtonType.Next);
    });

    fit("Should have Previous class", () => {
      component.type = SliderButtonType.Previous;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(SliderButtonType.Previous);
    });
  });
});
