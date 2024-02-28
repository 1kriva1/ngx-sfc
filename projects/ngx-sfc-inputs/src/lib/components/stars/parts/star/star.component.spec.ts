import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UIClass } from 'ngx-sfc-common';
import { StarsState } from '../../stars.enum';
import { StarComponent } from './star.component';

describe('Component: Star', () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [StarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main elements', () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('input[type="radio"]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
    });
  });

  describe('Host classes', () => {
    describe('State', () => {
      fit("Should have default value", () => {
        expect(fixture.nativeElement.className).toContain(StarsState.None);
      });

      fit("Should have common value", () => {
        component.state = StarsState.Common;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(StarsState.Common);
      });

      fit("Should have max value", () => {
        component.state = StarsState.Max;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(StarsState.Max);
      });

      fit("Should have min value", () => {
        component.state = StarsState.Min;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(StarsState.Min);
      });
    });

    describe('Disabled', () => {
      fit("Should not have class", () => {
        expect(fixture.nativeElement.className).not.toContain(UIClass.Disabled);
      });

      fit("Should have class", () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.className).toContain(UIClass.Disabled);
      });
    });
  });

  describe('Input', () => {
    fit("Should have default id value", () => {
      expect(fixture.debugElement.query(By.css('input[type=radio]')).nativeElement.id).toEqual('undefined-undefined');
    });

    fit("Should have defined id value without value", () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=radio]')).nativeElement.id).toEqual('test-id-undefined');
    });

    fit("Should have defined id value with value", () => {
      component.id = 'test-id';
      component.value = 4;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=radio]')).nativeElement.id).toEqual('test-id-4');
    });

    fit("Should not be disabled", () => {
      expect(fixture.nativeElement.querySelector('input[type=radio]').disabled).toBeFalse();
    });

    fit("Should be disabled", () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=radio]').disabled).toBeTrue();
    });
  });

  describe('Label', () => {
    fit("Should be linked to input element", () => {
      const inputEl = fixture.nativeElement.querySelector('input[type=radio]');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    fit('Should not have filled icon', () => {
      expect(fixture.nativeElement.querySelector('label svg[data-prefix="far"].fa-star')).toBeTruthy();
    });

    fit('Should have filled icon', () => {
      component.state = StarsState.Common;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label svg[data-prefix="fas"].fa-star')).toBeTruthy();

      component.state = StarsState.Max;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label svg[data-prefix="fas"].fa-star')).toBeTruthy();

      component.state = StarsState.Min;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label svg[data-prefix="fas"].fa-star')).toBeTruthy();
    });
  });
});
