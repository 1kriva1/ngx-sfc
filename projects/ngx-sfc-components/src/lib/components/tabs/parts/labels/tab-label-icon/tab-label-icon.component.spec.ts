import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { TabLabelIconComponent } from './tab-label-icon.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: TabLabelIconComponent', () => {
    let component: TabLabelIconComponent;
    let fixture: ComponentFixture<TabLabelIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [TabLabelIconComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabLabelIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should create main elements', () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('fa-icon')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
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
        fit('Should have default icon', () => {
            expect(fixture.nativeElement.querySelector('fa-icon svg.fa-circle')).toBeTruthy();
        });

        fit('Should have defined icon', () => {
            component.icon = faTShirt;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('fa-icon svg.fa-circle')).toBeNull();
            expect(fixture.nativeElement.querySelector('fa-icon svg.fa-shirt')).toBeTruthy();
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
