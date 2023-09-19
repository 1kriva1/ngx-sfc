import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from '../../enums';
import { CheckmarkComponent } from './checkmark.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckmarkType } from './checkmark-type.enum';
import { ShowHideElementDirective } from '../../directives';
import { UIConstants } from '../../constants';

describe('Component: CheckmarkComponent', () => {
  let component: CheckmarkComponent;
  let fixture: ComponentFixture<CheckmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, CheckmarkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span.check')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('fa-icon')).toBeTruthy();
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

  describe('Type', () => {
    fit("Should have default type", () => {
      expect(fixture.nativeElement.className).toContain(CheckmarkType.Rounded);
      expect(fixture.nativeElement.className).not.toContain(CheckmarkType.Square);
    });

    fit("Should have defined type", () => {
      component.type = CheckmarkType.Square
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(CheckmarkType.Rounded);
      expect(fixture.nativeElement.className).toContain(CheckmarkType.Square);
    });
  });

  describe('Icon', () => {
    fit("Should have default icon", () => {
      expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-check');
    });

    fit("Should have defined icon", () => {
      component.icon = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-shirt');
    });
  });
});
