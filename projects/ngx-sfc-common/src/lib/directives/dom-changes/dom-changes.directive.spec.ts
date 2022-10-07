import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DomChangesDirective } from "./dom-changes.directive";

@Component({
    template: `<div class="target" (sfcDomChanges)="onDomChange($event)">
                <span *ngFor="let _ of items">{{_}}</span>
               </div>`
})
class TestDomChangesDirectiveComponent {

    @ViewChild(DomChangesDirective, { static: false })
    directive!: DomChangesDirective;

    items: number[] = [];

    addItem(value: number) {
        this.items.push(value);
    }

    onDomChange(_: MutationRecord) { }
}

describe('Directive: DomChanges', () => {

    let component: TestDomChangesDirectiveComponent;
    let fixture: ComponentFixture<TestDomChangesDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DomChangesDirective, TestDomChangesDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDomChangesDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should have default options', () => {
        expect(component.directive.options).toEqual({
            attributes: true,
            childList: true,
            characterData: true
        });
    });

    fit('Should changes property not be undefined', () => {
        expect((component.directive as any).changes).not.toBeUndefined();
    });

    fit('Should call disconnect on destroy', () => {
        spyOn((component.directive as any).changes, 'disconnect');

        component.directive.ngOnDestroy();

        expect((component.directive as any).changes.disconnect).toHaveBeenCalled();
    });

    fit('Should have one record', () => {
        const records = (component.directive as any).changes.takeRecords();

        expect(records.length).toEqual(1);
        expect(records[0].addedNodes.length).toEqual(1);
        expect(records[0].type).toEqual('childList');
    });

    fit('Should have two records', () => {
        component.addItem(1);
        fixture.detectChanges();

        const records = (component.directive as any).changes.takeRecords();

        expect(records.length).toEqual(2);
        expect(records[1].addedNodes.length).toEqual(1);
        expect(records[1].type).toEqual('childList');
    });
});