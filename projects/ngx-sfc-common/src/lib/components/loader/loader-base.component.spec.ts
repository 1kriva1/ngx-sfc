import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CircleLoaderType } from './circle/circle-loader-type.enum';
import { CircleLoaderComponent } from './circle/circle-loader.component';
import { LoaderService } from './service/loader.service';

describe('Component: LoaderComponent', () => {

    let component: CircleLoaderComponent;
    let fixture: ComponentFixture<CircleLoaderComponent>;
    let el: DebugElement;
    let loaderService: LoaderService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CircleLoaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CircleLoaderComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        loaderService = TestBed.inject(LoaderService);
        fixture.detectChanges();
    });

    describe('General', () => {
        fit("Should create component", () => {
            expect(component).toBeDefined();
        });
    });

    describe('Preloader', () => {
        fit("Should not exist", () => {
            initLoader();

            expect(fixture.nativeElement.querySelector('div.preloader')).toBeNull();
        });

        fit("Should exist, when start on init", () => {
            component.start = true;
            initLoader();

            expect(fixture.nativeElement.querySelector('div.preloader')).toBeDefined();
        });

        fit("Should exist, when call show loader", () => {
            initLoader();

            loaderService.showLoader(component.id);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.preloader')).toBeDefined();
        });

        fit("Should not exist, if call show loader with wrong id", () => {
            initLoader();

            loaderService.showLoader(component.id + 'wrong');
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.preloader')).toBeNull();
        });

        fit("Should exist global loader", () => {
            component.start = true;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.preloader.global')).toBeDefined();
            expect(fixture.nativeElement.querySelector('div.preloader.local')).toBeNull();
        });

        fit("Should exist local loader", () => {
            component.start = true;
            initLoader();

            expect(fixture.nativeElement.querySelector('div.preloader.global')).toBeNull();
            expect(fixture.nativeElement.querySelector('div.preloader.local')).toBeDefined();
        });

        describe('Background', () => {
            fit("Should have background", () => {
                component.start = true;
                initLoader();

                expect(fixture.nativeElement.querySelector('div.preloader.background')).toBeDefined();
            });

            fit("Should not have background", () => {
                component.background = false;
                component.start = true;
                initLoader();

                expect(fixture.nativeElement.querySelector('div.preloader.background')).toBeNull();
            });
        });
    });

    describe('Circle loader', () => {
        fit("Should exist with default type", () => {
            component.start = true;
            initLoader();

            expect(fixture.nativeElement.querySelector('div.circles-container.default')).toBeDefined();
            expect(fixture.nativeElement.querySelector('div.circles-container.fading')).toBeNull();
        });

        fit("Should exist with fading type", () => {
            component.start = true;
            component.type = CircleLoaderType.Fading;
            initLoader();

            expect(fixture.nativeElement.querySelector('div.circles-container.default')).toBeNull();
            expect(fixture.nativeElement.querySelector('div.circles-container.fading')).toBeDefined();
        });
    });

    function initLoader(id = 'my-loader-3') {
        component.id = id;
        component.ngOnInit();
        fixture.detectChanges();
    }
});
