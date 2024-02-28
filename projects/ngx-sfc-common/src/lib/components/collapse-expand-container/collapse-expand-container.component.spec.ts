import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UIConstants } from '../../constants';
import { ComponentSizeDirective } from '../../directives/component-size/component-size.directive';
import { IfDirective } from '../../directives/if/if.directive';
import { CollapseExpandComponent } from '../collapse-expand/collapse-expand.component';
import { DelimeterComponent } from '../delimeter/delimeter.component';
import { CollapseExpandContainerComponent } from './collapse-expand-container.component';

describe('Component: CollapseExpandContainer', () => {
    let component: CollapseExpandContainerComponent;
    let fixture: ComponentFixture<CollapseExpandContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule,],
            declarations: [
                CollapseExpandComponent, DelimeterComponent, ComponentSizeDirective, IfDirective,
                CollapseExpandContainerComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CollapseExpandContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit("Should create component", () => {
        expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
        expect(fixture.nativeElement.querySelector('div.container')).toBeDefined();
        expect(fixture.nativeElement.querySelector('sfc-collapse-expand')).toBeDefined();
        expect(fixture.nativeElement.querySelector('div.content')).toBeDefined();
    });

    fit("Should not be expand by default", () => {
        expect(component.expand).toBeFalse();
    });

    fit("Should have not delimeter by default", () => {
        expect(component.delimeter).toBeFalse();
    });

    fit("Should have empty labels by default", () => {
        expect(component.labelExpand).toBeUndefined();
        expect(component.labelCollapse).toBeUndefined();
    });

    fit("Should have defined attributes for collapse expand component", () => {
        component.expand = true;
        component.labelExpand = 'Expand test';
        component.labelCollapse = 'Collapse test';
        fixture.detectChanges();

        const collapseExpandComponent = fixture.debugElement.query(By.css('sfc-collapse-expand'));

        expect(collapseExpandComponent.componentInstance.expand).toBeTrue();
        expect(collapseExpandComponent.componentInstance.labelCollapse).toEqual(component.labelCollapse);
        expect(collapseExpandComponent.componentInstance.labelExpand).toEqual(component.labelExpand);
        expect(collapseExpandComponent.attributes['ng-reflect-custom-size']).toEqual('0.8');
    });

    fit("Should toggle expand", () => {
        const collapseExpandComponent = fixture.debugElement.query(By.css('sfc-collapse-expand'));

        expect(component.expand).toBeFalse();
        expect(collapseExpandComponent.componentInstance.expand).toBeFalse();

        fixture.nativeElement.querySelector('sfc-collapse-expand').dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(collapseExpandComponent.componentInstance.expand).toBeTrue();
        expect(component.expand).toBeTrue();
    });

    fit("Should delimeter not exist", () => {
        expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
    });

    fit("Should delimeter exist", () => {
        component.delimeter = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeDefined();
    });

    fit("Should content be not visible", () => {
        const contentEl = fixture.debugElement.query(By.css('div.content'));
        expect(contentEl.styles['display']).toEqual(UIConstants.CSS_NONE);
    });

    fit("Should content be visible", () => {
        component.expand = true;
        fixture.detectChanges();

        const contentEl = fixture.debugElement.query(By.css('div.content'));
        expect(contentEl.styles['display']).toEqual(UIConstants.CSS_INITIAL);
    });
});
