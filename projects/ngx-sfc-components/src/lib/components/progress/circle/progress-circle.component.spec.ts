import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonConstants, hexToRgb } from 'ngx-sfc-common';
import { ProgressColor } from '../progress-color.enum';
import { ProgressCircleComponent } from './progress-circle.component';

describe('Component: ProgressCircleComponent', () => {
  let component: ProgressCircleComponent;
  let fixture: ComponentFixture<ProgressCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressCircleComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.circle')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.bar')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.fill')).toBeTruthy();
    });

    fit("Should has default background", () => {
      expect(fixture.debugElement.query(By.css('div.container')).styles['background']).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should has defined background", () => {
      component.background = 'red';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.container')).styles['background']).toEqual(component.background);
    });

    fit("Should not have reversed class", () => {
      expect(fixture.debugElement.nativeElement.className).not.toContain('reversed');
    });

    fit("Should have reversed class", () => {
      component.progress = 51;
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.className).toContain('reversed');
    });
  });

  describe('Progress', () => {
    fit('Should have default value', () => {
      expect(fixture.debugElement.query(By.css('span')).nativeElement.innerText).toEqual('0');
    });

    fit('Should have defined value', () => {
      component.progress = 14;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span')).nativeElement.innerText).toEqual(component.progress.toString());
    });

    fit('Should reflect transform rotate value', () => {
      component.progress = 14;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.bar')).styles['transform']).toEqual(component.transformRotate);
    });

    describe('Colors', () => {
      fit("Should have LOW background color", () => {
        component.progress = 13;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.LOW));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.LOW));
      });

      fit("Should have MAX_LOW background color", () => {
        component.progress = 25;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MAX_LOW));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MAX_LOW));
      });

      fit("Should have MIN_MEDIUM background color", () => {
        component.progress = 37;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MIN_MEDIUM));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MIN_MEDIUM));
      });

      fit("Should have MEDIUM background color", () => {
        component.progress = 49;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MEDIUM));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MEDIUM));
      });

      fit("Should have MAX_MEDIUM background color", () => {
        component.progress = 61;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MAX_MEDIUM));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MAX_MEDIUM));
      });

      fit("Should have MIN_HIGH background color", () => {
        component.progress = 73;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MIN_HIGH));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MIN_HIGH));
      });

      fit("Should have HIGH background color", () => {
        component.progress = 85;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.HIGH));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.HIGH));
      });

      fit("Should have MAX_HIGH background color", () => {
        component.progress = 100;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MAX_HIGH));
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual(hexToRgb(ProgressColor.MAX_HIGH));
      });

      fit("Should reflect colors from defined getColor function", () => {
        component.getColor = (value: number) => {
          if (value < 33) {
            return 'red';
          } else if (value >= 33 && value < 66) {
            return 'yellow';
          } else if (value >= 66) {
            return 'green';
          }
          return 'green'
        };
        component.progress = 10;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual('red');
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual('red');

        component.progress = 50;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual('yellow');
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual('yellow');

        component.progress = 80;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual('green');
        expect(fixture.debugElement.query(By.css('div.fill')).styles['border-color']).toEqual('green');
      });
    });
  });
});
