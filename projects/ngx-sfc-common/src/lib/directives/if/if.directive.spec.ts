import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { UIConstants } from "../../constants";
import { IfDirective } from "./if.directive";

@Component({
    template: `<div class="target" [sfcIf]="show"></div>`
})
class TestIfDirectiveComponent {

    @ViewChild(IfDirective, { static: false })
    directive: IfDirective = <IfDirective><unknown>null;

    show?: boolean;
}

describe('Directive: If', () => {
    let component: TestIfDirectiveComponent;
    let fixture: ComponentFixture<TestIfDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IfDirective, TestIfDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestIfDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.directive).toBeTruthy();
        });
    });

    describe('Display', () => {
        fit('Should have default value', () => {
            component.show = true;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['display']).toEqual(UIConstants.CSS_INITIAL);
        });

        fit('Should be none', () => {            
            component.show = false;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['display']).toEqual(UIConstants.CSS_NONE);
        });

        fit('Should toggle value', () => {
            component.show = false;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('div.target'));

            expect(el.styles['display']).toEqual(UIConstants.CSS_NONE);

            component.show = true;
            fixture.detectChanges();

            expect(el.styles['display']).toEqual(UIConstants.CSS_INITIAL);
        });
    });
});