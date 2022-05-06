import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { DestroyParentDirective } from "./destroy-parent.directive";

@Component({
    template: `<div class="parent">
                <div [sfcDestroyParent]="destroy" [delay]="delay"></div>
               </div>`
})
class TestDestroyParentDirectiveComponent {

    @ViewChild(DestroyParentDirective, { static: false })
    directive!: DestroyParentDirective;

    destroy: boolean = false;
    delay?: number;
}

describe('Directive: DestroyParentDirective', () => {
    let component: TestDestroyParentDirectiveComponent;
    let fixture: ComponentFixture<TestDestroyParentDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DestroyParentDirective, TestDestroyParentDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDestroyParentDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should not destroy parent', fakeAsync(() => {
        expect(fixture.nativeElement.querySelector('div.parent')).toBeTruthy();

        component.destroy = false;
        fixture.detectChanges();

        tick(component.delay);

        expect(fixture.nativeElement.querySelector('div.parent')).toBeTruthy();

        discardPeriodicTasks();
    }));

    fit('Should destroy parent instantly', fakeAsync(() => {
        expect(fixture.nativeElement.querySelector('div.parent')).toBeTruthy();

        component.destroy = true;
        fixture.detectChanges();

        tick(component.delay);

        expect(fixture.nativeElement.querySelector('div.parent')).toBeNull();

        discardPeriodicTasks();
    }));

    fit('Should destroy parent after delay', fakeAsync(() => {
        expect(fixture.nativeElement.querySelector('div.parent')).toBeTruthy();

        component.destroy = true;
        component.delay = 5000;
        fixture.detectChanges();

        tick(component.delay);

        expect(fixture.nativeElement.querySelector('div.parent')).toBeNull();

        discardPeriodicTasks();
    }));
});