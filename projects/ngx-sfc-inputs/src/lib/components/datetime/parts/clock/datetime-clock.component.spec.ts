import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateTimeConstants, UIClass } from 'ngx-sfc-common';
import { ButtonType, CommonConstants, ComponentSize } from 'ngx-sfc-common';
import { ButtonComponent, ComponentSizeDirective, MouseDownDirective } from 'ngx-sfc-common';
import { DateTimeView } from '../../datetime-input-view.enum';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';
import { DateTimeClockComponent } from './datetime-clock.component';

describe('Component: DateTimeClock', () => {
  let component: DateTimeClockComponent;
  let fixture: ComponentFixture<DateTimeClockComponent>;
  let valueServiceSpy: jasmine.SpyObj<DateTimeValueService>;
  let viewServiceSpy: jasmine.SpyObj<DateTimeViewService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MouseDownDirective, ComponentSizeDirective, ButtonComponent, DateTimeClockComponent]
    }).compileComponents();

    valueServiceSpy = jasmine.createSpyObj('DateTimeValueService', ['update']);
    viewServiceSpy = jasmine.createSpyObj('DateTimeViewService', ['update']);
    valueServiceSpy.value = new Date(2034, 9, 30, 15, 15);

    TestBed.overrideComponent(DateTimeClockComponent, {
      set: {
        providers: [
          { provide: DateTimeValueService, useValue: valueServiceSpy },
          { provide: DateTimeViewService, useValue: viewServiceSpy }
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.meridien')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.time')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('svg')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('g')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('circle.circle')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('line.minute-hand')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('line.hour-hand')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('circle.point')).toBeTruthy();
    });
  });

  describe('Handlers', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('div.handler.left')).toBeNull();
      expect(fixture.nativeElement.querySelector('div.handler.right')).toBeNull();
      expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(0);
    });

    fit('Should exist', () => {
      component.shortTime = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.handler.left')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.handler.right')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
    });

    fit('Should have constant type', () => {
      component.shortTime = true;
      fixture.detectChanges();

      const handlers: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-button'));

      handlers.forEach(el => {
        expect(el.componentInstance.types).toEqual([ButtonType.Circled]);
      });
    });

    fit('Should have constant size', () => {
      component.shortTime = true;
      fixture.detectChanges();

      const handlers: DebugElement[] = fixture.debugElement.queryAll(By.css('sfc-button'));

      handlers.forEach(el => {
        expect(el.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
      });
    });

    describe('AM', () => {
      fit('Should have constant text', () => {
        component.shortTime = true;
        fixture.detectChanges();

        const amHandler: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

        expect(amHandler.nativeElement.querySelector('span.text').innerText).toEqual('AM');
      });

      fit('Should be active', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(11);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`div.handler.left sfc-button.${UIClass.Active}`))).toBeTruthy();
      });

      fit('Should not be active', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(13);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`div.handler.left sfc-button.${UIClass.Active}`))).toBeNull();
      });

      fit('Should update value', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(13);
        fixture.detectChanges();

        selectHandler();

        expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 1 });
      });

      fit('Should update only once', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(13);
        fixture.detectChanges();

        selectHandler();

        valueServiceSpy.value.setHours(1);

        selectHandler();

        expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 1 });
      });
    });

    describe('PM', () => {
      fit('Should have constant text', () => {
        component.shortTime = true;
        fixture.detectChanges();

        const amHandler: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

        expect(amHandler.nativeElement.querySelector('span.text').innerText).toEqual('PM');
      });

      fit('Should be active', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(13);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`div.handler.right sfc-button.${UIClass.Active}`))).toBeTruthy();
      });

      fit('Should not be active', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(11);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(`div.handler.right sfc-button.${UIClass.Active}`))).toBeNull();
      });

      fit('Should update value', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(11);
        fixture.detectChanges();

        selectHandler(false);

        expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 23 });
      });

      fit('Should update only once', () => {
        component.shortTime = true;
        valueServiceSpy.value.setHours(11);
        fixture.detectChanges();

        selectHandler(false);

        valueServiceSpy.value.setHours(23);

        selectHandler(false);

        expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 23 });
      });
    });

    fit('Should time have not value', () => {
      expect(fixture.nativeElement.querySelector('div.time').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should time have value', () => {
      component.time = '15:15';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.time').innerText).toEqual(component.time);
    });
  });

  describe('Clock', () => {
    fit('Should have default size', () => {
      const svgEl = fixture.nativeElement.querySelector('svg'),
        gEl = fixture.nativeElement.querySelector('g'),
        circleEl = fixture.nativeElement.querySelector('circle.circle'),
        pointEl = fixture.nativeElement.querySelector('circle.point');

      expect(svgEl.attributes.viewBox.nodeValue).toEqual('0,0,400,400');
      expect(gEl.attributes.transform.nodeValue).toEqual('translate(200,200)');
      expect(circleEl.attributes.r.nodeValue).toEqual('12em');
      expect(pointEl.attributes.r.nodeValue).toEqual('0.93em');
    });

    fit('Should have defined size', () => {
      component.componentSize = new ComponentSizeDirective(fixture);
      component.componentSize.size = ComponentSize.Large;
      component.ngOnInit();
      fixture.detectChanges();

      const svgEl = fixture.nativeElement.querySelector('svg'),
        gEl = fixture.nativeElement.querySelector('g');

      expect(svgEl.attributes.viewBox.nodeValue).toEqual('0,0,800,800');
      expect(gEl.attributes.transform.nodeValue).toEqual('translate(400,400)');
    });

    describe('Hands', () => {
      describe('Hour', () => {
        fit('Should constant attributes', () => {
          const hourHandEl = fixture.nativeElement.querySelector('line.hour-hand');

          expect(hourHandEl.attributes.x1.nodeValue).toEqual('0');
          expect(hourHandEl.attributes.y1.nodeValue).toEqual('0');
          expect(hourHandEl.attributes.x2.nodeValue).toEqual('0');
          expect(hourHandEl.attributes.y2.nodeValue).toEqual('-5.625em');
        });

        fit('Should be active', () => {
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css(`line.minute-hand.${UIClass.Active}`))).toBeNull();
          expect(fixture.debugElement.query(By.css(`line.hour-hand.${UIClass.Active}`))).toBeTruthy();
        });

        fit('Should have appropriate style', () => {
          component.hour = 0;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(0deg)');

          component.hour = 6;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(180deg)');

          component.hour = 12;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(360deg)');

          component.hour = 15;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(450deg)');

          component.hour = 24;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.hour-hand')).nativeElement.style.transform).toEqual('rotate(720deg)');
        });
      });

      describe('Minute', () => {
        fit('Should constant attributes', () => {
          const minuteHandEl = fixture.nativeElement.querySelector('line.minute-hand');

          expect(minuteHandEl.attributes.x1.nodeValue).toEqual('0');
          expect(minuteHandEl.attributes.y1.nodeValue).toEqual('0');
          expect(minuteHandEl.attributes.x2.nodeValue).toEqual('0');
          expect(minuteHandEl.attributes.y2.nodeValue).toEqual('-9.375em');
        });

        fit('Should be active', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css(`line.minute-hand.${UIClass.Active}`))).toBeTruthy();
          expect(fixture.debugElement.query(By.css(`line.hour-hand.${UIClass.Active}`))).toBeNull();
        });

        fit('Should have appropriate style', () => {
          component.minute = 0;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(0deg)');

          component.minute = 15;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(90deg)');

          component.minute = 45;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(270deg)');

          component.minute = 60;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(360deg)');

          component.minute = 17;
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('line.minute-hand')).nativeElement.style.transform).toEqual('rotate(102deg)');
        });
      });
    });

    describe('Points & Texts', () => {
      describe('Minute', () => {
        fit('Should have all points', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          expect(fixture.debugElement.queryAll(By.css('circle.minute-circle')).length).toEqual(108);
          expect(fixture.debugElement.queryAll(By.css('circle.minute-circle.point')).length).toEqual(48);
          expect(fixture.debugElement.queryAll(By.css('text.minute-text')).length).toEqual(12);
        });

        fit('Should have defined attributes', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteCircles = fixture.debugElement.queryAll(By.css('circle.minute-circle')),
            minuteTexts = fixture.debugElement.queryAll(By.css('text.minute-text'));

          minuteCircles.forEach(circle => {
            if (circle.classes['point'])
              expect(circle.attributes['r']).toEqual('0.1875em');
            else
              expect(circle.attributes['r']).toEqual('0.75em');

            expect(circle.attributes['cx']).toBeTruthy();
            expect(circle.attributes['cy']).toBeTruthy();
          });

          minuteTexts.forEach(text => {
            expect(text.attributes['x']).toBeTruthy();
            expect(text.attributes['y']).toBeTruthy();
          });
        });

        fit('Should be selected specific minute', () => {
          component.minute = 15;
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteCircles = fixture.debugElement.queryAll(By.css('circle.minute-circle')),
            minuteTexts = fixture.debugElement.queryAll(By.css('text.minute-text'));

          minuteCircles.forEach((circle, index) => {
            if (index == 27)
              expect(circle.classes[UIClass.Selected]).toBeTrue();
            else
              expect(circle.classes[UIClass.Selected]).toBeUndefined();
          });

          minuteTexts.forEach((text, index) => {
            if (index == 3)
              expect(text.classes[UIClass.Selected]).toBeTrue();
            else
              expect(text.classes[UIClass.Selected]).toBeUndefined();
          });
        });

        fit('Should be disabled by minDate', () => {
          valueServiceSpy.value = new Date(2034, 9, 30, 15, 30);
          component.minDate = new Date(2034, 9, 30, 15, 15);
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteCircles = fixture.debugElement.queryAll(By.css('circle.minute-circle')),
            minuteTexts = fixture.debugElement.queryAll(By.css('text.minute-text'));

          minuteCircles.forEach((circle, index) => {
            if (index < 27)
              expect(circle.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(circle.classes[UIClass.Disabled]).toBeUndefined();
          });

          minuteTexts.forEach((text, index) => {
            if (index < 3)
              expect(text.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(text.classes[UIClass.Disabled]).toBeUndefined();
          });
        });

        fit('Should be disabled by maxDate', () => {
          valueServiceSpy.value = new Date(2034, 9, 30, 15, 0);
          component.maxDate = new Date(2034, 9, 30, 15, 15);
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteCircles = fixture.debugElement.queryAll(By.css('circle.minute-circle')),
            minuteTexts = fixture.debugElement.queryAll(By.css('text.minute-text'));

          minuteCircles.forEach((circle, index) => {
            if (index > 27)
              expect(circle.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(circle.classes[UIClass.Disabled]).toBeUndefined();
          });

          minuteTexts.forEach((text, index) => {
            if (index > 3)
              expect(text.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(text.classes[UIClass.Disabled]).toBeUndefined();
          });
        });

        fit('Should be disabled by min and max date', () => {
          valueServiceSpy.value = new Date(2034, 9, 30, 15, 12);
          component.minDate = new Date(2034, 9, 30, 15, 10);
          component.maxDate = new Date(2034, 9, 30, 15, 15);
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteCircles = fixture.debugElement.queryAll(By.css('circle.minute-circle')),
            minuteTexts = fixture.debugElement.queryAll(By.css('text.minute-text'));

          minuteCircles.forEach((circle, index) => {
            if (index < 18 || index > 27)
              expect(circle.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(circle.classes[UIClass.Disabled]).toBeUndefined();
          });

          minuteTexts.forEach((text, index) => {
            if (index < 2 || index > 3)
              expect(text.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(text.classes[UIClass.Disabled]).toBeUndefined();
          });
        });

        fit('Should select minute', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('text.minute-text'))[4]);

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Minute, parameter: 20 });
        });

        fit('Should not select already selected minute', () => {
          valueServiceSpy.value.setMinutes(20);
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('text.minute-text'))[4]);

          expect(valueServiceSpy.update).not.toHaveBeenCalled();
        });

        fit('Should select only once', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteEl = fixture.debugElement.queryAll(By.css('text.minute-text'))[4];

          selectValue(minuteEl, null, 20);

          selectValue(minuteEl, null, 20);

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Minute, parameter: 20 });
        });

        fit('Should not update view', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('text.minute-text'))[4]);

          expect(viewServiceSpy.update).not.toHaveBeenCalled();
        });

        fit('Should update view', () => {
          component.switchOnClick = true;
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const event = selectValue(fixture.debugElement.queryAll(By.css('text.minute-text'))[4]);

          expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Minute, event: event });
        });

        fit('Should select event change selected minute', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteCircles = fixture.debugElement.queryAll(By.css('circle.minute-circle')),
            minuteTexts = fixture.debugElement.queryAll(By.css('text.minute-text'));

          expect(minuteTexts[3].classes[UIClass.Selected]).toBeTrue();
          expect(minuteCircles[28].classes[UIClass.Selected]).toBeUndefined();

          selectValue(fixture.debugElement.queryAll(By.css('circle.minute-circle'))[29], null, 16);

          expect(minuteCircles[28].classes[UIClass.Selected]).toBeTrue();
          expect(minuteTexts[3].classes[UIClass.Selected]).toBeUndefined();
        });

        fit('Should have defined text values', () => {
          (viewServiceSpy as any).view = DateTimeView.Minutes;
          fixture.detectChanges();

          const minuteTexts = fixture.debugElement.queryAll(By.css('text.minute-text'));

          minuteTexts.forEach((text, index) => {
            expect(text.nativeElement.textContent).toEqual(` ${index * 5} `);
          });
        });
      });

      describe('Hour', () => {
        fit('Should have all points', () => {
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          expect(fixture.debugElement.queryAll(By.css('circle.hour-circle')).length).toEqual(24);
          expect(fixture.debugElement.queryAll(By.css('text.hour-text')).length).toEqual(24);
        });

        fit('Should have all points for shortTime', () => {
          component.shortTime = true;
          component.clock = {
            hours: [],
            minutes: []
          };
          component.ngOnInit();
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          expect(fixture.debugElement.queryAll(By.css('circle.hour-circle')).length).toEqual(12);
          expect(fixture.debugElement.queryAll(By.css('text.hour-text')).length).toEqual(12);
        });

        fit('Should have defined attributes', () => {
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          const hourCircles = fixture.debugElement.queryAll(By.css('circle.hour-circle')),
            hourTexts = fixture.debugElement.queryAll(By.css('text.hour-text'));

          hourCircles.forEach(circle => {
            expect(circle.attributes['r']).toEqual('1.25em');
            expect(circle.attributes['cx']).toBeTruthy();
            expect(circle.attributes['cy']).toBeTruthy();
          });

          hourTexts.forEach(text => {
            expect(text.attributes['x']).toBeTruthy();
            expect(text.attributes['y']).toBeTruthy();
          });
        });

        fit('Should be selected specific hour', () => {
          component.hour = 15;
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          const hourCircles = fixture.debugElement.queryAll(By.css('circle.hour-circle')),
            hourTexts = fixture.debugElement.queryAll(By.css('text.hour-text'));

          hourCircles.forEach((circle, index) => {
            if (index == 15)
              expect(circle.classes[UIClass.Selected]).toBeTrue();
            else
              expect(circle.classes[UIClass.Selected]).toBeUndefined();
          });

          hourTexts.forEach((text, index) => {
            if (index == 15)
              expect(text.classes[UIClass.Selected]).toBeTrue();
            else
              expect(text.classes[UIClass.Selected]).toBeUndefined();
          });
        });

        fit('Should be disabled by minDate', () => {
          valueServiceSpy.value = new Date(2034, 9, 30, 15, 0);
          component.minDate = new Date(2034, 9, 30, 13, 0);
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          const hourCircles = fixture.debugElement.queryAll(By.css('circle.hour-circle')),
            hourTexts = fixture.debugElement.queryAll(By.css('text.hour-text'));

          hourCircles.forEach((circle, index) => {
            if (index < 13)
              expect(circle.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(circle.classes[UIClass.Disabled]).toBeUndefined();
          });

          hourTexts.forEach((text, index) => {
            if (index < 13)
              expect(text.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(text.classes[UIClass.Disabled]).toBeUndefined();
          });
        });

        fit('Should be disabled by maxDate', () => {
          valueServiceSpy.value = new Date(2034, 9, 30, 15, 0);
          component.maxDate = new Date(2034, 9, 30, 17, 0);
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          const hourCircles = fixture.debugElement.queryAll(By.css('circle.hour-circle')),
            hourTexts = fixture.debugElement.queryAll(By.css('text.hour-text'));

          hourCircles.forEach((circle, index) => {
            if (index > 17)
              expect(circle.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(circle.classes[UIClass.Disabled]).toBeUndefined();
          });

          hourTexts.forEach((text, index) => {
            if (index > 17)
              expect(text.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(text.classes[UIClass.Disabled]).toBeUndefined();
          });
        });

        fit('Should be disabled by min and max date', () => {
          valueServiceSpy.value = new Date(2034, 9, 30, 15, 0);
          component.minDate = new Date(2034, 9, 30, 13, 0);
          component.maxDate = new Date(2034, 9, 30, 17, 0);
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          const hourCircles = fixture.debugElement.queryAll(By.css('circle.hour-circle')),
            hourTexts = fixture.debugElement.queryAll(By.css('text.hour-text'));

          hourCircles.forEach((circle, index) => {
            if (index < 13 || index > 17)
              expect(circle.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(circle.classes[UIClass.Disabled]).toBeUndefined();
          });

          hourTexts.forEach((text, index) => {
            if (index < 13 || index > 17)
              expect(text.classes[UIClass.Disabled]).toBeTrue();
            else
              expect(text.classes[UIClass.Disabled]).toBeUndefined();
          });
        });

        fit('Should select hour', () => {
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[13]);

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 13 });
        });

        fit('Should select hour for shortTime', () => {
          component.shortTime = true;
          component.clock = {
            hours: [],
            minutes: []
          };
          component.ngOnInit();
          valueServiceSpy.value.setHours(11);
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[1]);

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 1 });
        });

        fit('Should select midnight hour for shortTime', () => {
          component.shortTime = true;
          component.clock = {
            hours: [],
            minutes: []
          };
          component.ngOnInit();
          valueServiceSpy.value.setHours(11);
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[0]);

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 0 });
        });

        fit('Should select hour for shortTime', () => {
          component.shortTime = true;
          component.clock = {
            hours: [],
            minutes: []
          };
          component.ngOnInit();
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[1]);

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 13 });
        });

        fit('Should not select already selected hour', () => {
          valueServiceSpy.value.setHours(13);
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[13]);

          expect(valueServiceSpy.update).not.toHaveBeenCalled();
        });

        fit('Should select only once', () => {
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          const hourEl = fixture.debugElement.queryAll(By.css('circle.hour-circle'))[13];

          selectValue(hourEl, 13);

          selectValue(hourEl, 13);

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Hour, parameter: 13 });
        });

        fit('Should not update view', () => {
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[13]);

          expect(viewServiceSpy.update).not.toHaveBeenCalled();
        });

        fit('Should update view', () => {
          component.switchOnClick = true;
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[13]);

          expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Hour });
        });

        fit('Should select event change selected hour', () => {
          valueServiceSpy.value.setHours(14);
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          const hourCircles = fixture.debugElement.queryAll(By.css('circle.hour-circle')),
            hourTexts = fixture.debugElement.queryAll(By.css('text.hour-text'));

          expect(hourCircles[14].classes[UIClass.Selected]).toBeTrue();
          expect(hourTexts[14].classes[UIClass.Selected]).toBeTrue();
          expect(hourCircles[13].classes[UIClass.Selected]).toBeUndefined();
          expect(hourTexts[13].classes[UIClass.Selected]).toBeUndefined();

          selectValue(fixture.debugElement.queryAll(By.css('circle.hour-circle'))[13], 13);

          expect(hourCircles[14].classes[UIClass.Selected]).toBeUndefined();
          expect(hourTexts[14].classes[UIClass.Selected]).toBeUndefined();
          expect(hourCircles[13].classes[UIClass.Selected]).toBeTrue();
          expect(hourTexts[13].classes[UIClass.Selected]).toBeTrue();
        });

        fit('Should have defined text values', () => {
          (viewServiceSpy as any).view = DateTimeView.Hours;
          fixture.detectChanges();

          fixture.debugElement.queryAll(By.css('text.hour-text')).forEach((text, index) => {
            expect(text.nativeElement.textContent).toEqual(` ${index === DateTimeConstants.MIDNIGHT_HOUR
              ? DateTimeConstants.HOURS_IN_SHORT_TIME
              : index === DateTimeConstants.HOURS_IN_SHORT_TIME
                ? DateTimeConstants.HOURS_IN_TIME
                : index} `);
          });
        });
      });
    });
  });

  function selectHandler(am: boolean = true) {
    const handlerEl = fixture.debugElement.queryAll(By.css('sfc-button'))[am ? 0 : 1],
      event = { target: handlerEl.nativeElement, button: 0 };
    handlerEl.triggerEventHandler('mousedown', event);
    fixture.detectChanges();
  }

  function selectValue(el: DebugElement, hour: number | null = null, minute: number | null = null): MouseEvent {
    const event: any = { target: el.nativeElement, button: 0 };
    el.triggerEventHandler('mousedown', event);

    if (hour)
      valueServiceSpy.value.setHours(hour);

    if (minute)
      valueServiceSpy.value.setMinutes(minute);

    fixture.detectChanges();

    return event;
  }
});