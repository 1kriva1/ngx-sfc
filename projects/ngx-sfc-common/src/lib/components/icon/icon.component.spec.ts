import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';
import { IconComponent } from './icon.component';

describe('Component: Icon', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [IconComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeDefined();
    });
  });

  describe('Icon', () => {
    fit("Should not have", () => {
      expect(fixture.nativeElement.querySelector('fa-icon')).toBeNull();
    });

    fit("Should have", () => {
      component.icon = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon')).toBeTruthy();
    });

    fit("Should have defined icon value", () => {
      component.icon = faTShirt;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-shirt');
    });
  });

  describe('Image', () => {
    fit("Should not have", () => {
      expect(fixture.nativeElement.querySelector('img')).toBeNull();
    });

    fit("Should not have, because of icon exist", () => {
      component.icon = faTShirt;
      component.imageSrc = '/assets/test.png';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img')).toBeNull();
    });

    fit("Should have", () => {
      component.imageSrc = '/assets/test.png';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    });

    fit("Should have defined src value", () => {
      component.imageSrc = '/assets/test.png';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('img').src).toContain(component.imageSrc);
    });
  });
});
