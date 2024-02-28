import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
    CommonConstants, ComponentSizeDirective, Position,
    TooltipComponent, UIClass, WINDOW
} from 'ngx-sfc-common';
import { StarsComponent } from 'ngx-sfc-components';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { RangeLimitInputState } from './enums/range-limit-input-state.enum';
import { RangeInputComponent } from './range-input.component';
import { RangeInputConstants } from './range-input.constants';

describe('Component: RangeInput', () => {
    let component: RangeInputComponent;
    let fixture: ComponentFixture<RangeInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [
                TooltipComponent, StarsComponent, ComponentSizeDirective,
                InputReferenceDirective, RangeInputComponent
            ],
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

        fit('Should have default multiple value', () => {
            component.multiple = true;

            expect(component.value).toEqual({ from: 0, to: 100 });
        });

        fit('Should have constant tooltip position', () => {
            expect(component.tooltipPosition).toEqual(Position.Top);
        });

        fit('Should default multiple index model', () => {
            expect(component.indexModel).toEqual({ from: RangeLimitInputState.Default, to: RangeLimitInputState.Active });
        });

        fit('Should have constant track position', () => {
            expect(component.trackPosition).toEqual(Position.Right);
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

    describe('Value & Stars', () => {
        fit("Should not exist by default", () => {
            expect(fixture.nativeElement.querySelector('span.value')).toBeNull();
        });

        fit("Should not exist", () => {
            component.showValue = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.value')).toBeNull();
        });

        fit("Should exist", () => {
            component.showValue = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.value')).toBeTruthy();
        });

        describe('Value', () => {
            fit("Should exist", () => {
                component.showValue = true;
                component.stars = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > span')).toBeTruthy();
            });

            fit("Should not exist", () => {
                component.showValue = true;
                component.stars = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > span')).toBeNull();
            });

            fit("Should have single value", () => {
                component.showValue = true;
                component.stars = false;
                component.writeValue(45);
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > span').innerText)
                    .toEqual('45');
            });

            fit("Should have multiple value", () => {
                component.showValue = true;
                component.stars = false;
                component.multiple = true;
                component.writeValue({ from: 10, to: 20 });
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > span').innerText)
                    .toEqual('From: 10 - To: 20');
            });

            fit("Should have custom multiple value", () => {
                component.showValue = true;
                component.stars = false;
                component.multiple = true;
                component.generateMultipleLabel = (from: number, to: number) => `Test from: ${from} and to: ${to}`;
                component.writeValue({ from: 10, to: 20 });
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > span').innerText)
                    .toEqual('Test from: 10 and to: 20');
            });
        });

        describe('Stars', () => {
            fit("Should exist", () => {
                component.showValue = true;
                component.stars = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > sfc-stars')).toBeTruthy();
            });

            fit("Should not exist", () => {
                component.showValue = true;
                component.stars = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > sfc-stars')).toBeNull();
            });

            fit("Should not exist for multiple", () => {
                component.showValue = true;
                component.stars = true;
                component.multiple = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('span.value > sfc-stars')).toBeNull();
            });

            fit("Should have default attributes", () => {
                component.showValue = true;
                component.stars = true;
                fixture.detectChanges();

                const starsEl = fixture.debugElement.query(By.css('span.value > sfc-stars'));

                expect(starsEl.componentInstance.value).toEqual(0);
                expect(starsEl.componentInstance.count).toEqual(RangeInputConstants.STARS_COUNT);
                expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.8');
            });

            fit("Should have defined value", () => {
                component.showValue = true;
                component.stars = true;
                component.writeValue(45);
                fixture.detectChanges();

                const starsEl = fixture.debugElement.query(By.css('span.value > sfc-stars'));

                expect(starsEl.componentInstance.value).toEqual(2.25);
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
        describe('Single', () => {
            fit("Should exist", () => {
                expect(fixture.nativeElement.querySelectorAll('span.tooltip').length).toEqual(1);
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

            fit("Should have attributes reflected to value change", () => {
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

            fit("Should toggle on touch events", () => {
                const inputEl = fixture.debugElement.query(By.css('input[type="range"]'));
                inputEl.triggerEventHandler('touchstart', { target: inputEl.nativeElement });
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('span.tooltip')).componentInstance.tooltipShow).toBeTrue();

                inputEl.triggerEventHandler('touchend', { target: inputEl.nativeElement });
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

        describe('Multiple', () => {
            fit("Should exist", () => {
                component.multiple = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('span.tooltip').length).toEqual(2);
            });

            fit("Should exist only single", () => {
                component.multiple = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('span.tooltip').length).toEqual(1);
            });

            fit("Should have default attributes", () => {
                component.multiple = true;
                fixture.detectChanges();

                const tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));

                tooltipEls.forEach((tooltipEl, index) => {
                    const tooltipComponent = tooltipEl.componentInstance;
                    expect(tooltipComponent.tooltipPosition).toEqual(Position.Top);
                    expect(tooltipComponent.tooltipShow).toBeFalse();
                    expect(tooltipComponent.value).toEqual(index === 0 ? '0' : '100');
                    expect(tooltipEl.nativeElement.style.left)
                        .toContain(`calc(${index === 0 ? 0 : 100}% ${index === 0 ? '+' : '-'} `);
                });
            });

            fit("Should have attributes reflected to value change", () => {
                component.multiple = true;
                component.writeValue({ from: 44, to: 88 });
                fixture.detectChanges();

                const tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));

                expect(tooltipEls[0].componentInstance.value).toEqual('44');
                expect(tooltipEls[0].nativeElement.style.left).toContain('calc(44% + ');

                expect(tooltipEls[1].componentInstance.value).toEqual('88');
                expect(tooltipEls[1].nativeElement.style.left).toContain('calc(88% - ');
            });

            describe('From', () => {
                fit("Should show on hover", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-from`)),
                        tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));
                    inputEl.triggerEventHandler('mousedown', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeTrue();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeFalse();
                });

                fit("Should hide on hover end", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-from`)),
                        tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));
                    inputEl.triggerEventHandler('mousedown', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeTrue();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeFalse();

                    inputEl.triggerEventHandler('mouseup', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeFalse();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeFalse();
                });

                fit("Should toggle on touch events", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-from`)),
                        tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));
                    inputEl.triggerEventHandler('touchstart', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeTrue();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeFalse();

                    inputEl.triggerEventHandler('touchend', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeFalse();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeFalse();
                });

                fit("Should change left position according to value changes", () => {
                    component.multiple = true;
                    component.writeValue({ from: 10, to: 88 });
                    fixture.detectChanges();

                    const tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));

                    expect(tooltipEls[0].componentInstance.value).toEqual('10');
                    expect(tooltipEls[0].nativeElement.style.left).toContain('calc(10% + ');

                    expect(tooltipEls[1].componentInstance.value).toEqual('88');
                    expect(tooltipEls[1].nativeElement.style.left).toContain('calc(88% - ');

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-from`));
                    inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 44 } });
                    fixture.detectChanges();

                    const tooltipElsAfter = fixture.debugElement.queryAll(By.css('span.tooltip'));

                    expect(tooltipElsAfter[0].componentInstance.value).toEqual('44');
                    expect(tooltipElsAfter[0].nativeElement.style.left).toContain('calc(44% + ');
                    expect(tooltipElsAfter[1].componentInstance.value).toEqual('88');
                    expect(tooltipElsAfter[1].nativeElement.style.left).toContain('calc(88% - ');
                });
            });

            describe('To', () => {
                fit("Should show on hover", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-to`)),
                        tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));
                    inputEl.triggerEventHandler('mousedown', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeFalse();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeTrue();
                });

                fit("Should hide on hover end", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-to`)),
                        tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));
                    inputEl.triggerEventHandler('mousedown', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeFalse();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeTrue();

                    inputEl.triggerEventHandler('mouseup', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeFalse();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeFalse();
                });

                fit("Should toggle on touch events", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-to`)),
                        tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));
                    inputEl.triggerEventHandler('touchstart', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeFalse();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeTrue();

                    inputEl.triggerEventHandler('touchend', { target: inputEl.nativeElement });
                    fixture.detectChanges();

                    expect(tooltipEls[0].componentInstance.tooltipShow).toBeFalse();
                    expect(tooltipEls[1].componentInstance.tooltipShow).toBeFalse();
                });

                fit("Should change left position according to value changes", () => {
                    component.multiple = true;
                    component.writeValue({ from: 10, to: 88 });
                    fixture.detectChanges();

                    const tooltipEls = fixture.debugElement.queryAll(By.css('span.tooltip'));

                    expect(tooltipEls[0].componentInstance.value).toEqual('10');
                    expect(tooltipEls[0].nativeElement.style.left).toContain('calc(10% + ');

                    expect(tooltipEls[1].componentInstance.value).toEqual('88');
                    expect(tooltipEls[1].nativeElement.style.left).toContain('calc(88% - ');

                    const inputEl = fixture.debugElement.query(By.css(`.multiple input[type="range"]#${component.inputId}-to`));
                    inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 44 } });
                    fixture.detectChanges();

                    const tooltipElsAfter = fixture.debugElement.queryAll(By.css('span.tooltip'));

                    expect(tooltipElsAfter[0].componentInstance.value).toEqual('10');
                    expect(tooltipElsAfter[0].nativeElement.style.left).toContain('calc(10% + ');
                    expect(tooltipElsAfter[1].componentInstance.value).toEqual('44');
                    expect(tooltipElsAfter[1].nativeElement.style.left).toContain('calc(44% + ');
                });
            });
        });
    });

    describe('Input', () => {
        describe('Single', () => {
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

        describe('Multiple', () => {
            fit("Should exist", () => {
                component.multiple = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('div.multiple')).toBeTruthy();
                expect(fixture.nativeElement.querySelectorAll('input[type=range]').length).toEqual(2);
            });

            fit("Should not exist", () => {
                component.multiple = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('div.multiple')).toBeNull();
                expect(fixture.nativeElement.querySelectorAll('input[type=range]').length).toEqual(1);
            });

            fit("Should have default style variables", () => {
                component.multiple = true;
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('div.multiple')).attributes['style'])
                    .toEqual('--from: 0; --to: 100; --max: 100; --min: 0; --index-from: 1; --index-to: 2; --direction: right;');
            });

            describe('From', () => {
                fit("Should have default id value", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('input[type=range]'))[0].nativeElement.id)
                        .toEqual(`${InputConstants.ID_PREFIX}undefined-from`);
                });

                fit("Should have defined id value", () => {
                    component.multiple = true;
                    component.id = 'test-id';
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('input[type=range]'))[0].nativeElement.id)
                        .toEqual(`${InputConstants.ID_PREFIX}test-id-from`);
                });

                fit("Should have default value", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-from`).value)
                        .toEqual('0');
                });

                fit("Should have default attributes", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const rangeInputEl = fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-from`);

                    expect(rangeInputEl.min).toEqual(component.min.toString());
                    expect(rangeInputEl.max).toEqual(component.max.toString());
                    expect(rangeInputEl.step).toEqual(component.step.toString());
                });

                fit("Should have defined attributes", () => {
                    component.multiple = true;
                    component.min = 20;
                    component.max = 80;
                    component.step = 4;
                    fixture.detectChanges();

                    const rangeInputEl = fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-from`);

                    expect(rangeInputEl.min).toEqual(component.min.toString());
                    expect(rangeInputEl.max).toEqual(component.max.toString());
                    expect(rangeInputEl.step).toEqual(component.step.toString());
                });

                fit("Should have defined value", () => {
                    component.multiple = true;
                    component.writeValue({ from: 44, to: 100 });
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-from`).value)
                        .toEqual('44');
                });

                fit("Should not be disabled", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-from`).disabled).toBeFalse();
                });

                fit("Should be disabled", () => {
                    component.multiple = true;
                    component.disabled = true;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-from`).disabled).toBeTrue();
                });

                fit("Should change value", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const value = 44,
                        inputEl = fixture.debugElement.query(By.css(`input[type="range"]#${component.inputId}-from`));
                    inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
                    fixture.detectChanges();

                    expect(inputEl.nativeElement.value).toEqual(value.toString());
                    expect(component.value).toEqual({ from: 44, to: 100 });
                });

                fit("Should prevent change value when from more than to", () => {
                    component.multiple = true;
                    component.writeValue({ from: 20, to: 30 });
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`input[type="range"]#${component.inputId}-from`));
                    inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 31 } });
                    fixture.detectChanges();

                    expect(inputEl.nativeElement.value).toEqual('30');
                    expect(component.value).toEqual({ from: 30, to: 30 });
                    expect(component.indexModel).toEqual({ from: RangeLimitInputState.Active, to: RangeLimitInputState.Default });
                });
            });

            describe('To', () => {
                fit("Should have default id value", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('input[type=range]'))[1].nativeElement.id)
                        .toEqual(`${InputConstants.ID_PREFIX}undefined-to`);
                });

                fit("Should have defined id value", () => {
                    component.multiple = true;
                    component.id = 'test-id';
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('input[type=range]'))[1].nativeElement.id)
                        .toEqual(`${InputConstants.ID_PREFIX}test-id-to`);
                });

                fit("Should have default value", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-to`).value)
                        .toEqual('100');
                });

                fit("Should have default attributes", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const rangeInputEl = fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-to`);

                    expect(rangeInputEl.min).toEqual(component.min.toString());
                    expect(rangeInputEl.max).toEqual(component.max.toString());
                    expect(rangeInputEl.step).toEqual(component.step.toString());
                });

                fit("Should have defined attributes", () => {
                    component.multiple = true;
                    component.min = 20;
                    component.max = 80;
                    component.step = 4;
                    fixture.detectChanges();

                    const rangeInputEl = fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-to`);

                    expect(rangeInputEl.min).toEqual(component.min.toString());
                    expect(rangeInputEl.max).toEqual(component.max.toString());
                    expect(rangeInputEl.step).toEqual(component.step.toString());
                });

                fit("Should have defined value", () => {
                    component.multiple = true;
                    component.writeValue({ from: 14, to: 44 });
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-to`).value)
                        .toEqual('44');
                });

                fit("Should not be disabled", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-to`).disabled).toBeFalse();
                });

                fit("Should be disabled", () => {
                    component.multiple = true;
                    component.disabled = true;
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector(`input[type="range"]#${component.inputId}-to`).disabled).toBeTrue();
                });

                fit("Should change value", () => {
                    component.multiple = true;
                    fixture.detectChanges();

                    const value = 44,
                        inputEl = fixture.debugElement.query(By.css(`input[type="range"]#${component.inputId}-to`));
                    inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
                    fixture.detectChanges();

                    expect(inputEl.nativeElement.value).toEqual(value.toString());
                    expect(component.value).toEqual({ from: 0, to: 44 });
                });

                fit("Should prevent change value when to less than to", () => {
                    component.multiple = true;
                    component.writeValue({ from: 20, to: 30 });
                    fixture.detectChanges();

                    const inputEl = fixture.debugElement.query(By.css(`input[type="range"]#${component.inputId}-to`));
                    inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 19 } });
                    fixture.detectChanges();

                    expect(inputEl.nativeElement.value).toEqual('20');
                    expect(component.value).toEqual({ from: 20, to: 20 });
                    expect(component.indexModel).toEqual({ from: RangeLimitInputState.Default, to: RangeLimitInputState.Active });
                });
            });
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
