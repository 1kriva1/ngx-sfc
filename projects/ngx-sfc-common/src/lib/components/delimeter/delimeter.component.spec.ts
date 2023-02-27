import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants } from '../../constants';
import { Direction, UIClass } from '../../enums';
import { DelimeterComponent } from './delimeter.component';

describe('Component: Delimeter', () => {
  let component: DelimeterComponent;
  let fixture: ComponentFixture<DelimeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelimeterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelimeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
    });

    fit("Should have not empty class", () => {
      component.label = 'test';
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Empty);
    });

    fit("Should have empty class", () => {
      expect(fixture.nativeElement.className).toContain(UIClass.Empty);
    });
  });

  describe('Direction', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.className).toContain(Direction.Horizontal);
    });

    fit("Should have defined value", () => {
      component.direction = Direction.Vertical;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(Direction.Vertical);
    });
  });

  describe('Label', () => {
    fit("Should have default value", () => {
      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined value", () => {
      component.label = 'test';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(component.label);
    });
  });
});
