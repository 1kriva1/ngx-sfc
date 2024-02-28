import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from '../../enums';
import { ToggleComponent } from './toggle.component';

describe('Component: Toggle', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeDefined();
      expect(fixture.nativeElement.querySelector('label')).toBeDefined();
    });

    fit("Should toggle active state", () => {
      expect(component.active).toBeFalse();

      fixture.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.active).toBeTrue();
  });
  });

  describe('Active class', () => {
    fit("Should not have active class", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });

    fit("Should have active class", () => {
      component.active = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);
    });
  });

  describe('Disabled class', () => {
    fit("Should not have disabled class", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Disabled);
    });

    fit("Should have disabled class", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Disabled);
    });
  });
});