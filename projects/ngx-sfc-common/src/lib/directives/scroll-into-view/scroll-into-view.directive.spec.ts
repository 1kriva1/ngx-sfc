import { Component, ElementRef, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ScrollIntoViewDirective } from "./scroll-into-view.directive";

@Component({
    template: `<div [sfcScrollIntoView]="targetEl" [local]="local">
                    <span #target></span>
               </div>`
})
class TestScrollIntoViewDirectiveComponent {

    @ViewChild('target')
    target!: ElementRef;

    @ViewChild(ScrollIntoViewDirective, { static: false })
    directive!: ScrollIntoViewDirective;

    targetEl!: HTMLElement;

    local: boolean = false;

    setTarget(el: HTMLElement) { this.targetEl = el; }
}

describe('Directive: ScrollIntoView', () => {
    let component: TestScrollIntoViewDirectiveComponent;
    let fixture: ComponentFixture<TestScrollIntoViewDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScrollIntoViewDirective, TestScrollIntoViewDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestScrollIntoViewDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should have default options', () => {
        expect(component.directive.options).toEqual({ behavior: 'smooth', block: 'center', inline: 'start' });
    });

    fit('Should not call scrollIntoView or scrollIntoViewIfNeeded', () => {
        spyOn(component.target.nativeElement, 'scrollIntoView');
        spyOn(component.target.nativeElement, 'scrollIntoViewIfNeeded');

        expect(component.target.nativeElement.scrollIntoView).not.toHaveBeenCalled();
        expect(component.target.nativeElement.scrollIntoViewIfNeeded).not.toHaveBeenCalled();
    });

    fit('Should call scrollIntoView', () => {
        spyOnProperty(window.navigator, 'userAgent').and.returnValue('Mozilla');
        spyOn(component.target.nativeElement, 'scrollIntoView');
        spyOn(component.target.nativeElement, 'scrollIntoViewIfNeeded');

        component.setTarget(component.target.nativeElement);
        fixture.detectChanges();

        expect(component.target.nativeElement.scrollIntoView).toHaveBeenCalledOnceWith(component.directive.options);
        expect(component.target.nativeElement.scrollIntoViewIfNeeded).not.toHaveBeenCalled();
    });

    fit('Should call scrollIntoViewIfNeeded', () => {
        spyOn(component.target.nativeElement, 'scrollIntoView');
        spyOn(component.target.nativeElement, 'scrollIntoViewIfNeeded');

        component.setTarget(component.target.nativeElement);
        fixture.detectChanges();

        expect(component.target.nativeElement.scrollIntoViewIfNeeded).toHaveBeenCalled();
        expect(component.target.nativeElement.scrollIntoView).not.toHaveBeenCalled();
    });

    fit('Should not call scrollIntoView or scrollIntoViewIfNeeded if local', () => {
        spyOn(component.target.nativeElement, 'scrollIntoView');
        spyOn(component.target.nativeElement, 'scrollIntoViewIfNeeded');

        component.local = true;
        fixture.detectChanges();
        
        component.setTarget(component.target.nativeElement);
        fixture.detectChanges();

        expect(component.target.nativeElement.scrollIntoViewIfNeeded).not.toHaveBeenCalled();
        expect(component.target.nativeElement.scrollIntoView).not.toHaveBeenCalled();
    });
});