import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, EMPTY, map, of, Subject } from 'rxjs';
import { CommonConstants } from '../../constants';
import { ComponentSizeDirective, MouseDownDirective, ScrollIntoViewDirective, ScrollTrackerDirective } from '../../directives';
import { ComponentSize, Position, UIClass } from '../../enums';
import { DelimeterComponent } from '../delimeter/delimeter.component';
import { LoadMoreButtonComponent } from '../load-more-button/load-more-button.component';
import { BounceLoaderComponent } from '../loader/bounce/bounce-loader.component';
import { LoadContainerComponent } from './load-container.component';
import { LoadContainerConstants } from './load-container.constants';
import { LoadContainerType } from './load-container.enum';
import { ILoadMoreParameters } from './models/load-more-parameters.model';
import { ILoadMorePredicateParameters } from './models/load-more-predicate-parameters.model';
import { ILoadMoreModel } from './models/load-more.model';

@Component({
    template: ` <div style="height:2em">
                    <sfc-load-container id="{{id}}" (handleSuccess)="handleSuccess($event)">
                        <h1 class="load-item" *ngFor="let item of items">{{item}}</h1>
                    </sfc-load-container>
                </div>`
})
class TestLoadContainerComponent {
    @ViewChild(LoadContainerComponent, { static: false })
    loadContainer!: LoadContainerComponent;

    items: number[] = [];

