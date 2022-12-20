import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MouseDownDirective } from 'ngx-sfc-common';
import { AutoCompleteItemComponent } from './autocomplete-item.component';

describe('Component: AutoCompleteItem', () => {
    let component: AutoCompleteItemComponent;
    let fixture: ComponentFixture<AutoCompleteItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MouseDownDirective, AutoCompleteItemComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoCompleteItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
        expect(fixture.nativeElement.querySelector('div')).toBeTruthy();
    });

    fit('Should emit selected event', () => {
        spyOn(component.selected, 'emit');

        const el = fixture.debugElement.query(By.css('div'));
        fixture.debugElement.query(By.css('div')).triggerEventHandler('mousedown', { target: el.nativeElement, button: 0 });

        expect(component.selected.emit).toHaveBeenCalledOnceWith(component.item);
    });

    fit('Should exist text', () => {
        component.item = { key: 0, value: 'Test value' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
    });

    fit('Should have defined text', () => {
        component.item = { key: 0, value: 'Test value' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span').innerText).toEqual(component.item.value);
    });

    fit('Should not exist image', () => {
        expect(fixture.nativeElement.querySelector('img')).toBeNull();
    });

    fit('Should exist image', () => {
        component.item = { key: 0, value: 'Test value', image: '/test.png' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    });

    fit('Should image has defined src', () => {
        component.item = { key: 0, value: 'Test value', image: '/test.png' };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('img').src).toContain(component.item.image);
    });
});
