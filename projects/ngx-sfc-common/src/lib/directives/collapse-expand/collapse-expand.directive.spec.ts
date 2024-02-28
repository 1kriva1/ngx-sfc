import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { UIClass } from "../../enums/ui.enum";
import { CollapseExpandDirective } from "./collapse-expand.directive";

@Component({
    template: `<div class="target" [sfcCollapseExpand]="expand" [delay]="delay"></div>`
})
class TestCollapseExpandDirectiveComponent {
    @ViewChild(CollapseExpandDirective, { static: false })
    directive: CollapseExpandDirective = <CollapseExpandDirective><unknown>null;

    expand?: boolean;
    delay?: number;
}

describe('Directive: CollapseExpand', () => {
    let component: TestCollapseExpandDirectiveComponent;
    let fixture: ComponentFixture<TestCollapseExpandDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CollapseExpandDirective, TestCollapseExpandDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCollapseExpandDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.directive).toBeTruthy();
        });

        fit('Should have hidden overflow', () => {
            expect(fixture.debugElement.query(By.css('div.target')).styles['overflow'])
                .toEqual(UIClass.Hidden);
        });
    });

    describe('Height', () => {
        fit('Should have', () => {
            const el = fixture.debugElement.query(By.css('div.target'));

            Object.defineProperty(el.nativeElement, 'scrollHeight', { configurable: true, value: 500 });

            component.expand = true;
            fixture.detectChanges();

            expect(el.styles['maxHeight']).toEqual('500px');
        });

        fit('Should have not by default', () => {
            const el = fixture.debugElement.query(By.css('div.target'));

            Object.defineProperty(el.nativeElement, 'scrollHeight', { configurable: true, value: 500 });

            expect(el.styles['maxHeight']).toEqual('0px');
        });

        fit('Should have not', () => {
            const el = fixture.debugElement.query(By.css('div.target'));

            Object.defineProperty(el.nativeElement, 'scrollHeight', { configurable: true, value: 500 });

            component.expand = false;
            fixture.detectChanges();

            expect(el.styles['maxHeight']).toEqual('0px');
        });

        fit('Should toggle', () => {
            const el = fixture.debugElement.query(By.css('div.target'));

            Object.defineProperty(el.nativeElement, 'scrollHeight', { configurable: true, value: 500 });

            component.expand = false;
            fixture.detectChanges();

            expect(el.styles['maxHeight']).toEqual('0px');

            component.expand = true;
            fixture.detectChanges();

            expect(el.styles['maxHeight']).toEqual('500px');
        });
    });

    describe('Delay', () => {
        fit('Should have default delay', () => {
            const el = fixture.debugElement.query(By.css('div.target'));
            expect(el.styles['transition']).toEqual('max-height 0.5s ease-out 0s');
        });

        fit('Should have defined delay', () => {
            component.delay = 4.2;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['transition']).toEqual('max-height 4.2s ease-out 0s');
        });
    });
});