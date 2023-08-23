import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, DelimeterComponent, ILoadMoreModel, ILoadMoreParameters, MouseDownDirective, ScrollIntoViewDirective, UIClass } from 'ngx-sfc-common';
import { ComponentSizeDirective, ScrollTrackerDirective } from 'ngx-sfc-common';
import { BounceLoaderComponent, LoadMoreButtonComponent } from 'ngx-sfc-common';
import { LoadContainerComponent } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';
import { InputReferenceDirective } from '../../directives';
import { AutoCompleteInputComponent } from './autocomplete-input.component';
import { AutoCompleteInputConstants } from './autocomplete-input.constants';
import { IAutoCompleteItemModel } from './parts/item/autocomplete-item.model';
import { AutoCompleteItemComponent } from './parts/item/autocomplete-item.component';
import { BehaviorSubject } from 'rxjs';
import { ValidationConstants } from '../../constants/validation.constants';

describe('Component: AutoCompleteInput', () => {
    let component: AutoCompleteInputComponent;
    let fixture: ComponentFixture<AutoCompleteInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [InputReferenceDirective, MouseDownDirective, BounceLoaderComponent, LoadMoreButtonComponent, ComponentSizeDirective,
                LoadContainerComponent, ScrollTrackerDirective, ScrollIntoViewDirective, DelimeterComponent, AutoCompleteItemComponent, AutoCompleteInputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoCompleteInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('label')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.input')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('input[type=text]')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-load-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.helper-text')).toBeTruthy();
        });

        fit('Should have default debounce time', () => {
            expect(component.debounceTime).toEqual(AutoCompleteInputConstants.DEFAULT_DEBOUNCE_TIME);
        });

        fit('Should have default chars filter', () => {
            expect(component.chars).toEqual(AutoCompleteInputConstants.DEFAULT_CHARS);
        });

        fit('Should have defined load model for container', () => {
            expect(component.loadModel).toBeDefined();
        });

        fit('Should have defined predicate observable for load model', () => {
            expect(component.loadModel.predicate$).toBeDefined();
        });

        fit('Should have defined data observable for load model', () => {
            expect(component.loadModel.data$).toBeDefined();
        });

        fit('Should have defined filter for load model', () => {
            expect(component.loadModel.filter).toBeDefined();
        });

        fit('Should have undefined loader for load model', () => {
            expect(component.loadModel.loader).toBeUndefined();
        });

        fit('Should have defined loader for load model', () => {
            initLoader();

            expect(component.loadModel.loader).toBeDefined();
        });

        fit('Should has not loading class by default', () => {
            expect(fixture.nativeElement.className).not.toContain(UIClass.Loading);
        });

        fit('Should change loading', fakeAsync(() => {
            spyOn(component, 'handleLoading');

            emitSearching();

            expect((component.handleLoading as any).calls.allArgs()).toEqual([
                [true],
                [false]
            ]);
        }));

        fit('Should has value', () => {
            component.writeValue({ key: 0, value: 'Test' });
            fixture.detectChanges();

            expect(component.hasValue).toBeTrue();
        });

        fit('Should has no value', () => {
            expect(component.hasValue).toBeFalse();

            component.writeValue({ key: undefined, value: 'Test' });
            fixture.detectChanges();

            expect(component.hasValue).toBeFalse();
        });
    });

    describe('Icon', () => {
        fit('Should not exist', () => {
            expect(fixture.nativeElement.querySelector('.icon')).toBeNull();
        });

        fit('Should exist', () => {
            component.icon = faUser;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.icon')).toBeTruthy();
        });

        fit('Should have defined value', () => {
            component.icon = faUser;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.icon svg.fa-user')).toBeTruthy();
        });

        fit("Should focus text input on click event", () => {
            component.icon = faUser;
            fixture.detectChanges();

            component.ngAfterViewInit();
            fixture.detectChanges();

            const iconEl = fixture.debugElement.query(By.css('.icon'));
            iconEl.triggerEventHandler('click', { target: iconEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type="text"]')).toEqual(document.activeElement);
        });
    });

    describe('Label', () => {
        fit("Should have default value", () => {
            expect(fixture.nativeElement.querySelector('label').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have defined value", () => {
            const labelAssertValue = 'test label';
            component.label = labelAssertValue;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
        });

        fit("Should be linked to input element", () => {
            const inputEl = fixture.nativeElement.querySelector('input[type=text]');
            expect(inputEl.labels).toBeDefined();
            expect(inputEl.labels.length).toEqual(1);
            expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
        });

        fit("Should be active, when placeholder exist", () => {
            component.placeholder = 'test placeholder';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });

        fit("Should be active, when value defined", () => {
            component.writeValue({ key: 0, value: 'Test' });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });

        fit("Should be active, when input in focus", () => {
            const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });

        fit("Should be active, when text input has value", () => {
            fixture.debugElement.query(By.css('input[type=text]')).nativeElement.value = 'Test';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });
    });

    describe('Input', () => {
        fit("Should have default id value", () => {
            expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
        });

        fit("Should have defined id value", () => {
            component.id = 'test-id';
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
        });

        fit("Should have default value", () => {
            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have defined value", () => {
            component.writeValue({ key: 0, value: 'Test' });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('Test');
        });

        fit("Should not be disabled", () => {
            expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeFalse();
        });

        fit("Should be disabled", () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeTrue();
        });

        fit("Should not be readonly", () => {
            expect(fixture.nativeElement.querySelector('input[type=text]').readOnly).toBeFalse();
        });

        fit("Should be readonly", () => {
            component.loading = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').readOnly).toBeTrue();
        });

        fit("Should add active class for label on focus event", () => {
            const inputEl = fixture.debugElement.query(By.css('input'));
            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
        });

        fit("Should remove active class from label on blur event", () => {
            const inputEl = fixture.debugElement.query(By.css('input'));
            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('label').className).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit('Should not start emitting before debounce time', fakeAsync(() => {
            const inputEl = fixture.debugElement.query(By.css('input')),
                oldValue = { key: 0, value: 'Old value' };

            component.writeValue(oldValue);
            fixture.detectChanges();

            expect(component.value).toEqual(oldValue);

            inputEl.nativeElement.value = 'New value';
            inputEl.nativeElement.dispatchEvent(new Event('input'));

            tick(AutoCompleteInputConstants.DEFAULT_DEBOUNCE_TIME - 1);
            fixture.detectChanges();

            expect(component.value).toEqual(oldValue);

            discardPeriodicTasks();
        }));

        fit('Should start emitting after debounce time', fakeAsync(() => {
            const inputEl = fixture.debugElement.query(By.css('input')),
                oldValue = { key: 0, value: 'Old value' };

            component.writeValue(oldValue);
            fixture.detectChanges();

            expect(component.value).toEqual(oldValue);

            inputEl.nativeElement.value = 'New value';
            inputEl.nativeElement.dispatchEvent(new Event('input'));

            tick(AutoCompleteInputConstants.DEFAULT_DEBOUNCE_TIME);
            fixture.detectChanges();

            expect(component.value).toEqual({ key: undefined, value: 'New value' });
        }));

        fit('Should not start emitting if chars not fit', fakeAsync(() => {
            component.chars = 2;
            initData(true);
            emitSearching('t');

            expect(fixture.debugElement.queryAll(By.css('sfc-autocomplete-item')).length).toEqual(0);
        }));

        fit('Should start emitting if chars fit', fakeAsync(() => {
            initData(true);
            emitSearching();

            expect(fixture.debugElement.queryAll(By.css('sfc-autocomplete-item')).length).toEqual(1);
        }));

        fit('Should update value', fakeAsync(() => {
            initData(true);

            component.writeValue({ key: 0, value: 'Test' });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('Test');
            expect(component.hasValue).toBeTrue();
            expect(component.value).toEqual({ key: 0, value: 'Test' });

            emitSearching();

            expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('te');
            expect(component.hasValue).toBeFalse();
            expect(component.value).toEqual({ key: undefined, value: 'te' });
        }));

        fit('Should focus input element after load data', fakeAsync(() => {
            initData(true);

            expect(fixture.nativeElement.querySelector('input[type="text"]')).not.toEqual(document.activeElement);

            emitSearching();

            expect(fixture.nativeElement.querySelector('input[type="text"]')).toEqual(document.activeElement);
        }));
    });

    describe('Placeholder', () => {
        fit("Should be empty by default", () => {
            const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have value", () => {
            const placeholderAssertValue = "test placeholder",
                inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            component.placeholder = placeholderAssertValue;
            fixture.detectChanges();

            expect(inputEl.nativeElement.placeholder).toEqual(placeholderAssertValue);
        });

        fit("Should be empty when input focused", () => {
            const placeholderAssertValue = "test placeholder",
                inputEl = fixture.debugElement.query(By.css('input[type=text]'));
            component.placeholder = placeholderAssertValue;
            fixture.detectChanges();

            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
        });
    });

    describe('Helper text', () => {
        fit("Should be empty by default", () => {
            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have value", () => {
            const helperTextAssertValue = 'test helper text';
            component.helperText = helperTextAssertValue;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
        });
    });

    describe('Load container', () => {
        fit('Should have all related attributes', () => {
            const loadContainerEl = fixture.debugElement.query(By.css('sfc-load-container'));

            expect(loadContainerEl.componentInstance.id).toEqual(component.inputId);
            expect(loadContainerEl.componentInstance.open).toEqual(component.isFocused);
            expect(loadContainerEl.componentInstance.showLoadMoreButton).toEqual(component.showLoadMoreButton);
            expect(loadContainerEl.componentInstance.loadMore).toEqual(component.loadMore);
            expect(loadContainerEl.componentInstance.showEmpty).toEqual(component.showEmpty);
        });

        fit('Should load more attribute be false', fakeAsync(() => {
            initData(true);
            emitSearching();

            const itemEl = fixture.debugElement.query(By.css('sfc-autocomplete-item')).query(By.css('div'));
            itemEl.triggerEventHandler('mousedown', { target: itemEl.nativeElement, button: 0 });
            fixture.detectChanges();

            const loadContainerEl = fixture.debugElement.query(By.css('sfc-load-container'));

            expect(loadContainerEl.componentInstance.loadMore).toBeFalse();
        }));

        fit('Should load more attribute become true after searching', fakeAsync(() => {
            initData(true);
            emitSearching();

            const itemEl = fixture.debugElement.query(By.css('sfc-autocomplete-item')).query(By.css('div'));
            itemEl.triggerEventHandler('mousedown', { target: itemEl.nativeElement, button: 0 });
            fixture.detectChanges();

            const loadContainerEl = fixture.debugElement.query(By.css('sfc-load-container'));

            expect(loadContainerEl.componentInstance.loadMore).toBeFalse();

            emitSearching('tes');

            expect(loadContainerEl.componentInstance.loadMore).toBeTrue();
        }));

        fit('Should show empty attribute be true', fakeAsync(() => {
            initData(true);
            emitSearching();

            const loadContainerEl = fixture.debugElement.query(By.css('sfc-load-container'));

            expect(loadContainerEl.componentInstance.showEmpty).toBeTrue();
        }));

        fit('Should show empty attribute be false if clear searching value', fakeAsync(() => {
            initData(true);
            emitSearching();

            const loadContainerEl = fixture.debugElement.query(By.css('sfc-load-container'));

            expect(loadContainerEl.componentInstance.showEmpty).toBeTrue();

            emitSearching(CommonConstants.EMPTY_STRING);

            expect(loadContainerEl.componentInstance.showEmpty).toBeFalse();
        }));

        describe('Items', () => {
            fit('Should not exist', () => {
                expect(fixture.debugElement.queryAll(By.css('sfc-autocomplete-item')).length).toEqual(0);
            });

            fit("Should exist", fakeAsync(() => {
                initData(true);
                emitSearching();

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);
            }));

            fit("Should have all related attributes", fakeAsync(() => {
                initData(true);
                emitSearching();

                const itemEl = fixture.debugElement.query(By.css('sfc-autocomplete-item'));

                expect(itemEl.componentInstance.item).toEqual({
                    key: 0,
                    value: 'test 0'
                });
            }));

            fit('Should not have any class', () => {
                expect(fixture.nativeElement.className).not.toContain(AutoCompleteInputConstants.HAS_ANY_ITEMS_CLASS);
            });

            fit('Should have any class', fakeAsync(() => {
                initData(true);
                emitSearching();

                expect(fixture.nativeElement.className).toContain(AutoCompleteInputConstants.HAS_ANY_ITEMS_CLASS);
            }));

            fit('Should remove items if value is empty', fakeAsync(() => {
                initData(true);
                emitSearching(CommonConstants.EMPTY_STRING);

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(0);
            }));

            fit('Should remove items on select item', fakeAsync(() => {
                initData(true);
                emitSearching();

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);

                const itemEl = fixture.debugElement.query(By.css('sfc-autocomplete-item')).query(By.css('div'));
                itemEl.triggerEventHandler('mousedown', { target: itemEl.nativeElement, button: 0 });
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(0);
            }));

            fit('Should set new items on new search value', fakeAsync(() => {
                const data = [{ key: 0, value: 'test 0' },
                { key: 1, value: 'test 1' },
                { key: 2, value: 'test 3' },
                { key: 3, value: 'test 3' },
                { key: 4, value: 'test 4' },
                { key: 5, value: 'test 5' }];
                initData(true, data);
                emitSearching();

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(5);

                emitSearching('5');

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);
            }));

            fit('Should concat items on load more', fakeAsync(() => {
                const data = [{ key: 0, value: 'test 0' },
                { key: 1, value: 'test 1' },
                { key: 2, value: 'test 3' },
                { key: 3, value: 'test 3' },
                { key: 4, value: 'test 4' },
                { key: 5, value: 'test 5' }],
                    loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button'));
                initData(false, data);
                emitSearching();

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(5);

                loadMoreBtn.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(6);
            }));

            fit('Should return items that include search value', fakeAsync(() => {
                const data = [
                    { key: 0, value: 'andrii' },
                    { key: 1, value: 'vova' }
                ];

                initData(true, data);

                emitSearching('vo');

                const itemEls = fixture.debugElement.queryAll(By.css('sfc-autocomplete-item'));

                expect(itemEls.length).toEqual(1);
                expect(itemEls[0].componentInstance.item).toEqual({
                    key: 1,
                    value: 'vova'
                });
            }));

            fit('Should return items that contains part of search value', fakeAsync(() => {
                const data = [
                    { key: 0, value: 'andrii 5' },
                    { key: 1, value: 'vova 4' }
                ];

                initData(true, data);

                emitSearching('5');

                const itemEls = fixture.debugElement.queryAll(By.css('sfc-autocomplete-item'));

                expect(itemEls.length).toEqual(1);
                expect(itemEls[0].componentInstance.item).toEqual({
                    key: 0,
                    value: 'andrii 5'
                });
            }));

            fit('Should return items when search value part has found in items', fakeAsync(() => {
                const data = [
                    { key: 0, value: '12 and 12' },
                    { key: 1, value: '11 or 11' }
                ];

                initData(true, data);

                emitSearching('or');

                const itemEls = fixture.debugElement.queryAll(By.css('sfc-autocomplete-item'));

                expect(itemEls.length).toEqual(1);
                expect(itemEls[0].componentInstance.item).toEqual({
                    key: 1,
                    value: '11 or 11'
                });
            }));
        });
    });

    describe('Data', () => {
        fit("Should have valid items count for sync data", fakeAsync(() => {
            initData(true);
            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);
        }));

        fit("Should sync data change", fakeAsync(() => {
            initData(true);
            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);

            component.data.push({
                key: 1,
                value: 'test 1'
            });

            emitSearching('tes');

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(2);

            component.data.shift();

            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);
        }));

        fit("Should have valid items count for async data", fakeAsync(() => {
            initData(false);
            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);
        }));

        fit("Should async data change", fakeAsync(() => {
            const dataSubject = initData(false);

            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);

            dataSubject?.next([
                {
                    key: 0,
                    value: 'test 0'
                },
                {
                    key: 1,
                    value: 'test 1'
                }]);
            fixture.detectChanges();

            emitSearching('tes');

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(2);

            dataSubject?.next([
                {
                    key: 0,
                    value: 'test 0'
                },
                {
                    key: 1,
                    value: 'test 1'
                },
                {
                    key: 2,
                    value: 'test 2'
                }]);
            fixture.detectChanges();

            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(3);
        }));

        fit("Should have valid items count for loader data", fakeAsync(() => {
            initLoader();
            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);
        }));

        fit("Should loader data change", fakeAsync(() => {
            const dataSubject = initLoader();

            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(1);

            dataSubject?.next({
                next: true,
                items: [{ key: 0, value: 'test 0' }, { key: 1, value: 'test 1' }],
                reset: false
            });
            fixture.detectChanges();

            emitSearching('tes');

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(2);

            dataSubject?.next({
                next: true,
                items: [{ key: 0, value: 'test 0' }, { key: 1, value: 'test 1' }, { key: 2, value: 'test 2' }],
                reset: false
            });
            fixture.detectChanges();

            emitSearching();

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(3);
        }));

        fit("Should not load data if searching value not change", fakeAsync(() => {
            const data = [{ key: 0, value: 'test 0' },
            { key: 1, value: 'test 1' },
            { key: 2, value: 'test 3' },
            { key: 3, value: 'test 3' },
            { key: 4, value: 'test 4' },
            { key: 5, value: 'test 5' }];
            initData(true, data);
            emitSearching('tes');

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(5);

            emitSearching('tes');

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(5);
        }));

        fit("Should load data after select item", fakeAsync(() => {
            const data = [{ key: 0, value: 'test 0' },
            { key: 1, value: 'test 1' },
            { key: 2, value: 'test 3' },
            { key: 3, value: 'test 3' },
            { key: 4, value: 'test 4' },
            { key: 5, value: 'test 5' }];

            initData(true, data);
            emitSearching('test');

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(5);

            const itemEl = fixture.debugElement.query(By.css('sfc-autocomplete-item')).query(By.css('div'));
            itemEl.triggerEventHandler('mousedown', { target: itemEl.nativeElement, button: 0 });
            fixture.detectChanges();

            emitSearching('test');

            expect(fixture.nativeElement.querySelectorAll('sfc-autocomplete-item').length).toEqual(5);
        }));
    });

    describe('Inner validation', () => {
        fit("Should raise validation error, when error occurred", fakeAsync(() => {
            component.loader = (_: ILoadMoreParameters) => {
                throw { errorMsg: 'Error occurred' }
            };
            component.ngAfterViewInit();
            fixture.detectChanges();

            emitSearching();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DATA_VALIDATION[ValidationConstants.DATA_VALIDATOR_KEY]);
        }));

        fit("Should hide validation error, when load data successfully", fakeAsync(() => {
            component.loader = (_: ILoadMoreParameters) => {
                throw { errorMsg: 'Error occurred' }
            };
            component.ngAfterViewInit();
            fixture.detectChanges();

            emitSearching();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DATA_VALIDATION[ValidationConstants.DATA_VALIDATOR_KEY]);

            initLoader();

            emitSearching();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
        }));
    });

    function initLoader(model: ILoadMoreModel<IAutoCompleteItemModel> = {
        next: true, items: [{ key: 0, value: 'test 0' }], reset: false
    })
        : BehaviorSubject<ILoadMoreModel<IAutoCompleteItemModel>> {
        const dataSubject = new BehaviorSubject<ILoadMoreModel<IAutoCompleteItemModel>>(model);
        component.loader = (_: ILoadMoreParameters) => {
            return dataSubject.asObservable()
        };
        component.ngAfterViewInit();
        fixture.detectChanges();

        return dataSubject;
    }

    function initData(isSync: boolean, data: IAutoCompleteItemModel[] = [{
        key: 0,
        value: 'test 0'
    }]): BehaviorSubject<IAutoCompleteItemModel[]> | null {
        let dataSubject = null;

        if (isSync) {
            component.data = data;
            component.ngOnInit();
        } else {
            dataSubject = new BehaviorSubject<IAutoCompleteItemModel[]>(data);
            component.data$ = dataSubject.asObservable();
        }

        component.ngAfterViewInit();
        fixture.detectChanges();

        return dataSubject;
    }

    function emitSearching(value: string = 'te') {
        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.value = value;
        inputEl.nativeElement.dispatchEvent(new Event('input'));

        tick(AutoCompleteInputConstants.DEFAULT_DEBOUNCE_TIME);
        fixture.detectChanges();
    }
});