    handleSuccess(result: ILoadMoreModel<any>) {
        if (result.reset)
            this.items = result.items;
        else
            this.items = this.items.concat(result.items);
    }
}
describe('Component: LoadContainer', () => {
    let component: TestLoadContainerComponent;
    let fixture: ComponentFixture<TestLoadContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [DelimeterComponent, MouseDownDirective, LoadMoreButtonComponent, ScrollIntoViewDirective,
                BounceLoaderComponent, ComponentSizeDirective, ScrollTrackerDirective, LoadContainerComponent, TestLoadContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLoadContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit("Should create component", () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-bounce-loader')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-load-more-button')).toBeTruthy();
        });

        fit("Should prevent default on content click", () => {
            const buttonEl = fixture.debugElement.query(By.css('div.content > div')),
                event: MouseEvent = new MouseEvent('mousedown');

            spyOn(event, 'preventDefault');

            buttonEl.triggerEventHandler('mousedown', event);

            expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });

        fit("Should have default type class", () => {
            expect(fixture.nativeElement.querySelector(`sfc-load-container.${LoadContainerType.Dropdown}`)).toBeTruthy();
        });

        fit("Should have defined type class", () => {
            component.loadContainer.type = LoadContainerType.Table;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-load-container.${LoadContainerType.Table}`)).toBeTruthy();
        });

        fit("Should have default open class", () => {
            expect(fixture.nativeElement.querySelector(`sfc-load-container.${UIClass.Open}`)).toBeNull();
        });

        fit("Should have defined type class", () => {
            component.loadContainer.open = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-load-container.${UIClass.Open}`)).toBeTruthy();
        });

        fit("Should call unsubscribe", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            const unsubscribeSpy = spyOn(
                (component.loadContainer as any)._subscription,
                'unsubscribe'
            ).and.callThrough();

            component.loadContainer?.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
        });

        fit("Should call unsubscribe on new model", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };

            const unsubscribeSpy = spyOn(
                (component.loadContainer as any)._subscription,
                'unsubscribe'
            ).and.callThrough();

            expect(unsubscribeSpy).not.toHaveBeenCalled()

            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };

            expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Loader', () => {
        fit("Should have defined attributes", () => {
            component.loadContainer.id = 'test-id';
            fixture.detectChanges();

            const loader = fixture.debugElement.query(By.css('sfc-bounce-loader'));

            expect(loader.componentInstance.id).toEqual(component.loadContainer.id);
            expect(loader.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
        });

        fit("Should show loader", () => {
            const loaderService = (component.loadContainer as any).loaderService;
            spyOn(loaderService, 'show');

            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(loaderService.show).toHaveBeenCalledTimes(1);
        });

        fit("Should hide loader", () => {
            const loaderService = (component.loadContainer as any).loaderService;
            spyOn(loaderService, 'hide');

            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(loaderService.hide).toHaveBeenCalledTimes(1);
        });

        fit("Should emit loading", () => {
            spyOn(component.loadContainer.handleLoading, 'emit');

            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect((component.loadContainer.handleLoading.emit as any).calls.allArgs()).toEqual([
                [true],
                [false]
            ]);
        });

        fit("Should handle loading on load more", () => {
            const loaderService = (component.loadContainer as any).loaderService;
            spyOn(loaderService, 'hide');
            spyOn(loaderService, 'show');
            spyOn(component.loadContainer.handleLoading, 'emit');

            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            expect((component.loadContainer.handleLoading.emit as any).calls.allArgs()).toEqual([
                [true],
                [false],
                [true],
                [false]
            ]);
            expect(loaderService.show).toHaveBeenCalledTimes(2);
            expect(loaderService.hide).toHaveBeenCalledTimes(2);
        });

        fit("Should handle loading on error", () => {
            const loaderService = (component.loadContainer as any).loaderService;
            spyOn(loaderService, 'hide');
            spyOn(loaderService, 'show');
            spyOn(component.loadContainer.handleLoading, 'emit');

            component.loadContainer.model = {
                data$: of([]),
                filter: (_: any[], __: ILoadMoreParameters) => {
                    throw { errorMsg: 'Error occurred' }
                }
            };
            fixture.detectChanges();

            expect((component.loadContainer.handleLoading.emit as any).calls.allArgs()).toEqual([
                [true],
                [false]
            ]);
            expect(loaderService.show).toHaveBeenCalledTimes(1);
            expect(loaderService.hide).toHaveBeenCalledTimes(1);
        });
    });

    describe('Scroll', () => {
        fit('Should have not positions for scrolling in case showLoadMoreButton is true', () => {
            component.loadContainer.showLoadMoreButton = true;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('div.content')).attributes['ng-reflect-positions'])
                .toEqual(CommonConstants.EMPTY_STRING)
        });

        fit('Should have not positions for scrolling in case loadMore is false', () => {
            component.loadContainer.showLoadMoreButton = false;
            component.loadContainer.loadMore = false;
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('div.content')).attributes['ng-reflect-positions'])
                .toEqual(CommonConstants.EMPTY_STRING)
        });

        fit('Should have not positions for scrolling in case next is false', () => {
            component.loadContainer.showLoadMoreButton = false;
            component.loadContainer.loadMore = true;
            component.loadContainer.next = false;
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('div.content')).attributes['ng-reflect-positions'])
                .toEqual(CommonConstants.EMPTY_STRING)
        });

        fit('Should have bottom position for scrolling', () => {
            component.loadContainer.showLoadMoreButton = false;
            component.loadContainer.loadMore = true;
            component.loadContainer.next = true;
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('div.content')).attributes['ng-reflect-positions'])
                .toEqual(`${Position.Bottom}`);
        });

        fit('Should call load more', () => {
            const loadMoreService = (component.loadContainer as any).loadMoreService;
            spyOn(loadMoreService, 'more');
            component.loadContainer.showLoadMoreButton = false;
            component.loadContainer.next = true;
            fixture.detectChanges();

            scrollContentToBottom();

            expect(loadMoreService.more).toHaveBeenCalledTimes(1);
        });

        fit('Should not call load more, because of next = false', () => {
            const loadMoreService = (component.loadContainer as any).loadMoreService;
            spyOn(loadMoreService, 'more');
            component.loadContainer.showLoadMoreButton = false;
            component.loadContainer.next = false;
            fixture.detectChanges();

            scrollContentToBottom();

            expect(loadMoreService.more).not.toHaveBeenCalled();
        });

        fit('Should not call load more, because of loadMore = false', () => {
            const loadMoreService = (component.loadContainer as any).loadMoreService;
            spyOn(loadMoreService, 'more');
            component.loadContainer.showLoadMoreButton = false;
            component.loadContainer.loadMore = false;
            fixture.detectChanges();

            scrollContentToBottom();

            expect(loadMoreService.more).not.toHaveBeenCalled();
        });

        fit("Should scroll to top after predicate value was changed", () => {
            const subject = new Subject<ILoadMorePredicateParameters>(),
                predicate$ = subject.asObservable();
            component.loadContainer.model = { predicate$: predicate$, data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            component.loadContainer.showLoadMoreButton = false;
            component.loadContainer.loadMore = false;
            component.loadContainer.type = LoadContainerType.Table;
            fixture.detectChanges();

            subject.next({ value: 1 });
            fixture.detectChanges();

            scrollContentToBottom();

            expect(fixture.nativeElement.querySelector('div.content').scrollTop > 0).toBeTrue();

            subject.next({ value: 2 });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.content').scrollTop === 0).toBeTrue();
        });

        fit('Should scroll target not exist', () => {
            expect(component.loadContainer.scrollTarget).toBeUndefined();
        });

        fit('Should scroll to target', () => {
            component.loadContainer.open = true;
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.content').scrollTop === 0).toBeTrue();

            component.loadContainer.scrollTarget = fixture.nativeElement.querySelectorAll('.load-item')[4];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.content').scrollTop > 0).toBeTrue();
        });
    });

    describe('Load more button', () => {
        fit("Should have default label", () => {
            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button'));

            expect(loadMoreBtn.componentInstance.label).toEqual('Show more');
        });

        fit("Should have defined label", () => {
            component.loadContainer.loadMoreLabel = 'Test label';
            fixture.detectChanges();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button'));

            expect(loadMoreBtn.componentInstance.label).toEqual(component.loadContainer.loadMoreLabel);
        });

        fit("Should be hidden", () => {
            component.loadContainer.showLoadMoreButton = false;
            fixture.detectChanges();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button'));

            expect(loadMoreBtn.attributes['hidden']).toBeDefined();
        });

        fit("Should be hidden if no more data", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('sfc-load-more-button')).attributes['hidden']).toBeUndefined();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('sfc-load-more-button')).attributes['hidden']).toBeDefined();
        });

        fit("Should be not hidden", () => {
            component.loadContainer.next = true;
            fixture.detectChanges();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button'));

            expect(loadMoreBtn.attributes['hidden']).toBeUndefined();
        });

        fit("Should call load more", () => {
            const loadMoreService = (component.loadContainer as any).loadMoreService,
                loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            spyOn(event, 'preventDefault');
            spyOn(loadMoreService, 'more');

            loadMoreBtn.triggerEventHandler('mousedown', event);

            expect(loadMoreService.more).toHaveBeenCalledTimes(1);
            expect(event.preventDefault).toHaveBeenCalledTimes(1);
        });
    });

    describe('Empty', () => {
        fit("Should not exist", () => {
            expect(fixture.nativeElement.querySelector('div.empty')).toBeNull();
        });

        fit("Should exist", () => {
            component.loadContainer.model = { data$: of([]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.empty')).toBeTruthy();
        });

        fit("Should not exist if showEmpty is false", () => {
            component.loadContainer.model = { data$: of([]) };
            component.loadContainer.showEmpty = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.empty')).toBeNull();
        });

        fit("Should not have empty class by default", () => {
            expect(fixture.nativeElement.querySelector(`sfc-load-container.${UIClass.Empty}`)).toBeNull();
        });

        fit("Should not have empty class", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-load-container.${UIClass.Empty}`)).toBeNull();
        });

        fit("Should not have empty class when error", () => {
            component.loadContainer.model = {
                data$: of([]).pipe(map(_ => {
                    throw { msg: 'Error occurred' };
                }))
            };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-load-container.${UIClass.Empty}`)).toBeNull();
        });

        fit("Should have empty class", () => {
            component.loadContainer.model = { data$: of([]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-load-container.${UIClass.Empty}`)).toBeTruthy();
        });

        fit("Should have default label", () => {
            component.loadContainer.model = { data$: of([]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.empty').innerText).toEqual(LoadContainerConstants.DEFAULT_NOT_FOUND_LABEL);
        });

        fit("Should have defined label", () => {
            component.loadContainer.model = { data$: of([]) };
            component.loadContainer.notFoundLabel = 'Test not found';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.empty').innerText).toEqual('Test not found');
        });
    });

    describe('Data', () => {
        fit("Should load default size", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(LoadContainerConstants.DEFAULT_PAGE_SIZE);
        });

        fit("Should load defined size", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]), size: 3 };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(3);
        });

        fit("Should load data without predicate", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length > 0).toBeTrue();
        });

        fit("Should not load data with predicate", () => {
            component.loadContainer.model = { predicate$: EMPTY, data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length > 0).toBeFalse();
        });

        fit("Should reset load more service", () => {
            const loadMoreService = (component.loadContainer as any).loadMoreService;
            spyOn(loadMoreService, 'reset');

            const subject = new Subject<ILoadMorePredicateParameters>(),
                predicate$ = subject.asObservable();
            component.loadContainer.model = { predicate$: predicate$, data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(loadMoreService.reset).not.toHaveBeenCalled();

            subject.next({ value: 1 });
            fixture.detectChanges();

            expect(loadMoreService.reset).toHaveBeenCalledTimes(1);
        });

        fit("Should not reset load more service", () => {
            const loadMoreService = (component.loadContainer as any).loadMoreService;
            spyOn(loadMoreService, 'reset');

            const subject = new Subject<ILoadMorePredicateParameters | null>(),
                predicate$ = subject.asObservable();
            component.loadContainer.model = { predicate$: predicate$, data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            expect(loadMoreService.reset).not.toHaveBeenCalled();

            subject.next(null);
            fixture.detectChanges();

            expect(loadMoreService.reset).not.toHaveBeenCalled();
        });

        fit("Should reset load more service, when data changed and page not first", () => {
            const subject = new BehaviorSubject<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                data$ = subject.asObservable(),
                loadMoreService = (component.loadContainer as any).loadMoreService;
            spyOn(loadMoreService, 'reset');

            component.loadContainer.model = { data$: data$ };
            fixture.detectChanges();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            subject.next([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            fixture.detectChanges();

            expect(loadMoreService.reset).toHaveBeenCalledTimes(1);
        });

        fit("Should load first page", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            fixture.nativeElement.querySelectorAll('.load-item').forEach((item: any, index: number) => expect(item.innerText).toEqual((index + 1).toString()));
        });

        fit("Should load second page", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(9);
            fixture.nativeElement.querySelectorAll('.load-item').forEach((item: any, index: number) => expect(item.innerText).toEqual((index + 1).toString()));
        });

        fit("Should not load third page", () => {
            component.loadContainer.model = { data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]) };
            fixture.detectChanges();

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(9);
            fixture.nativeElement.querySelectorAll('.load-item').forEach((item: any, index: number) => expect(item.innerText).toEqual((index + 1).toString()));
        });

        fit("Should load first page when data changed", () => {
            const subject = new BehaviorSubject<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                data$ = subject.asObservable();

            component.loadContainer.model = { data$: data$ };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(5);

            const loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(9);

            subject.next([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(5);
        });

        fit("Should load data with loader", () => {
            component.loadContainer.model = {
                loader: (_: ILoadMoreParameters) => {
                    return of({ next: true, items: [1, 2], reset: false })
                }
            };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(2);
        });

        fit("Should reset load more service, when loader data changed", () => {
            const loadMoreService = (component.loadContainer as any).loadMoreService;
            spyOn(loadMoreService, 'reset');

            component.loadContainer.model = {
                loader: (_: ILoadMoreParameters) => {
                    return of({ next: true, items: [1, 2], reset: true })
                }
            };
            fixture.detectChanges();

            expect(loadMoreService.reset).toHaveBeenCalledTimes(1);
        });

        fit("Should filter data with custom filter method", () => {
            component.loadContainer.model = {
                data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                filter: (data: any[], _: ILoadMoreParameters) => {
                    return data.filter(number => { return number % 2 === 0; });
                }
            };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('.load-item').length).toEqual(4);
        });

        fit("Should handle error", () => {
            spyOn(component.loadContainer.handleError, 'emit');

            const assertException = { msg: 'Error occurred' };

            component.loadContainer.model = {
                data$: of([]).pipe(map(items => {
                    throw assertException;
                }))
            };
            fixture.detectChanges();

            expect(component.loadContainer.handleError.emit).toHaveBeenCalledOnceWith(assertException);
        });

        fit("Should handle success", () => {
            spyOn(component.loadContainer.handleSuccess, 'emit');

            component.loadContainer.model = {
                data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9])
            };
            fixture.detectChanges();

            expect(component.loadContainer.handleSuccess.emit).toHaveBeenCalledOnceWith({ next: true, items: [1, 2, 3, 4, 5], reset: true });
        });

        fit("Should return default model when data is not provided", () => {
            spyOn(component.loadContainer.handleSuccess, 'emit');

            component.loadContainer.model = {
                data$: of(null as unknown as any)
            };
            fixture.detectChanges();

            expect(component.loadContainer.handleSuccess.emit).toHaveBeenCalledOnceWith({ next: false, items: [], reset: true });
        });

        fit("Should return reset: true, when data changed", () => {
            spyOn(component.loadContainer.handleSuccess, 'emit');

            const subject = new BehaviorSubject<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                data$ = subject.asObservable();

            component.loadContainer.model = { data$: data$ };
            fixture.detectChanges();

            subject.next([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            fixture.detectChanges();

            expect(component.loadContainer.handleSuccess.emit).toHaveBeenCalledWith({ next: true, items: [1, 2, 3, 4, 5], reset: true });
        });

        fit("Should return reset: false, when changed parameters", () => {
            spyOn(component.loadContainer.handleSuccess, 'emit');

            const subject = new BehaviorSubject<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                data$ = subject.asObservable(),
                loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button')),
                event = new MouseEvent('mousedown');

            component.loadContainer.model = { data$: data$ };
            fixture.detectChanges();

            loadMoreBtn.triggerEventHandler('mousedown', event);
            fixture.detectChanges();

            expect(component.loadContainer.handleSuccess.emit).toHaveBeenCalledWith({ next: false, items: [6, 7, 8, 9], reset: false });
        });

        fit("Should return default model when loader and data not provided", () => {
            spyOn(component.loadContainer.handleSuccess, 'emit');

            component.loadContainer.model = {
                data$: null as unknown as any
            };
            fixture.detectChanges();

            expect(component.loadContainer.handleSuccess.emit).toHaveBeenCalledOnceWith({ next: false, items: [], reset: true });
        });
    });

    function scrollContentToBottom() {
        const targetEl = fixture.debugElement.query(By.css('div.content')).nativeElement;
        targetEl.scrollTop = targetEl.scrollHeight;
        targetEl.dispatchEvent(new Event('scroll'));
        fixture.detectChanges();
    }
});
