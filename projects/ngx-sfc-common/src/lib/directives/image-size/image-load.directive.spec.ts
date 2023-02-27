import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageLoadDirective } from './image-load.directive';

@Component({
    template: `<img (sfcImageLoad)="load($event)">`
})
class TestImageLoadDirectiveComponent {

    @ViewChild(ImageLoadDirective, { static: false })
    directive: ImageLoadDirective = <ImageLoadDirective><unknown>null;

    load = (_: Event) => { };
}

describe('Directive: ImageLoadDirective', () => {
    let component: TestImageLoadDirectiveComponent;
    let fixture: ComponentFixture<TestImageLoadDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageLoadDirective, TestImageLoadDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestImageLoadDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should emit event', () => {
        spyOn(component.directive.action, 'emit');
        fixture.detectChanges();

        const event = new Event('load');
        fixture.debugElement.query(By.css('img')).nativeElement
            .dispatchEvent(event);

        expect(component.directive.action.emit).toHaveBeenCalledOnceWith(event);
    });

    fit('Should emit load event', () => {
        const loadService = (component.directive as any).loadService;
        spyOn(loadService, 'load');

        const event = new Event('load');
        fixture.debugElement.query(By.css('img')).nativeElement
            .dispatchEvent(event);

        expect(loadService.load).toHaveBeenCalledTimes(1);
    });
});
