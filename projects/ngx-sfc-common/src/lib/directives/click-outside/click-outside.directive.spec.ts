import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DOCUMENT } from "../../services";
import { ClickOutsideDirective } from "./click-outside.directive";

@Component({
    template: `<div class="target" [sfcClickOutside]="value">
                <div class="inside"></div>
               </div>
               <div class="outside"></div>`
})
class TestClickOutsideDirective {
    @ViewChild(ClickOutsideDirective, { static: false })
    directive: ClickOutsideDirective = <ClickOutsideDirective><unknown>null;

    value: boolean = false;
}

describe('Directive: ClickOutsideDirective', () => {

    let component: TestClickOutsideDirective;
    let fixture: ComponentFixture<TestClickOutsideDirective>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClickOutsideDirective, TestClickOutsideDirective],
            providers: [{ provide: DOCUMENT, useValue: document }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestClickOutsideDirective);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.directive).toBeDefined();
        });

        fit("Should call unsubscribe on click subscription, when directive destroyed", () => {
            const unsubscribeSpy = spyOn(
                (component.directive as any)._clickSubscription,
                'unsubscribe'
            ).and.callThrough();

            component.directive?.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalled();
        });
    });

    describe('Click events', () => {
        fit('Should not emit action, if not listening', () => {
            spyOn(component.directive.action, 'emit');

            document.dispatchEvent(new MouseEvent('click'));

            expect(component.directive.action.emit).not.toHaveBeenCalled();
        });

        fit('Should emit action', () => {
            spyOn(component.directive.action, 'emit');
            component.value = true;
            fixture.detectChanges();

            document.dispatchEvent(new MouseEvent('click'));

            expect(component.directive.action.emit).toHaveBeenCalled();
        });

        fit('Should emit event with false value, when click target', () => {
            spyOn(component.directive.action, 'emit');
            spyOn<any>(component.directive, 'isDescendant').and.returnValue(true);
            component.value = true;
            fixture.detectChanges();

            document.dispatchEvent(new MouseEvent('click'));

            expect(component.directive.action.emit).toHaveBeenCalledOnceWith({
                target: document,
                value: false
            });
        });

        fit('Should emit event with false value, when click child', () => {
            spyOn(component.directive.action, 'emit');
            spyOn<any>(component.directive, 'isDescendant').and.returnValue(true);
            component.value = true;
            fixture.detectChanges();

            document.dispatchEvent(new MouseEvent('click'));

            expect(component.directive.action.emit).toHaveBeenCalledOnceWith({
                target: document,
                value: false
            });
        });

        fit('Should emit event with true value', () => {
            spyOn(component.directive.action, 'emit');
            spyOn<any>(component.directive, 'isDescendant').and.returnValue(false);
            component.value = true;
            fixture.detectChanges();

            document.dispatchEvent(new MouseEvent('click'));

            expect(component.directive.action.emit).toHaveBeenCalledOnceWith({
                target: document,
                value: true
            });
        });
    });
});