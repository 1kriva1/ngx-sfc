import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { UIConstants } from "../../constants";
import { ShowHideElementDirective } from "./show-hide-element.directive";

@Component({
    template: `<div class="target" [sfcShowHideElement]="show" [delay]="delay"></div>`
})
class TestShowHideElementDirectiveComponent {

    @ViewChild(ShowHideElementDirective, { static: false })
    directive: ShowHideElementDirective = <ShowHideElementDirective><unknown>null;

    show?: boolean;
    delay?: number;
}

describe('Directive: ShowHideElementDirective', () => {

    let component: TestShowHideElementDirectiveComponent;
    let fixture: ComponentFixture<TestShowHideElementDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShowHideElementDirective, TestShowHideElementDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestShowHideElementDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.directive).toBeTruthy();
        });
    });

    describe('Visibility', () => {
        fit('Should be visible', () => {
            component.show = true;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
            expect(el.styles['opacity']).toEqual('1');
        });

        fit('Should be hidden by default', () => {
            const el = fixture.debugElement.query(By.css('div.target'));
            expect(el.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            expect(el.styles['opacity']).toEqual('0');
        });

        fit('Should be hidden', () => {
            component.show = false;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            expect(el.styles['opacity']).toEqual('0');
        });

        fit('Should toggle visibility', () => {
            component.show = false;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            expect(el.styles['opacity']).toEqual('0');

            component.show = true;
            fixture.detectChanges();

            expect(el.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
            expect(el.styles['opacity']).toEqual('1');
        });
    });

    describe('Delay', () => {
        fit('Should have default delay', () => {
            const el = fixture.debugElement.query(By.css('div.target'));
            expect(el.styles['transition']).toEqual('visibility 0.5s ease 0s, opacity 0.5s linear 0s');
        });

        fit('Should have defined delay', () => {
            component.delay = 4.2;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['transition']).toEqual('visibility 4.2s ease 0s, opacity 4.2s linear 0s');
        });
    });
});