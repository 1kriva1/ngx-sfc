import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StarType } from './star-type.enum';
import { StarsComponent } from './stars.component';

describe('Component: Stars', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
    });
  });

  describe('Stars', () => {
    fit("Should have default count", () => {
      expect(fixture.nativeElement.querySelectorAll('button').length).toEqual(5);
    });

    fit("Should have defined count", () => {
      component.count = 3;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('button').length).toEqual(component.count);
    });

    describe('Tytpe', () => {
      fit("Should have None type", () => {
        const starsEl = fixture.debugElement.queryAll(By.css('button'));

        starsEl.forEach(star => {
          expect(star.classes[StarType.None]).toBeTruthy();
        });
      });

      fit("Should have S25 type", () => {
        component.count = 2;
        component.value = 0.1;
        fixture.detectChanges();

        const starsEl = fixture.debugElement.queryAll(By.css('button'));

        expect(starsEl[0].classes[StarType.S25]).toBeTruthy();
        expect(starsEl[1].classes[StarType.None]).toBeTruthy();
      });

      fit("Should have Half type", () => {
        component.count = 2;
        component.value = 0.5;
        fixture.detectChanges();

        const starsEl = fixture.debugElement.queryAll(By.css('button'));

        expect(starsEl[0].classes[StarType.Half]).toBeTruthy();
        expect(starsEl[1].classes[StarType.None]).toBeTruthy();
      });

      fit("Should have S75 type", () => {
        component.count = 2;
        component.value = 1.84;
        fixture.detectChanges();

        const starsEl = fixture.debugElement.queryAll(By.css('button'));

        expect(starsEl[0].classes[StarType.Full]).toBeTruthy();
        expect(starsEl[1].classes[StarType.S75]).toBeTruthy();
      });

      fit("Should have Full type", () => {
        component.count = 2;
        component.value = 1.5;
        fixture.detectChanges();

        const starsEl = fixture.debugElement.queryAll(By.css('button'));

        expect(starsEl[0].classes[StarType.Full]).toBeTruthy();
        expect(starsEl[1].classes[StarType.Half]).toBeTruthy();
      });
    });
  });
});
