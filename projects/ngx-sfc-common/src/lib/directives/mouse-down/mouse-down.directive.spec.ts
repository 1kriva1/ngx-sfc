import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CommonConstants } from "../../constants";
import { MouseDownDirective } from "./mouse-down.directive";

@Component({
    template: `<div class="target" (sfcMouseDown)="click($event)" [button]="button">`
})
class TestMouseDownDirectiveComponent {

    @ViewChild(MouseDownDirective, { static: false })
    directive: MouseDownDirective = <MouseDownDirective><unknown>null;

    button?: number;
    click = (event: MouseEvent) => { };
}

describe('Directive: MouseDownDirective', () => {

    let component: TestMouseDownDirectiveComponent;
    let fixture: ComponentFixture<TestMouseDownDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MouseDownDirective, TestMouseDownDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMouseDownDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should emit event', () => {
        spyOn(component.directive.action, 'emit');
        component.button = CommonConstants.MOUSE_BUTTON_LEFT;
        fixture.detectChanges();

        const event = new MouseEvent('mousedown', { button: CommonConstants.MOUSE_BUTTON_LEFT });
        fixture.debugElement.query(By.css('div.target')).nativeElement
            .dispatchEvent(event);

        expect(component.directive.action.emit).toHaveBeenCalledOnceWith(event);
    });

    fit('Should not emit event, when button not left', () => {
        spyOn(component.directive.action, 'emit');
        component.button = 1;
        fixture.detectChanges();

        const event = new MouseEvent('mousedown', { button: CommonConstants.MOUSE_BUTTON_LEFT });
        fixture.debugElement.query(By.css('div.target')).nativeElement
            .dispatchEvent(event);

        expect(component.directive.action.emit).not.toHaveBeenCalled();
    });

    fit('Should not emit event, when clicked not left button', () => {
        spyOn(component.directive.action, 'emit');
        component.button = CommonConstants.MOUSE_BUTTON_LEFT;
        fixture.detectChanges();

        const event = new MouseEvent('mousedown', { button: 1 });
        fixture.debugElement.query(By.css('div.target')).nativeElement
            .dispatchEvent(event);

        expect(component.directive.action.emit).not.toHaveBeenCalled();
    });
});