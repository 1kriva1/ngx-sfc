import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Direction, getCssLikeValue, Position, TooltipComponent, WINDOW } from "ngx-sfc-common";
import { InputReferenceDirective } from "../../../directives";
import { RangeInputVerticalComponent } from "./range-input-vertical.component";

describe('Component: RangeInputVertical', () => {
    let component: RangeInputVerticalComponent;
    let fixture: ComponentFixture<RangeInputVerticalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [TooltipComponent, InputReferenceDirective, RangeInputVerticalComponent],
            providers: [
                { provide: WINDOW, useFactory: (() => { return <any>{}; }) }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RangeInputVerticalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('input[type=range]')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.range-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.component').length).toEqual(2);
            expect(fixture.nativeElement.querySelector('.range')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
        });

        fit('Should have constant tooltip position', () => {
            expect(component.tooltipPosition).toEqual(Position.Bottom);
        });

        fit('Should have constant track position', () => {
            expect(component.trackPosition).toEqual(Position.Top);
        });
    });

    describe('Limits', () => {
        describe('After', () => {
            fit("Should exist, when show value", () => {
                component.showValue = true;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.limits.after')).toBeTruthy();
            });
        });
    });

    describe('Input', () => {
        fit("Should have vertical orient", () => {
            expect(fixture.debugElement.query(By.css('input[type=range]')).attributes['orient'])
                .toEqual(Direction.Vertical);
        });

        describe('Multiple', () => {
            fit("Should have default style variables", () => {
                component.multiple = true;
                fixture.changeDetectorRef.detectChanges();
                fixture.detectChanges();

                const heightValueAssert = getCssLikeValue(fixture.debugElement
                    .query(By.css('input[type=range]')).nativeElement.getBoundingClientRect().height);

                expect(fixture.debugElement.query(By.css('div.multiple')).attributes['style'])
                    .toEqual(`height: ${heightValueAssert}; --from: 0; --to: 100; --max: 100; --min: 0; --index-from: 1; --index-to: 2; --direction: top;`);
            });
        });
    });
});