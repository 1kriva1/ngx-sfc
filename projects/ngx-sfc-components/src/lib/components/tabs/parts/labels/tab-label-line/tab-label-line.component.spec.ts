import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonConstants, IconComponent, UIClass } from 'ngx-sfc-common';
import { TabLabelLineComponent } from './tab-label-line.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: TabLabelLineComponent', () => {
    let component: TabLabelLineComponent;
    let fixture: ComponentFixture<TabLabelLineComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [IconComponent, TabLabelLineComponent]
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
        fit('Should have wrap', () => {
            expect(fixture.nativeElement.querySelector('sfc-icon')).toBeTruthy();
        });

        fit('Should have default value', () => {
            expect(fixture.nativeElement.querySelector('fa-icon')).toBeTruthy();
        });

        fit('Should have defined value', () => {
            component.icon = faTShirt;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-shirt');
        });

        fit('Should have image instead of icon', () => {
            component.image = 'test.png';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('fa-icon')).toBeNull();
            expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
        });

        fit('Should have defined image value', () => {
            component.image = 'test.png';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('img').src).toContain(component.image);
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
