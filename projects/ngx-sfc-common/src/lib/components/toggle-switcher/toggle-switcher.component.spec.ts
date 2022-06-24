import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from '../../enums';
import { ToggleSwitcherComponent } from './toggle-switcher.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: ToggleSwitcherComponent', () => {
  let component: ToggleSwitcherComponent;
  let fixture: ComponentFixture<ToggleSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ToggleSwitcherComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.toggle')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.names')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('p.left')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('p.right')).toBeTruthy();
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

    fit("Should have active class, when toggle component", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);

      fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Active);

      fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Active);
    });
  });

  describe('Left model', () => {
    fit("Should have default value", () => {
      expect(component.leftModel).toEqual({ label: 'Left' });
      expect(fixture.nativeElement.querySelector('p.left').innerText).toEqual('Left');
    });

    fit("Should have defined value", () => {
      component.leftModel = { label: 'test left' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('p.left').innerText).toEqual('test left');
    });

    fit("Should not have icon", () => {
      expect(fixture.nativeElement.querySelector('p.left > fa-icon svg')).toBeNull();
    });

    fit("Should have icon", () => {
      component.leftModel = { label: 'test left', icon: faTShirt };
      fixture.detectChanges();

      const iconEl = fixture.nativeElement.querySelector('p.left > fa-icon svg');

      expect(iconEl).toBeTruthy();
      expect(iconEl.classList).toContain('fa-shirt');
    });
  });

  describe('Right model', () => {
    fit("Should have default value", () => {
      expect(component.rightModel).toEqual({ label: 'Right' });
      expect(fixture.nativeElement.querySelector('p.right').innerText).toEqual('Right');
    });

    fit("Should have defined value", () => {
      component.rightModel = { label: 'test right' };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('p.right').innerText).toEqual('test right');
    });

    fit("Should not have icon", () => {
      expect(fixture.nativeElement.querySelector('p.right > fa-icon svg')).toBeNull();
    });

    fit("Should have icon", () => {
      component.rightModel = { label: 'test right', icon: faTShirt };
      fixture.detectChanges();

      const iconEl = fixture.nativeElement.querySelector('p.right > fa-icon svg');

      expect(iconEl).toBeTruthy();
      expect(iconEl.classList).toContain('fa-shirt');
    });
  });
});
