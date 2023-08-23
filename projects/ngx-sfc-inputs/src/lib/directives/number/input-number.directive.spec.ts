import { Component, DebugElement, OnInit, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { InputNumberDirective } from "./input-number.directive";

@Component({
    template: `<form [formGroup]="formGroup">
                  <input sfcNumberInput type="text" name="text-input" formControlName="input" >
             </form>`
})
class TestInputNumberComponent implements OnInit {
    public formGroup!: UntypedFormGroup;

    constructor(public formBuilder: UntypedFormBuilder) { }
    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            input: [null]
        });
    }

    @ViewChild(InputNumberDirective, { static: false })
    public directive!: InputNumberDirective;
}

describe('Directive: InputNumber', () => {
    let component: TestInputNumberComponent;
    let fixture: ComponentFixture<TestInputNumberComponent>;
    let inputEl: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [InputNumberDirective, TestInputNumberComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInputNumberComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.directive).toBeTruthy();
        });
    });

    describe('Input event', () => {
        fit('Should set value to input element', () => {
            const assertValue = '124';
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: assertValue } });
            fixture.detectChanges();

            expect(inputEl.nativeElement.value).toEqual(assertValue);
        });

        fit('Should remove hyphen from value (except start)', () => {
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: '21-' } });
            fixture.detectChanges();

            expect(inputEl.nativeElement.value).toEqual('21');

            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: '2-1' } });
            fixture.detectChanges();

            expect(inputEl.nativeElement.value).toEqual('21');

            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: '-21' } });
            fixture.detectChanges();

            expect(inputEl.nativeElement.value).toEqual('-21');
        });

        describe('Integer signed', () => {
            fit('Should be valid', () => {
                const assertValue = '-124',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual(assertValue);
                expect(event.preventDefault).not.toHaveBeenCalled();
            });

            fit('Should be invalid', () => {
                const assertValue = '1s24',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual('');
                expect(event.preventDefault).toHaveBeenCalled();
            });
        });

        describe('Integer unsigned', () => {
            fit('Should be valid', () => {
                component.directive.sign = false;

                const assertValue = '124',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual(assertValue);
                expect(event.preventDefault).not.toHaveBeenCalled();
            });

            fit('Should be invalid', () => {
                component.directive.sign = false;

                const assertValue = '-124',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual('');
                expect(event.preventDefault).toHaveBeenCalled();
            });
        });

        describe('Decimal signed', () => {
            fit('Should be valid', () => {
                component.directive.decimals = true;

                const assertValue = '-0.124',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual(assertValue);
                expect(event.preventDefault).not.toHaveBeenCalled();
            });

            fit('Should be invalid', () => {
                component.directive.decimals = true;

                const assertValue = '0.1s24',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual('');
                expect(event.preventDefault).toHaveBeenCalled();
            });

            fit('Should add zero to start', () => {
                component.directive.decimals = true;

                const assertValue = '.124',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual('0.124');
                expect(event.preventDefault).not.toHaveBeenCalled();
            });

            fit('Should add zero to end', () => {
                component.directive.decimals = true;

                const assertValue = '124.',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual('124.0');
                expect(event.preventDefault).not.toHaveBeenCalled();
            });
        });

        describe('Decimal unsigned', () => {
            fit('Should be valid', () => {
                component.directive.sign = false;
                component.directive.decimals = true;

                const assertValue = '0.124',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual(assertValue);
                expect(event.preventDefault).not.toHaveBeenCalled();
            });

            fit('Should be invalid', () => {
                component.directive.sign = false;
                component.directive.decimals = true;

                const assertValue = '-0.124',
                    event: any = {
                        target: { nativeElement: inputEl.nativeElement, value: assertValue },
                        preventDefault: () => { }
                    };

                spyOn(event, 'preventDefault');

                inputEl.triggerEventHandler('input', event);
                fixture.detectChanges();

                expect(inputEl.nativeElement.value).toEqual('');
                expect(event.preventDefault).toHaveBeenCalled();
            });
        });
    });

    describe('Paste event', () => {
        fit('Should be valid', () => {
            const assertValue = '-124',
                event: any = new ClipboardEvent('paste', {
                    clipboardData: new DataTransfer()
                });

            event.clipboardData.setData('text/plain', assertValue);

            spyOn(event, 'preventDefault');

            inputEl.triggerEventHandler('paste', event);
            fixture.detectChanges();

            expect(inputEl.nativeElement.value).toEqual(assertValue);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        fit('Should be invalid', () => {
            const assertValue = '1s24',
                event: any = new ClipboardEvent('paste', {
                    clipboardData: new DataTransfer()
                });

            event.clipboardData.setData('text/plain', assertValue);

            spyOn(event, 'preventDefault');

            inputEl.triggerEventHandler('paste', event);
            fixture.detectChanges();

            expect(inputEl.nativeElement.value).toEqual('');
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('Keydown event', () => {
        fit('Should not prevent', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': '1' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should prevent', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': 's' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).toHaveBeenCalled();
        });

        fit('Should not prevent if ctrl-a', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': 'a', ctrlKey: true });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if ctrl-c', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': 'c', ctrlKey: true });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if ctrl-v', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': 'v', ctrlKey: true });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if ctrl-x', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': 'x', ctrlKey: true });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if meta-x', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': 'x', metaKey: true });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if hyphen', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': '-' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if Backspace', () => {
            const event: any = new KeyboardEvent('keydown', { 'key': 'Backspace' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if decimal with dot separator', () => {
            component.directive.decimals = true;

            inputEl.nativeElement.value = '0';

            const event: any = new KeyboardEvent('keydown', { 'key': '.' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should not prevent if decimal with comma separator', () => {
            component.directive.decimals = true;
            component.directive.decimalSeparator = ',';

            inputEl.nativeElement.value = '0';

            const event: any = new KeyboardEvent('keydown', { 'key': ',' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        fit('Should prevent if decimal with comma separator', () => {
            component.directive.decimals = true;
            component.directive.decimalSeparator = ',';

            inputEl.nativeElement.value = '0';

            const event: any = new KeyboardEvent('keydown', { 'key': '.' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).toHaveBeenCalled();
        });

        fit('Should prevent if decimal with existing dot separator', () => {
            component.directive.decimals = true;
            inputEl.nativeElement.value = '0.1';

            const event: any = new KeyboardEvent('keydown', { 'key': '.' });

            spyOn(event, 'preventDefault');

            inputEl.nativeElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).toHaveBeenCalled();
        });
    });
});