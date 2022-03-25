import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ThrowElementOnHoverDirective } from "./throw-element-on-hover.directive";

@Component({
    template: `<div class="target" [sfcThrowElementOnHover]="value">`
})
class TestThrowElementOnHoverDirectiveComponent {

    @ViewChild(ThrowElementOnHoverDirective, { static: false })
    directive: ThrowElementOnHoverDirective = <ThrowElementOnHoverDirective><unknown>null;

    value?: number;
}

describe('Directive: ComponentSizeDirective', () => {

    let component: TestThrowElementOnHoverDirectiveComponent;
    let fixture: ComponentFixture<TestThrowElementOnHoverDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ThrowElementOnHoverDirective, TestThrowElementOnHoverDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestThrowElementOnHoverDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should have default value', () => {
        fixture.debugElement.query(By.css('div.target')).nativeElement
            .dispatchEvent(new MouseEvent('mouseenter'));

        expect(fixture.debugElement.query(By.css('div.target')).styles['transform'])
            .toEqual('');
    });

    fit('Should have defined value', () => {
        component.value = -20;
        fixture.detectChanges();

        fixture.debugElement.query(By.css('div.target')).nativeElement
            .dispatchEvent(new MouseEvent('mouseenter'));

        expect(fixture.debugElement.query(By.css('div.target')).styles['transform'])
            .toEqual('translateY(-20px)');
    });

    fit('Should toggle', () => {
        component.value = -20;
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('div.target'));

        el.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

        expect(el.styles['transform']).toEqual('translateY(-20px)');

        el.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));

        expect(el.styles['transform']).toEqual('');
    });
});