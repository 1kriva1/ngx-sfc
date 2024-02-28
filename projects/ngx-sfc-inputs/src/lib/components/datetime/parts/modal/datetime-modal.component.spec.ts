import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ButtonComponent, ButtonType, ScrollIntoViewDirective, ScrollTrackerDirective,
  CloseComponent, MouseDownDirective, SwitchMultiCasePipe, ComponentSizeDirective,
  UIClass, CommonConstants
} from 'ngx-sfc-common';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeCalendarComponent } from '../calendar/datetime-calendar.component';
import { DateTimeClockComponent } from '../clock/datetime-clock.component';
import { DateTimeYearComponent } from '../year/datetime-year.component';
import { DateTimeModalComponent } from './datetime-modal.component';
import { of } from 'rxjs';
import { DateTimeView } from '../../datetime-input-view.enum';
import { DateTimeState } from '../../service/view/enums/datetime-state.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';
import { WeekDay } from '@angular/common';
import { DebugElement } from '@angular/core';
import { DateTimeInputConstants } from '../../constants/datetime.constants';

describe('Component: DateTimeModal', () => {
  let component: DateTimeModalComponent;
  let fixture: ComponentFixture<DateTimeModalComponent>;
  let valueServiceSpy: jasmine.SpyObj<DateTimeValueService>;
  let viewServiceSpy: jasmine.SpyObj<DateTimeViewService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [MouseDownDirective, SwitchMultiCasePipe, ComponentSizeDirective, ScrollIntoViewDirective, ScrollTrackerDirective, ButtonComponent,
        DateTimeCalendarComponent, DateTimeClockComponent, DateTimeYearComponent, CloseComponent, DateTimeModalComponent]
    }).compileComponents();

    valueServiceSpy = jasmine.createSpyObj('DateTimeValueService', ['update']);
    viewServiceSpy = jasmine.createSpyObj('DateTimeViewService', ['update']);
    valueServiceSpy.value = new Date(2034, 9, 30, 15, 15);

    TestBed.overrideComponent(DateTimeModalComponent, {
      set: {
        providers: [
          { provide: DateTimeValueService, useValue: valueServiceSpy },
          { provide: DateTimeViewService, useValue: viewServiceSpy }
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component).toBeTruthy();
    });

    fit('Should not create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeNull();
    });

    fit('Should create main elements', () => {
      init();

      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.view')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.actions')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-close')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
      expect(fixture.nativeElement.querySelector('div.header')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.picker')).toBeTruthy();
    });

    fit('Should hide', () => {
      spyOn(component, 'onClose');
      const event: any = { test: true };

      init('', DateTimeState.Hide, event);

      expect(component.onClose).toHaveBeenCalledOnceWith(event, true);
    });

    fit('Should hide and toggle modal service', () => {
      spyOn((component as any).modalService, "toggle").and.callThrough();

      component.fullSize = true;

      const event: any = { test: true };

      init('', DateTimeState.Hide, event);

      expect((component as any).modalService.toggle).toHaveBeenCalledTimes(1);
    });

    fit('Should update and hide', () => {
      spyOn(component.update, 'emit');
      spyOn(component, 'onClose');
      const event: any = { test: true };

      init('', DateTimeState.Update, event);

      expect(component.onClose).toHaveBeenCalledOnceWith(event, false);
      expect(component.update.emit).toHaveBeenCalledOnceWith(valueServiceSpy.value);
    });

    fit("Should not have full size class", () => {
      expect(fixture.nativeElement.classList.contains(DateTimeInputConstants.FULL_SIZE_CLASS)).toBeFalse();
    });

    fit('Should have full size class', () => {
      component.fullSize = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(DateTimeInputConstants.FULL_SIZE_CLASS)).toBeTrue();
    });

    fit("Should not have bordered class", () => {
      expect(fixture.nativeElement.classList.contains(UIClass.Bordered)).toBeFalse();
    });

    fit('Should have bordered class', () => {
      component.bordered = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(UIClass.Bordered)).toBeTrue();
    });
  });

  describe('Header', () => {
    fit('Should display date', () => {
      init();

      expect(fixture.nativeElement.querySelector('div.header span').innerText).toEqual('Wednesday');
    });

    fit('Should display constant if value is empty', () => {
      component.timeLabel = 'Test';
      fixture.detectChanges();

      init('');

      expect(fixture.nativeElement.querySelector('div.header span').innerText).toEqual(component.timeLabel);
    });

    fit('Should call close', () => {
      init();

      const target = fixture.debugElement.query(By.css('sfc-close')),
        event: any = { target: target.nativeElement, button: 0, stopPropagation: () => { } };

      spyOn(event, 'stopPropagation');
      target.triggerEventHandler('mousedown', event);
      fixture.detectChanges();

      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });
  });

  describe('Display date', () => {
    fit('Should create container for date', () => {
      init();

      expect(fixture.nativeElement.querySelector('div.date')).toBeTruthy();
    });

    fit('Should create container for year and not for date and time', () => {
      init();
      component.date = false;
      component.time = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.date')).toBeTruthy();
    });

    fit('Should not create container for time and not date', () => {
      init();
      component.date = false;
      component.time = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.date')).toBeNull();
    });

    fit('Should not create container', () => {
      init();
      component.date = false;
      component.time = false;
      component.year = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.date')).toBeNull();
    });

    fit('Should create containers for date', () => {
      init();

      expect(fixture.nativeElement.querySelectorAll('div.date > div').length).toEqual(3);
    });

    fit('Should not create containers for month and day', () => {
      init();
      component.date = false;
      component.time = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('div.date > div').length).toEqual(1);
    });

    fit('Should day have defined value', () => {
      init();

      expect(fixture.nativeElement.querySelector('div.day').innerText).toEqual('30');
    });

    fit('Should create containers for time', () => {
      init();
      component.date = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.time')).toBeTruthy();
    });

    fit('Should not create containers for time', () => {
      init();

      expect(fixture.nativeElement.querySelector('div.time')).toBeNull();
    });

    fit('Should time have defined value', () => {
      init();
      component.date = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.time').innerText).toEqual('15:15');
    });

    describe('Month', () => {
      fit('Should have defined value', () => {
        init();

        expect(fixture.nativeElement.querySelector('div.month').innerText).toEqual('SEP');
      });

      describe('Before', () => {
        fit('Should be visible', () => {
          init();

          const beforeHandler = fixture.debugElement.query(By.css('div.date div.handler.before a'));

          expect(beforeHandler.attributes[UIClass.Hidden]).toBeUndefined();
        });

        fit('Should be hidden', () => {
          init();
          component.minDate = new Date(2021, 0, 9);
          valueServiceSpy.value = new Date(2021, 0, 10);
          fixture.detectChanges();

          const beforeHandler = fixture.debugElement.query(By.css('div.date div.handler.before a'));

          expect(beforeHandler.attributes[UIClass.Hidden]).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit('Should have constant icon', () => {
          init();

          const beforeHandlerIcon = fixture.debugElement.query(By.css('div.date div.handler.before a fa-icon svg'));

          expect(beforeHandlerIcon.classes['fa-chevron-left']).toBeTrue();
        });

        fit('Should change date', () => {
          init();

          const beforeHandler = fixture.debugElement.query(By.css('div.date div.handler.before a'));
          beforeHandler.triggerEventHandler('mousedown', { target: beforeHandler.nativeElement, button: 0 });
          fixture.detectChanges();

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.MonthBefore });
        });
      });

      describe('After', () => {
        fit('Should be visible', () => {
          init();

          const afterHandler = fixture.debugElement.query(By.css('div.date div.handler.after a'));

          expect(afterHandler.attributes[UIClass.Hidden]).toBeUndefined();
        });

        fit('Should be hidden', () => {
          init();
          component.maxDate = new Date(2021, 0, 11);
          valueServiceSpy.value = new Date(2021, 0, 10);
          fixture.detectChanges();

          const afterHandler = fixture.debugElement.query(By.css('div.date div.handler.after a'));

          expect(afterHandler.attributes[UIClass.Hidden]).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit('Should have constant icon', () => {
          init();

          const afterHandlerIcon = fixture.debugElement.query(By.css('div.date div.handler.after a fa-icon svg'));

          expect(afterHandlerIcon.classes['fa-chevron-right']).toBeTrue();
        });

        fit('Should change date', () => {
          init();

          const afterHandler = fixture.debugElement.query(By.css('div.date div.handler.after a'));
          afterHandler.triggerEventHandler('mousedown', { target: afterHandler.nativeElement, button: 0 });
          fixture.detectChanges();

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.MonthAfter });
        });
      });
    });

    describe('Year', () => {
      fit('Should have defined value', () => {
        init();

        expect(fixture.nativeElement.querySelector('div.year span').innerText).toEqual('2034');
      });

      fit('Should show years list', () => {
        init();

        const yearEl = fixture.debugElement.query(By.css('div.year'));
        yearEl.triggerEventHandler('mousedown', { target: yearEl.nativeElement, button: 0 });
        fixture.detectChanges();

        expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Years });
      });

      fit('Should not show years list', () => {
        component.year = false;
        init();

        const yearEl = fixture.debugElement.query(By.css('div.year'));
        yearEl.triggerEventHandler('mousedown', { target: yearEl.nativeElement, button: 0 });
        fixture.detectChanges();

        expect(viewServiceSpy.update).not.toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Years });
      });

      describe('Before', () => {
        fit('Should be visible', () => {
          init();
          component.time = component.date = false;
          fixture.detectChanges();

          const beforeHandler = fixture.debugElement.query(By.css('div.date div.handler.before a'));

          expect(beforeHandler.attributes[UIClass.Hidden]).toBeUndefined();
        });

        fit('Should be hidden', () => {
          init();
          component.time = component.date = false;
          component.minDate = new Date(2021, 0, 9);
          valueServiceSpy.value = new Date(2021, 0, 10);
          fixture.detectChanges();

          const beforeHandler = fixture.debugElement.query(By.css('div.date div.handler.before a'));

          expect(beforeHandler.attributes[UIClass.Hidden]).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit('Should have constant icon', () => {
          init();
          component.time = component.date = false;
          fixture.detectChanges();

          const beforeHandlerIcon = fixture.debugElement.query(By.css('div.date div.handler.before a fa-icon svg'));

          expect(beforeHandlerIcon.classes['fa-chevron-left']).toBeTrue();
        });

        fit('Should change date', () => {
          init();
          component.time = component.date = false;
          fixture.detectChanges();

          const beforeHandler = fixture.debugElement.query(By.css('div.date div.handler.before a'));
          beforeHandler.triggerEventHandler('mousedown', { target: beforeHandler.nativeElement, button: 0 });
          fixture.detectChanges();

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.YearBefore });
        });
      });

      describe('After', () => {
        fit('Should be visible', () => {
          init();
          component.time = component.date = false;
          fixture.detectChanges();

          const afterHandler = fixture.debugElement.query(By.css('div.date div.handler.after a'));

          expect(afterHandler.attributes[UIClass.Hidden]).toBeUndefined();
        });

        fit('Should be hidden', () => {
          init();
          component.time = component.date = false;
          component.maxDate = new Date(2021, 0, 11);
          valueServiceSpy.value = new Date(2021, 0, 10);
          fixture.detectChanges();

          const afterHandler = fixture.debugElement.query(By.css('div.date div.handler.after a'));

          expect(afterHandler.attributes[UIClass.Hidden]).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit('Should have constant icon', () => {
          init();
          component.time = component.date = false;
          fixture.detectChanges();

          const afterHandlerIcon = fixture.debugElement.query(By.css('div.date div.handler.after a fa-icon svg'));

          expect(afterHandlerIcon.classes['fa-chevron-right']).toBeTrue();
        });

        fit('Should change date', () => {
          init();
          component.time = component.date = false;
          fixture.detectChanges();

          const afterHandler = fixture.debugElement.query(By.css('div.date div.handler.after a'));
          afterHandler.triggerEventHandler('mousedown', { target: afterHandler.nativeElement, button: 0 });
          fixture.detectChanges();

          expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.YearAfter });
        });
      });
    });
  });

  describe('Views', () => {
    describe('Calendar', () => {
      fit('Should exist', () => {
        (viewServiceSpy.view as any) = DateTimeView.Calendar;
        init();

        expect(fixture.nativeElement.querySelector('sfc-datetime-calendar')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('sfc-datetime-clock')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-datetime-year')).toBeNull();
      });

      fit('Should have all related attributes', () => {
        (viewServiceSpy.view as any) = DateTimeView.Calendar;
        component.minDate = new Date();
        component.maxDate = new Date();
        component.disabledDays = [new Date()];
        component.weekStart = WeekDay.Saturday;
        component.locale = 'en-EN';
        component.switchOnClick = true;
        init();

        const calendarEl = fixture.debugElement.query(By.css('sfc-datetime-calendar'));

        expect(calendarEl.componentInstance.minDate).toEqual(component.minDate);
        expect(calendarEl.componentInstance.maxDate).toEqual(component.maxDate);
        expect(calendarEl.componentInstance.disabledDays).toEqual(component.disabledDays);
        expect(calendarEl.componentInstance.weekStart).toEqual(component.weekStart);
        expect(calendarEl.componentInstance.locale).toEqual(component.locale);
        expect(calendarEl.componentInstance.switchOnClick).toBeTrue();
        expect(calendarEl.attributes['ng-reflect-current-date']).toEqual('Mon Oct 30 2034 15:15:00 GMT+0');
      });
    });

    describe('Clock', () => {
      fit('Should exist for hours', () => {
        (viewServiceSpy.view as any) = DateTimeView.Hours;
        init();

        expect(fixture.nativeElement.querySelector('sfc-datetime-calendar')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-datetime-clock')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('sfc-datetime-year')).toBeNull();
      });

      fit('Should exist for minutes', () => {
        (viewServiceSpy.view as any) = DateTimeView.Minutes;
        init();

        expect(fixture.nativeElement.querySelector('sfc-datetime-calendar')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-datetime-clock')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('sfc-datetime-year')).toBeNull();
      });

      fit('Should have all related attributes', () => {
        (viewServiceSpy.view as any) = DateTimeView.Hours;
        component.shortTime = true;
        component.minDate = new Date();
        component.maxDate = new Date();
        component.weekStart = WeekDay.Saturday;
        component.locale = 'en-EN';
        component.switchOnClick = true;
        init();

        const calendarEl = fixture.debugElement.query(By.css('sfc-datetime-clock'));

        expect(calendarEl.componentInstance.shortTime).toBeTrue();
        expect(calendarEl.componentInstance.hour).toEqual(15);
        expect(calendarEl.componentInstance.minute).toEqual(15);
        expect(calendarEl.componentInstance.time).toEqual('15:15');
        expect(calendarEl.componentInstance.minDate).toEqual(component.minDate);
        expect(calendarEl.componentInstance.maxDate).toEqual(component.maxDate);
        expect(calendarEl.componentInstance.locale).toEqual(component.locale);
        expect(calendarEl.componentInstance.switchOnClick).toBeTrue();
      });

      fit('Should time be empty', () => {
        (viewServiceSpy.view as any) = DateTimeView.Hours;
        component.date = false;
        init();

        expect(fixture.debugElement.query(By.css('sfc-datetime-clock')).componentInstance.time).toEqual(CommonConstants.EMPTY_STRING);
      });
    });

    describe('Year', () => {
      fit('Should exist', () => {
        (viewServiceSpy.view as any) = DateTimeView.Years;
        init();

        expect(fixture.nativeElement.querySelector('sfc-datetime-calendar')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-datetime-clock')).toBeNull();
        expect(fixture.nativeElement.querySelector('sfc-datetime-year')).toBeTruthy();
      });

      fit('Should have all related attributes', () => {
        (viewServiceSpy.view as any) = DateTimeView.Years;
        component.minDate = new Date();
        component.maxDate = new Date();
        init();

        const calendarEl = fixture.debugElement.query(By.css('sfc-datetime-year'));

        expect(calendarEl.componentInstance.year).toEqual(2034);
        expect(calendarEl.componentInstance.minDate).toEqual(component.minDate);
        expect(calendarEl.componentInstance.maxDate).toEqual(component.maxDate);
      });
    });
  });

  describe('Actions', () => {
    describe('Now', () => {
      fit('Should exist', () => {
        component.nowButton = true;
        init();

        expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(3);
      });

      fit('Should not exist', () => {
        init();

        expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
      });

      fit('Should have constant values', () => {
        component.nowButton = true;
        init();

        const nowBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[2];

        expect(nowBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
        expect(nowBtn.componentInstance.text).toEqual('Now');
      });

      fit('Should update value', () => {
        component.nowButton = true;
        init();

        const nowBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[2],
          event = { target: nowBtn.nativeElement, button: 0 };
        nowBtn.triggerEventHandler('mousedown', event);

        expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Init, value: new Date() });
      });
    });

    describe('Clear', () => {
      fit('Should exist', () => {
        component.clearButton = true;
        init();

        expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(3);
      });

      fit('Should not exist', () => {
        init();

        expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
      });

      fit('Should have constant values', () => {
        component.clearButton = true;
        init();

        const clearBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[2];

        expect(clearBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
        expect(clearBtn.componentInstance.text).toEqual('Clear');
      });

      fit('Should update value and view', () => {
        spyOn(component.update, 'emit');
        component.clearButton = true;
        init();

        const clearBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[2],
          event: any = { target: clearBtn.nativeElement, button: 0 };
        clearBtn.triggerEventHandler('mousedown', event);

        expect(valueServiceSpy.update).toHaveBeenCalledTimes(1);
        expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Hide, event: event });
        expect(component.update.emit).toHaveBeenCalledOnceWith(null);
      });
    });

    describe('Cancel', () => {
      fit('Should exist', () => {
        init();

        expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
      });

      fit('Should have constant values', () => {
        init();

        const cancelBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

        expect(cancelBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
        expect(cancelBtn.componentInstance.text).toEqual('Cancel');
      });

      fit('Should update view', () => {
        init();

        const cancelBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1],
          event: any = { target: cancelBtn.nativeElement, button: 0 };
        cancelBtn.triggerEventHandler('mousedown', event);

        expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Cancel, event: event });
      });
    });

    describe('Ok', () => {
      fit('Should exist', () => {
        init();

        expect(fixture.nativeElement.querySelectorAll('sfc-button').length).toEqual(2);
      });

      fit('Should have constant values', () => {
        init();

        const okBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

        expect(okBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
        expect(okBtn.componentInstance.text).toEqual('Ok');
      });

      fit('Should update view', () => {
        init();

        const okBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[0],
          event: any = { target: okBtn.nativeElement, button: 0 };
        okBtn.triggerEventHandler('mousedown', event);

        expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.Ok, event: event });
      });

      fit('Should be disabled by disabledDays', () => {
        component.disabledDays = [new Date(2021, 0, 1), new Date(2021, 0, 2)];
        valueServiceSpy.value = new Date(2021, 0, 2);
        init();

        expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].classes[UIClass.Disabled]).toBeTrue();
      });

      fit('Should be disabled by minDate', () => {
        component.time = false;
        component.minDate = new Date(2021, 0, 2);
        valueServiceSpy.value = new Date(2021, 0, 1);
        init();

        expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].classes[UIClass.Disabled]).toBeTrue();
      });

      fit('Should be disabled by maxDate', () => {
        component.time = false;
        component.maxDate = new Date(2021, 0, 2);
        valueServiceSpy.value = new Date(2021, 0, 3);
        fixture.detectChanges();
        init();

        expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].classes[UIClass.Disabled]).toBeTrue();
      });

      fit('Should be disabled by min, max dates and disabledDays', () => {
        component.time = false;
        component.disabledDays = [new Date(2021, 0, 4)];
        component.minDate = new Date(2021, 0, 3);
        component.maxDate = new Date(2021, 0, 5);
        valueServiceSpy.value = new Date(2021, 0, 4);
        fixture.detectChanges();
        init();

        expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].classes[UIClass.Disabled]).toBeTrue();
      });

      fit('Should be disabled by minDate with time', () => {
        component.minDate = new Date(2021, 0, 2, 13, 10);
        valueServiceSpy.value = new Date(2021, 0, 2, 13, 9);
        init();

        expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].classes[UIClass.Disabled]).toBeTrue();
      });

      fit('Should be disabled by maxDate with time', () => {
        component.maxDate = new Date(2021, 0, 2, 13, 10);
        valueServiceSpy.value = new Date(2021, 0, 2, 13, 11);
        fixture.detectChanges();
        init();

        expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].classes[UIClass.Disabled]).toBeTrue();
      });

      fit('Should be disabled by min, max dates and disabledDays with time', () => {
        component.disabledDays = [new Date(2021, 0, 4, 13, 9)];
        component.minDate = new Date(2021, 0, 3, 13, 11);
        component.maxDate = new Date(2021, 0, 5, 13, 12);
        valueServiceSpy.value = new Date(2021, 0, 4, 13, 10);
        fixture.detectChanges();
        init();

        expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].classes[UIClass.Disabled]).toBeTrue();
      });
    });
  });

  function init(day: string = 'Wednesday', state = DateTimeState.Undefined,
    event: MouseEvent | undefined = undefined) {
    valueServiceSpy.value$ = of({
      value: new Date(2034, 9, 30, 15, 15),
      day: day,
      dayNumber: 30,
      month: 'Sep',
      year: '2034',
      yearNumber: 2034,
      time: '15:15',
      hour: 15,
      shortHour: '3',
      prefixHour: "03",
      minute: 15,
      period: 'PM'
    });

    viewServiceSpy.view$ = of({
      currentView: DateTimeView.Calendar,
      previousView: null,
      state: state,
      event: event
    });

    component.ngOnInit();
    fixture.detectChanges();
  }
});
