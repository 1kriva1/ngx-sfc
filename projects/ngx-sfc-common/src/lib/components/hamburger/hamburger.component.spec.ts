import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from '../../enums';
import { HamburgerComponent } from './hamburger.component';

describe('Component: HamburgerComponent', () => {
  let component: HamburgerComponent;
  let fixture: ComponentFixture<HamburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('div.line').length).toEqual(3);
      expect(fixture.nativeElement.querySelector('div.line.start')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.line.end')).toBeTruthy();
    });
  });

  describe('Open', () => {
    fit("Should not have open class", () => {
      expect(fixture.nativeElement.className).not.toEqual(UIClass.Open);
    });

    fit("Should have open class", () => {
      component.open = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toEqual(UIClass.Open);
    });

    fit("Should have open class, when toggle component", () => {
      expect(fixture.nativeElement.className).not.toEqual(UIClass.Open);

      fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toEqual(UIClass.Open);

      fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toEqual(UIClass.Open);
    });
  });
});
