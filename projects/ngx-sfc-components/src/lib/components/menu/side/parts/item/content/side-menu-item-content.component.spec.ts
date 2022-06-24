import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DelimeterComponent, UIClass } from 'ngx-sfc-common';
import { SideMenuItemContentComponent } from './side-menu-item-content.component';
import { faTShirt } from '@fortawesome/free-solid-svg-icons';

describe('Component: SideMenuItemContentComponent', () => {
    let component: SideMenuItemContentComponent;
    let fixture: ComponentFixture<SideMenuItemContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [DelimeterComponent, SideMenuItemContentComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuItemContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should create main elements', () => {
            expect(fixture.nativeElement.querySelector('li')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.item-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.item-container div.item')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.item-container div.item a')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.item-container span.label')).toBeTruthy();
        });

        fit('Should have defined icon', () => {
            component.item.icon = faTShirt;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.item-container div.item a fa-icon svg.fa-shirt')).toBeTruthy();
        });

        fit('Should have defined label', () => {
            component.item.label = 'Test label';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.item-container span.label').innerHTML).toEqual(component.item.label);
        });

        fit('Should emit select event', () => {
            spyOn(component.selectItem, 'emit');

            fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click'));

            expect(component.selectItem.emit).toHaveBeenCalledOnceWith(component.item);
        });
    });

    describe('Open', () => {
        fit('Should not have open class', () => {
            expect(fixture.debugElement.nativeElement.className).not.toContain(UIClass.Open);
        });

        fit('Should have open class', () => {
            component.open = true;
            fixture.detectChanges();

            expect(fixture.debugElement.nativeElement.className).toContain(UIClass.Open);
        });
    });

    describe('Active', () => {
        fit('Should not have active class', () => {
            expect(fixture.debugElement.nativeElement.className).not.toContain(UIClass.Active);
        });

        fit('Should have active class', () => {
            component.active = true;
            fixture.detectChanges();

            expect(fixture.debugElement.nativeElement.className).toContain(UIClass.Active);
        });
    });

    describe('Expand icons', () => {
        fit('Should not exist by default', () => {
            expect(fixture.nativeElement.querySelector('div.expand-container')).toBeNull();
        });

        fit('Should not exist by default', () => {
            component.hasChildren = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.expand-container')).toBeTruthy();
        });

        fit('Should have not opened icon', () => {
            component.hasChildren = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.expand-container fa-icon svg.fa-angle-down')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.expand-container fa-icon svg.fa-angle-up')).toBeNull();
        });

        fit('Should have opened icon', () => {
            component.hasChildren = true;
            component.openParent = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.expand-container fa-icon svg.fa-angle-down')).toBeNull();
            expect(fixture.nativeElement.querySelector('div.expand-container fa-icon svg.fa-angle-up')).toBeTruthy();
        });
    });
});
