import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, ShowHideElementDirective, UIClass } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { DateTimeModalComponent } from '../no-export-index';
import { DateTimeInputComponent } from './datetime-input.component';
import { DateTimeValueActionType } from './service/value/datetime-value.enum';
import { DateTimeValueService } from './service/value/datetime-value.service';
import { DateTimeViewService } from './service/view/datetime-view.service';
import { DateTimeViewActionType } from './service/view/enums/datetime-view.enum';

describe('Component: DateTimeInput', () => {
    let component: DateTimeInputComponent;
    let fixture: ComponentFixture<DateTimeInputComponent>;
    let valueServiceSpy: jasmine.SpyObj<DateTimeValueService>;
    let viewServiceSpy: jasmine.SpyObj<DateTimeViewService>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [ShowHideElementDirective, InputReferenceDirective, DateTimeModalComponent, DateTimeInputComponent]
        }).compileComponents();

        valueServiceSpy = jasmine.createSpyObj('DateTimeValueService', ['update', 'init']);
        viewServiceSpy = jasmine.createSpyObj('DateTimeViewService', ['update', 'init']);
        valueServiceSpy.value = new Date(2034, 9, 30, 15, 15);

        TestBed.overrideComponent(DateTimeInputComponent, {
            set: {
                providers: [
                    { provide: DateTimeValueService, useValue: valueServiceSpy },
                    { provide: DateTimeViewService, useValue: viewServiceSpy }
                ]
            }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DateTimeInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('input[type=text]')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-datetime-modal')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
        });

        fit('Should call view init', () => {
            expect(viewServiceSpy.init).toHaveBeenCalledOnceWith({ date: component.date, time: component.time });
        });

        fit('Should call value init', () => {
            expect(valueServiceSpy.init).toHaveBeenCalledTimes(1);
        });

        fit('Should call value init with defined value', () => {
            const assertValue = new Date(2033, 8, 29, 13, 16);
            component.writeValue(assertValue);
            component.ngOnInit();

            expect(valueServiceSpy.init).toHaveBeenCalledWith({
                date: component.date,
                time: component.time,
                format: component.format,
                locale: component.locale,
                shortTime: component.shortTime,
                disabledDays: component.disabledDays,
                value: assertValue
            });
        });

        fit('Should change value on update', () => {
            component.update(new Date(2033, 8, 29, 13, 16));
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('29/9/2033, 13:16');
        });

        fit('Should refresh view on update', () => {
            component.update(new Date(2033, 8, 29, 13, 16));

            expect(viewServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeViewActionType.RefreshState });
        });

        fit('Should call update value on change input value', () => {
            const assertValue = new Date(2033, 8, 29, 13, 16);
            component.writeValue(assertValue);

            expect(valueServiceSpy.update).toHaveBeenCalledOnceWith({ type: DateTimeValueActionType.Init, value: assertValue });
        });

        fit("Should call unsubscribe on value change subscription", () => {
            const unsubscribeSpy = spyOn(
                (component as any)._valueChangeSubscription,
                'unsubscribe'
            ).and.callThrough();

            component.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalled();
        });

        fit('Should prepare min and max dates', () => {
            component.minDate = new Date();
            component.maxDate = new Date();

            expect(component.minDate.getSeconds()).toEqual(0);
            expect(component.minDate.getMilliseconds()).toEqual(0);
        });
    });

    describe('Icon', () => {
        fit('Should not exist', () => {
            expect(fixture.nativeElement.querySelector('.icon')).toBeNull();
        });

        fit('Should exist', () => {
            component.icon = faUser;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.icon')).toBeTruthy();
        });

        fit('Should have defined value', () => {
            component.icon = faUser;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.icon svg.fa-user')).toBeTruthy();
        });
    });

    describe('Input', () => {
        fit("Should have default id value", () => {
            expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
        });

        fit("Should have defined id value", () => {
            component.id = 'test-id';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
        });

        fit("Should have default value", () => {
            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have defined value for date and time", () => {
            component.writeValue(valueServiceSpy.value);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('30/10/2034, 15:15');
        });

        fit("Should have defined value for date and time with shortTime", () => {
            component.shortTime = true;
            component.writeValue(valueServiceSpy.value);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('30/10/2034, 3:15PM');
        });

        fit("Should have defined value for date only", () => {
            component.time = false;
            component.writeValue(valueServiceSpy.value);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('30/10/2034');
        });

        fit("Should have defined value for time only", () => {
            component.date = false;
            component.writeValue(valueServiceSpy.value);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('15:15');
        });

        fit("Should have defined value for time only with shortTime", () => {
            component.shortTime = true;
            component.date = false;
            component.writeValue(valueServiceSpy.value);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('3:15 PM');
        });

        fit("Should have defined value for years only", () => {
            component.date = false;
            component.time = false;
            component.writeValue(valueServiceSpy.value);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('Monday, October 30, 2034 at 3:15:00 PM GMT+02:00');
        });

        fit("Should have defined value for custom format", () => {
            component.format = 'YYYY-MM-dd'
            component.writeValue(valueServiceSpy.value);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('2034-10-30');
        });

        fit("Should not be disabled", () => {
            expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeFalse();
        });

        fit("Should be disabled", () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeTrue();
        });
    });

    describe('Label', () => {
        fit("Should have default value", () => {
            expect(fixture.nativeElement.querySelector('label').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have defined value", () => {
            const labelAssertValue = 'test label';
            component.label = labelAssertValue;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
        });

        fit("Should be linked to input element", () => {
            const inputEl = fixture.nativeElement.querySelector('input[type=text]');
            expect(inputEl.labels).toBeDefined();
            expect(inputEl.labels.length).toEqual(1);
            expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
        });

        fit("Should be active, when placeholder exist", () => {
            component.placeholder = 'test placeholder';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });

        fit("Should be active, when value defined", () => {
            component.writeValue(new Date());
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });

        fit("Should be active, when input in focus", () => {
            const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });
    });

    describe('Placeholder', () => {
        fit("Should be empty by default", () => {
            const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have value", () => {
            const placeholderAssertValue = "test placeholder",
                inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            component.placeholder = placeholderAssertValue;
            fixture.detectChanges();

            expect(inputEl.nativeElement.placeholder).toEqual(placeholderAssertValue);
        });

        fit("Should be empty when input focused", () => {
            const placeholderAssertValue = "test placeholder",
                inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            component.placeholder = placeholderAssertValue;
            fixture.detectChanges();

            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
        });
    });

    describe('Helper text', () => {
        fit("Should be empty by default", () => {
            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have value", () => {
            const helperTextAssertValue = 'test helper text';
            component.helperText = helperTextAssertValue;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
        });
    });

    describe('Modal', () => {
        fit('Should be hidden', () => {
            expect(fixture.nativeElement.querySelector('sfc-datetime-modal').style.visibility).toEqual(UIClass.Hidden);
        });

        fit('Should show on focus', () => {
            const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-datetime-modal').style.visibility).toEqual(UIClass.Visible);
        });

        fit('Should have all related attributes', () => {
            component.minDate = new Date();
            component.maxDate = new Date();
            component.disabledDays = [new Date()];
            fixture.detectChanges();

            const calendarEl = fixture.debugElement.query(By.css('sfc-datetime-modal'));

            expect(calendarEl.componentInstance.date).toBeTrue();
            expect(calendarEl.componentInstance.time).toBeTrue();
            expect(calendarEl.componentInstance.year).toBeTrue();
            expect(calendarEl.componentInstance.shortTime).toBeFalse();
            expect(calendarEl.componentInstance.clearButton).toBeFalse();
            expect(calendarEl.componentInstance.nowButton).toBeFalse();
            expect(calendarEl.componentInstance.minDate).toEqual(component.minDate);
            expect(calendarEl.componentInstance.maxDate).toEqual(component.maxDate);
            expect(calendarEl.componentInstance.disabledDays).toEqual(component.disabledDays);
            expect(calendarEl.componentInstance.weekStart).toEqual(component.weekStart);
            expect(calendarEl.componentInstance.locale).toEqual(component.locale);
            expect(calendarEl.componentInstance.switchOnClick).toBeFalse();
            expect(calendarEl.attributes['ng-reflect-delay']).toEqual('0');
        });
    });
});