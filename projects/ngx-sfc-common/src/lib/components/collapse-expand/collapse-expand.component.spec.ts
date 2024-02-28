import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseExpandComponent } from './collapse-expand.component';
import { CollapseExpandConstants } from './collapse-expand.constants';

describe('Component: CollapseExpand', () => {
    let component: CollapseExpandComponent;
    let fixture: ComponentFixture<CollapseExpandComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [CollapseExpandComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CollapseExpandComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit("Should create component", () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeDefined();
            expect(fixture.nativeElement.querySelector('span')).toBeDefined();
            expect(fixture.nativeElement.querySelector('fa-icon')).toBeDefined();
        });

        fit("Should not be expand by default", () => {
            expect(component.expand).toBeFalse();
        });
    });

    describe('Icon', () => {
        fit("Should have expand icon", () => {
            expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-chevron-down');
        });

        fit("Should have collapse icon", () => {
            component.expand = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-chevron-up');
        });
    });

    describe('Label', () => {
        describe('Expand', () => {
            fit("Should have default expand label", () => {
                expect(component.labelExpand).toEqual(CollapseExpandConstants.LABEL_EXPAND_DEFAULT);
                expect(fixture.nativeElement.querySelector('span').innerText).toEqual(CollapseExpandConstants.LABEL_EXPAND_DEFAULT);
            });

            fit("Should have defined expand label", () => {
                const assertExpandLabel = 'Test expand';
                component.labelExpand = assertExpandLabel;
                fixture.detectChanges();

                expect(component.labelExpand).toEqual(assertExpandLabel);
                expect(fixture.nativeElement.querySelector('span').innerText).toEqual(assertExpandLabel);
            });
        });

        describe('Collapse', () => {
            fit("Should have default collapse label", () => {
                component.expand = true;
                fixture.detectChanges();

                expect(component.labelCollapse).toEqual(CollapseExpandConstants.LABEL_COLLAPSE_DEFAULT);
                expect(fixture.nativeElement.querySelector('span').innerText).toEqual(CollapseExpandConstants.LABEL_COLLAPSE_DEFAULT);
            });

            fit("Should have defined expand label", () => {
                const assertCollapseLabel = 'Test collapse';
                component.expand = true;
                component.labelCollapse = assertCollapseLabel;
                fixture.detectChanges();

                expect(component.labelCollapse).toEqual(assertCollapseLabel);
                expect(fixture.nativeElement.querySelector('span').innerText).toEqual(assertCollapseLabel);
            });
        });
    });
});
