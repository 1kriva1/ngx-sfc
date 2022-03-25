import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { UIConstants } from "../../constants";
import { ComponentSize } from "../../enums";
import { getCssLikeValue } from "../../utils";
import { ComponentSizeDirective } from "./component-size.directive";

@Component({
    template: `<div class="target" [sfcComponentSize]="size" [customSize]="customSize">`
})
class TestComponentSizeDirectiveComponent {

    @ViewChild(ComponentSizeDirective, { static: false })
    directive: ComponentSizeDirective = <ComponentSizeDirective><unknown>null;

    size?: ComponentSize;
    customSize?: number;
}

describe('Directive: ComponentSizeDirective', () => {

    let component: TestComponentSizeDirectiveComponent;
    let fixture: ComponentFixture<TestComponentSizeDirectiveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ComponentSizeDirective, TestComponentSizeDirectiveComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentSizeDirectiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should have default value', () => {
        expect(fixture.debugElement.query(By.css('div.target'))
            .styles['fontSize']).toEqual(getCssLikeValue(1, UIConstants.CSS_EM));
    });

    fit('Should have small value', () => {
        component.size = ComponentSize.Small;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.target'))
            .styles['fontSize']).toEqual(getCssLikeValue(0.5, UIConstants.CSS_EM));
    });

    fit('Should have medium value', () => {
        component.size = ComponentSize.Medium;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.target'))
            .styles['fontSize']).toEqual(getCssLikeValue(1, UIConstants.CSS_EM));
    });

    fit('Should have large value', () => {
        component.size = ComponentSize.Large;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.target'))
            .styles['fontSize']).toEqual(getCssLikeValue(2, UIConstants.CSS_EM));
    });

    fit('Should have custom value', () => {
        component.customSize = 4.2;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('div.target'))
            .styles['fontSize']).toEqual(getCssLikeValue(4.2, UIConstants.CSS_EM));
    });
});