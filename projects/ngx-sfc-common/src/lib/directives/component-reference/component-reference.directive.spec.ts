import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ComponentReferenceDirective } from "./component-reference.directive";

@Component({
    template: `<div class="target" sfcComponentReference #test="componentRef"></div>`
})
class TestComponentReferenceDirectiveComponent {
    @ViewChild(ComponentReferenceDirective, { static: false })
    directive: ComponentReferenceDirective = <ComponentReferenceDirective><unknown>null;
}

describe('Directive: ComponentReference', () => {
    let component: TestComponentReferenceDirectiveComponent;
    let fixture: ComponentFixture<TestComponentReferenceDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ComponentReferenceDirective, TestComponentReferenceDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentReferenceDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should have reference', () => {
        expect(component.directive.elementRef).toBeDefined();
    });

    fit('Should have correct reference', () => {
        expect(component.directive.elementRef.nativeElement).
            toEqual(fixture.debugElement.query(By.css('div.target')).nativeElement);
    });
});