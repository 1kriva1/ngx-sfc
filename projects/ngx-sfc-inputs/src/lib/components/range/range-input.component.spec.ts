import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, Position, TooltipComponent, UIClass, WINDOW } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { RangeInputComponent } from './range-input.component';

describe('Component: RangeInput', () => {
    let component: RangeInputComponent;
    let fixture: ComponentFixture<RangeInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [TooltipComponent, InputReferenceDirective, RangeInputComponent],
            providers: [
                { provide: WINDOW, useFactory: (() => { return <any>{}; }) }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RangeInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('input[type=range]')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.range-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.component')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.range')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
        });

        fit('Should have default limits', () => {
            expect(component.min).toEqual(0);
            expect(component.max).toEqual(100);
        });

        fit('Should have default step', () => {
            expect(component.step).toEqual(1);
        });

        fit('Should default value equal to min limit', () => {
            expect(component.value).toEqual(component.min);
        });

        fit('Should have constant tooltip position', () => {
            expect(component.tooltipPosition).toEqual(Position.Top);
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

    describe('Limits', () => {
        describe('Before', () => {
            fit("Should not exist", () => {
                expect(fixture.nativeElement.querySelector('.limits.before')).toBeNull();
            });

            fit("Should exist, when show limits", () => {
                component.showLimits = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.before')).toBeTruthy();
            });

            fit("Should exist, when startIcon has value", () => {
                component.startIcon = faUser;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.before')).toBeTruthy();
            });

            fit("Should has default min value as display text", () => {
                component.showLimits = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.before').innerText).toEqual('0');
            });

            fit("Should has defined min value as display text", () => {
                component.showLimits = true;
                component.min = 10;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.before').innerText).toEqual(component.min.toString());
            });

            fit("Should has icon instead of min limit value", () => {
                component.showLimits = true;
                component.startIcon = faUser;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.before fa-icon')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('.limits.before span')).toBeNull();
            });

            fit("Should have defined start icon", () => {
                component.startIcon = faUser;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.before svg.fa-user')).toBeTruthy();
            });
        });

        describe('After', () => {
            fit("Should not exist", () => {
                expect(fixture.nativeElement.querySelector('.limits.after')).toBeNull();
            });

            fit("Should exist, when show limits", () => {
                component.showLimits = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after')).toBeTruthy();
            });

            fit("Should exist, when endIcon has value", () => {
                component.endIcon = faUser;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after')).toBeTruthy();
            });

            fit("Should exist, when show value", () => {
                component.showValue = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after')).toBeTruthy();
            });

            fit("Should has value  as display text", () => {
                component.showValue = true;
                component.writeValue(88);
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after').innerText).toEqual('88');
            });

            fit("Should has default max value as display text", () => {
                component.showLimits = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after').innerText).toEqual('100');
            });

            fit("Should has defined max value as display text", () => {
                component.showLimits = true;
                component.max = 1000;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after').innerText).toEqual(component.max.toString());
            });

            fit("Should has icon instead of max limit value", () => {
                component.showLimits = true;
                component.endIcon = faUser;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after fa-icon')).toBeTruthy();
                expect(fixture.nativeElement.querySelector('.limits.after span')).toBeNull();
            });

            fit("Should have defined end icon", () => {
                component.endIcon = faUser;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after svg.fa-user')).toBeTruthy();
            });
        });
    });

    describe('Label', () => {
        fit("Should not exist", () => {
            expect(fixture.nativeElement.querySelector('label')).toBeNull();
        });

        fit("Should have defined value", () => {
            const labelAssertValue = 'test label';
            component.label = labelAssertValue;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
        });

        fit("Should be linked to input element", () => {
            component.label = 'test';
            fixture.detectChanges();

            const inputEl = fixture.nativeElement.querySelector('input[type=range]');
            expect(inputEl.labels).toBeDefined();
            expect(inputEl.labels.length).toEqual(1);
            expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
        });

        fit("Should be active", () => {
            component.label = 'test';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });
    });

    describe('Tooltip', () => {
        fit("Should exist", () => {
            expect(fixture.nativeElement.querySelector('span.tooltip')).toBeTruthy();
        });

        fit("Should not exist", () => {
            component.tooltip = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.tooltip')).toBeNull();
        });

        fit("Should have default attributes", () => {
            const tooltipEl = fixture.debugElement.query(By.css('span.tooltip')),
                tooltipComponent = tooltipEl.componentInstance;

            expect(tooltipComponent.tooltipPosition).toEqual(Position.Top);
            expect(tooltipComponent.tooltipShow).toBeFalse();
            expect(tooltipComponent.value).toEqual('0');
            expect(tooltipEl.nativeElement.style.left).toContain('calc(0% + ');
        });

        fit("Should have attributes reflected to value", () => {
            component.writeValue(44);
            fixture.detectChanges();

            const tooltipEl = fixture.debugElement.query(By.css('span.tooltip')),
                tooltipComponent = tooltipEl.componentInstance;

            expect(tooltipComponent.value).toEqual('44');
            expect(tooltipEl.nativeElement.style.left).toContain('calc(44% + ');
        });

        fit("Should show on hover", () => {
            const inputEl = fixture.debugElement.query(By.css('input[type="range"]'));
            inputEl.triggerEventHandler('mousedown', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('span.tooltip')).componentInstance.tooltipShow).toBeTrue();
        });

        fit("Should hide on hover end", () => {
            const inputEl = fixture.debugElement.query(By.css('input[type="range"]'));
            inputEl.triggerEventHandler('mousedown', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('span.tooltip')).componentInstance.tooltipShow).toBeTrue();

            inputEl.triggerEventHandler('mouseup', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('span.tooltip')).componentInstance.tooltipShow).toBeFalse();
        });

        fit("Should change left position according to value changes", () => {
            component.writeValue(10);
            fixture.detectChanges();

            const tooltipEl = fixture.debugElement.query(By.css('span.tooltip')),
                tooltipComponent = tooltipEl.componentInstance;

            expect(tooltipComponent.value).toEqual('10');
            expect(tooltipEl.nativeElement.style.left).toContain('calc(10% + ');

            const inputEl = fixture.debugElement.query(By.css('input[type="range"]'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 44 } });
            fixture.detectChanges();

            const tooltipElAfter = fixture.debugElement.query(By.css('span.tooltip')),
                tooltipComponentAfter = tooltipElAfter.componentInstance;

            expect(tooltipComponentAfter.value).toEqual('44');
            expect(tooltipElAfter.nativeElement.style.left).toContain('calc(44% + ');
        });
    });

    describe('Input', () => {
        fit("Should have default id value", () => {
            expect(fixture.debugElement.query(By.css('input[type=range]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
        });

        fit("Should have defined id value", () => {
            component.id = 'test-id';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('input[type=range]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
        });

        fit("Should have default value", () => {
            expect(fixture.nativeElement.querySelector('input[type=range]').value).toEqual('0');
        });

        fit("Should have default attributes", () => {
            const rangeInputEl = fixture.nativeElement.querySelector('input[type=range]');

            expect(rangeInputEl.min).toEqual(component.min.toString());
            expect(rangeInputEl.max).toEqual(component.max.toString());
            expect(rangeInputEl.step).toEqual(component.step.toString());
        });

        fit("Should have defined attributes", () => {
            component.min = 20;
            component.max = 80;
            component.step = 4;
            fixture.detectChanges();

            const rangeInputEl = fixture.nativeElement.querySelector('input[type=range]');

            expect(rangeInputEl.min).toEqual(component.min.toString());
            expect(rangeInputEl.max).toEqual(component.max.toString());
            expect(rangeInputEl.step).toEqual(component.step.toString());
        });

        fit("Should have defined value", () => {
            component.writeValue(44);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=range]').value).toEqual('44');
        });

        fit("Should not be disabled", () => {
            expect(fixture.nativeElement.querySelector('input[type=range]').disabled).toBeFalse();
        });

        fit("Should be disabled", () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=range]').disabled).toBeTrue();
        });

        fit("Should change value", () => {
            const value = 44,
                inputEl = fixture.debugElement.query(By.css('input[type=range]'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
            fixture.detectChanges();

            expect(inputEl.nativeElement.value).toEqual(value.toString());
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
});
