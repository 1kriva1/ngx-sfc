import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { getCssLikeValue, Position, TooltipComponent, WINDOW } from "ngx-sfc-common";
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

        fit("Should have height of input", () => {
            const heightValueAssert = getCssLikeValue(fixture.debugElement.query(By.css('input[type=range]')).nativeElement.getBoundingClientRect().height),
                containerEl = fixture.nativeElement.querySelectorAll('.component')[1];

            expect(containerEl.style.height).toEqual(heightValueAssert);
        });
    });
});