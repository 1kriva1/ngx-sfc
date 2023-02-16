import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClass } from '../../../enums';
import { HamburgerMenuComponent } from './hamburger-menu.component';

describe('Component: HamburgerMenu', () => {
    let component: HamburgerMenuComponent;
    let fixture: ComponentFixture<HamburgerMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HamburgerMenuComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HamburgerMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit("Should create component", () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('span').length).toEqual(5);
            expect(fixture.nativeElement.querySelectorAll('span.text').length).toEqual(1);
        });
    });

    describe('Open', () => {
        fit("Should not have open class", () => {
            expect(fixture.nativeElement.className).not.toEqual(UIClass.Open);
        });

        fit("Should have open class", () => {
            component.open = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toEqual(UIClass.Open);
        });

        fit("Should have open class, when toggle component", () => {
            expect(fixture.nativeElement.className).not.toEqual(UIClass.Open);

            fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toEqual(UIClass.Open);

            fixture.debugElement.triggerEventHandler('click', { target: fixture.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.className).not.toEqual(UIClass.Open);
        });
    });

    describe('Label', () => {
        fit("Should have value", () => {
            expect(fixture.nativeElement.querySelector('span.text').innerText).toEqual('MENU');
        });

        fit("Should have defined value", () => {
            component.label = 'test';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.text').innerText).toEqual(component.label.toUpperCase());
        });
    });
});
