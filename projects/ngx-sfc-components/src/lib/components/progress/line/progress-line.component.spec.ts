import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonConstants, hexToRgb } from 'ngx-sfc-common';
import { ProgressColor } from '../progress-color.enum';
import { getProgressColorDynamicallyFunc } from '../progress.utils';
import { ProgressLineComponent } from './progress-line.component';

describe('Component: ProgressLineComponent', () => {
  let component: ProgressLineComponent;
  let fixture: ComponentFixture<ProgressLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressLineComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.labels')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.progress-bar')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.progress')).toBeTruthy();
    });

    fit('Should progress and total be 100, if progress more than total', () => {
      component.progress = 101;
      component.total = 99;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.progress).toEqual(CommonConstants.FULL_PERCENTAGE);
      expect(component.total).toEqual(CommonConstants.FULL_PERCENTAGE);
    });
  });

  describe('Labels', () => {
    fit("Should have default start label", () => {
      expect(fixture.nativeElement.querySelectorAll('span')[0].innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should have defined start label", () => {
      component.labelStart = 'Test start Label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('span')[0].innerText).toEqual(component.labelStart);
    });

    fit("Should have default end label", () => {
      expect(fixture.nativeElement.querySelectorAll('span')[1].innerText).toEqual(component.progress.toString());
    });

    fit("Should have defined end label", () => {
      component.labelEnd = 'Test end Label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('span')[1].innerText).toEqual(component.labelEnd);
    });

    fit("Should end label reflect progress", () => {
      component.progress = 100;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('span')[1].innerText).toEqual(component.progress.toString());
    });

    fit("Should not exist end label", () => {
      component.hideEnd = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('span').length).toEqual(1);
    });

    fit("Should end label have suffics", () => {
      component.progress = 100;
      component.labelSuffix = 'test'
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('span')[1].innerText)
        .toEqual(`${component.progress}${component.labelSuffix}`);
    });
  });

  describe('Progress bar', () => {
    fit("Should have default styles", () => {
      const progressEl = fixture.debugElement.query(By.css('div.progress'));

      expect(progressEl.styles['width']).toEqual('0%');
      expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.MIN_LOW));
    });

    fit("Should reflect progress value", () => {
      component.progress = 50;
      fixture.detectChanges();

      const progressEl = fixture.debugElement.query(By.css('div.progress'));

      expect(progressEl.styles['width']).toEqual('50%');
    });

    fit("Should reflect progress value, when total not 100", () => {
      component.total = 50;
      component.progress = 50;
      fixture.detectChanges();

      const progressEl = fixture.debugElement.query(By.css('div.progress'));

      expect(progressEl.styles['width']).toEqual('100%');
    });

    fit("Should progress bar has default background", () => {
      expect(fixture.debugElement.query(By.css('div.progress-bar')).styles['background']).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should progress bar has defined background", () => {
      component.background = 'red';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.progress-bar')).styles['background']).toEqual(component.background);
    });

    describe('Colors', () => {
      fit("Should have LOW background color", () => {
        component.progress = 13;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.LOW));
      });

      fit("Should have MAX_LOW background color", () => {
        component.progress = 25;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.MAX_LOW));
      });

      fit("Should have MIN_MEDIUM background color", () => {
        component.progress = 37;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.MIN_MEDIUM));
      });

      fit("Should have MEDIUM background color", () => {
        component.progress = 49;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.MEDIUM));
      });

      fit("Should have MAX_MEDIUM background color", () => {
        component.progress = 61;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.MAX_MEDIUM));
      });

      fit("Should have MIN_HIGH background color", () => {
        component.progress = 73;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.MIN_HIGH));
      });

      fit("Should have HIGH background color", () => {
        component.progress = 85;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.HIGH));
      });

      fit("Should have MAX_HIGH background color", () => {
        component.progress = 100;
        fixture.detectChanges();

        const progressEl = fixture.debugElement.query(By.css('div.progress'));

        expect(progressEl.styles['background-color']).toEqual(hexToRgb(ProgressColor.MAX_HIGH));
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

        expect(fixture.debugElement.query(By.css('div.progress')).styles['background-color']).toEqual('red');

        component.progress = 50;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.progress')).styles['background-color']).toEqual('yellow');

        component.progress = 80;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.progress')).styles['background-color']).toEqual('green');
      });

      fit("Should reflect colors from defined dynamic getColor function", () => {
        component.getColor = getProgressColorDynamicallyFunc;
        component.total = 9
        component.progress = 1;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.progress')).styles['background-color'])
          .toEqual(hexToRgb(ProgressColor.LOW));

        component.progress = 3;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.progress')).styles['background-color'])
          .toEqual(hexToRgb(ProgressColor.MIN_MEDIUM));

        component.progress = 6;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.progress')).styles['background-color'])
          .toEqual(hexToRgb(ProgressColor.MIN_HIGH));
      });
    });
  });
});
