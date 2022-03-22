import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Direction, UIClass } from '../../enums';
import { DotsComponent } from './dots.component';

describe('Component: DotsComponent', () => {
  let component: DotsComponent;
  let fixture: ComponentFixture<DotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('div.dots-container')).toBeDefined();
      expect(fixture.nativeElement.querySelectorAll('div.dot').length).toEqual(3);
    });

    describe('Open', () => {
      fit("Should not have open class", () => {
        expect(fixture.nativeElement.className).not.toContain(UIClass.Open);
      });

      fit("Should have open class", () => {
        component.open = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(UIClass.Open);
      });

      fit("Should have open class, when toggle component", () => {
        expect(fixture.nativeElement.className).not.toContain(UIClass.Open);

        fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(UIClass.Open);

        fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
        fixture.detectChanges();

        expect(fixture.nativeElement.className).not.toContain(UIClass.Open);
      });
    });
  });

  describe('Direction', () => {
    fit("Should be horizontal", () => {
      expect(fixture.nativeElement.className).toContain(Direction.Horizontal);
      expect(fixture.nativeElement.className).not.toContain(Direction.Vertical);
    });

    fit("Should be vertical", () => {
      component.direction = Direction.Vertical;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(Direction.Vertical);
      expect(fixture.nativeElement.className).not.toContain(Direction.Horizontal);
    });
  });
});
