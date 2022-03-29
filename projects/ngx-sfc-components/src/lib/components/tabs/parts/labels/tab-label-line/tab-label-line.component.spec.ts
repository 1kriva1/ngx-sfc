import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { TabLabelLineComponent } from './tab-label-line.component';

describe('Component: TabLabelLineComponent', () => {
    let component: TabLabelLineComponent;
    let fixture: ComponentFixture<TabLabelLineComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TabLabelLineComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabLabelLineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should create main elements', () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.content > span')).toBeTruthy();
        });

        fit('Should not have selected class', () => {
            expect(fixture.nativeElement.className).not.toContain(UIClass.Selected);
        });

        fit('Should have selected class', () => {
            component.selected = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toContain(UIClass.Selected);
        });

        fit('Should not have disabled class', () => {
            expect(fixture.nativeElement.className).not.toContain(UIClass.Disabled);
        });

        fit('Should have disabled class', () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toContain(UIClass.Disabled);
        });
    });

    describe('Icon', () => {
        fit('Should not exist', () => {
            expect(fixture.nativeElement.querySelector('i')).toBeNull();
        });

        fit('Should exist', () => {
            component.icon = 'fa fa-test';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('i')).toBeTruthy();
        });

        fit('Should have defined icon', () => {
            component.icon = 'fa fa-test';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('i').className).toEqual(component.icon);
        });
    });

    describe('Label', () => {
        fit('Should be empty string', () => {
            expect(fixture.nativeElement.querySelector('span').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit('Should have defimed label value', () => {
            component.label = 'label test';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span').innerText).toEqual(component.label);
        });
    });
});
