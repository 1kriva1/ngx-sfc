import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Position } from "../../enums";
import { ScrollTrackerDirective } from "./scroll-tracker.directive";

@Component({
    template: `<div class="target" style="height:50px;overflow-y:scroll;border:1px dashed red;" (sfcScrollTracker)="onScroll($event)">
                    <div *ngFor="let _ of items" style="height:20px;">{{_}}</div>
               </div>`
})
class TestScrollTrackerDirectiveComponent {

    @ViewChild(ScrollTrackerDirective, { static: false })
    directive!: ScrollTrackerDirective;

    items: number[] = [1, 2, 3, 4, 5];

    onScroll(position: Position) { }
}

describe('Directive: ScrollTracker', () => {
    let component: TestScrollTrackerDirectiveComponent;
    let fixture: ComponentFixture<TestScrollTrackerDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScrollTrackerDirective, TestScrollTrackerDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestScrollTrackerDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    describe('Bottom', () => {
        fit('Should emit on bottom scroll', () => {
            spyOn(component, 'onScroll');
            component.directive.positions = [Position.Bottom];

            const targetEl = fixture.debugElement.query(By.css('div.target')).nativeElement;
            targetEl.scrollTop = targetEl.scrollHeight;

            targetEl.dispatchEvent(new Event('scroll'));

            expect(component.onScroll).toHaveBeenCalledOnceWith(Position.Bottom);
        });

        fit('Should not emit on bottom scroll', () => {
            spyOn(component, 'onScroll');
            component.directive.positions = [Position.Bottom];

            const targetEl = fixture.debugElement.query(By.css('div.target')).nativeElement;
            targetEl.scrollTop = 10;

            targetEl.dispatchEvent(new Event('scroll'));

            expect(component.onScroll).not.toHaveBeenCalledOnceWith(Position.Bottom);
        });

        fit('Should not emit on bottom scroll, when position has not bottom value', () => {
            spyOn(component, 'onScroll');
            component.directive.positions = [Position.Top];

            const targetEl = fixture.debugElement.query(By.css('div.target')).nativeElement;
            targetEl.scrollTop = targetEl.scrollHeight;

            targetEl.dispatchEvent(new Event('scroll'));

            expect(component.onScroll).not.toHaveBeenCalledOnceWith(Position.Bottom);
        });
    });

    describe('Top', () => {
        fit('Should emit on top scroll', () => {
            spyOn(component, 'onScroll');
            component.directive.positions = [Position.Top];

            const targetEl = fixture.debugElement.query(By.css('div.target')).nativeElement;
            targetEl.scrollTop = 0;

            targetEl.dispatchEvent(new Event('scroll'));

            expect(component.onScroll).toHaveBeenCalledOnceWith(Position.Top);
        });

        fit('Should not emit on top scroll', () => {
            spyOn(component, 'onScroll');
            component.directive.positions = [Position.Top];

            const targetEl = fixture.debugElement.query(By.css('div.target')).nativeElement;
            targetEl.scrollTop = 10;

            targetEl.dispatchEvent(new Event('scroll'));

            expect(component.onScroll).not.toHaveBeenCalledOnceWith(Position.Top);
        });

        fit('Should not emit on top scroll, when position has not top value', () => {
            spyOn(component, 'onScroll');
            component.directive.positions = [Position.Bottom];

            const targetEl = fixture.debugElement.query(By.css('div.target')).nativeElement;
            targetEl.scrollTop = 0;

            targetEl.dispatchEvent(new Event('scroll'));

            expect(component.onScroll).not.toHaveBeenCalledOnceWith(Position.Top);
        });
    });
});