import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonConstants, hexToRgb } from 'ngx-sfc-common';
import { ProgressColor } from '../progress-color.enum';
import { ProgressSemiCircleComponent } from './progress-semi-circle.component';

describe('Component: ProgressSemiCircleComponent', () => {
  let component: ProgressSemiCircleComponent;
  let fixture: ComponentFixture<ProgressSemiCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressSemiCircleComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSemiCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.progress-bar')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.bar')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span.value')).toBeTruthy();
    });

    fit('Should min value equal 0, if more then max', () => {
      component.min = 10;
      component.max = 5;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.min).toEqual(0);
    });

    fit('Should progress value equal min, if less than min', () => {
      component.min = 10;
      component.progress = 5;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.progress).toEqual(component.min);
    });

    fit('Should progress value equal max, if more than max', () => {
      component.max = 10;
      component.progress = 15;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.progress).toEqual(component.max);
    });
  });

  describe('Bar', () => {
    fit("Should has default border-color", () => {
      expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit("Should has defined border-color", () => {
      component.background = 'red';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.bar')).styles['border-color']).toEqual(component.background);
    });

    fit("Should reflect progress value on styles", () => {
      component.min = 20;
      component.max = 80;
      component.progress = 50;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.bar')).styles['transform']).toEqual(component.barStyles.transform);
      expect(fixture.debugElement.query(By.css('div.bar')).styles['borderRightColor']).toEqual(hexToRgb(component.barStyles.borderRightColor));
      expect(fixture.debugElement.query(By.css('div.bar')).styles['borderBottomColor']).toEqual(hexToRgb(component.barStyles.borderBottomColor));
    });

    describe('Colors', () => {
      fit("Should have LOW background color", () => {
        component.progress = 13;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.LOW));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.LOW));
      });

      fit("Should have MAX_LOW background color", () => {
        component.progress = 25;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.MAX_LOW));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.MAX_LOW));
      });

      fit("Should have MIN_MEDIUM background color", () => {
        component.progress = 37;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.MIN_MEDIUM));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.MIN_MEDIUM));
      });

      fit("Should have MEDIUM background color", () => {
        component.progress = 49;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.MEDIUM));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.MEDIUM));
      });

      fit("Should have MAX_MEDIUM background color", () => {
        component.progress = 61;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.MAX_MEDIUM));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.MAX_MEDIUM));
      });

      fit("Should have MIN_HIGH background color", () => {
        component.progress = 73;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.MIN_HIGH));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.MIN_HIGH));
      });

      fit("Should have HIGH background color", () => {
        component.progress = 85;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.HIGH));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.HIGH));
      });

      fit("Should have MAX_HIGH background color", () => {
        component.progress = 100;
        fixture.detectChanges();

        const barEl = fixture.debugElement.query(By.css('div.bar'));

        expect(barEl.styles['borderBottomColor']).toEqual(hexToRgb(ProgressColor.MAX_HIGH));
        expect(barEl.styles['borderRightColor']).toEqual(hexToRgb(ProgressColor.MAX_HIGH));
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

        expect(fixture.debugElement.query(By.css('div.bar')).styles['borderBottomColor']).toEqual('red');
        expect(fixture.debugElement.query(By.css('div.bar')).styles['borderRightColor']).toEqual('red');

        component.progress = 50;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['borderBottomColor']).toEqual('yellow');
        expect(fixture.debugElement.query(By.css('div.bar')).styles['borderRightColor']).toEqual('yellow');

        component.progress = 80;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.bar')).styles['borderBottomColor']).toEqual('green');
        expect(fixture.debugElement.query(By.css('div.bar')).styles['borderRightColor']).toEqual('green');
      });
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
  });

  describe('Limits', () => {
    fit('Should exist', () => {
      expect(fixture.debugElement.query(By.css('div.limits'))).toBeTruthy();
    });

    fit('Should not exist', () => {
      component.limits = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('div.limits'))).toBeNull();
    });

    fit('Should reflect values from component', () => {
      const limitEls = fixture.debugElement.queryAll(By.css('div.limits span'));

      expect(limitEls[0].nativeElement.innerText).toEqual(component.min.toString());
      expect(limitEls[1].nativeElement.innerText).toEqual(component.max.toString());
    });
  });
});
