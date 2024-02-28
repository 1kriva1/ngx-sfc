import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
  CheckmarkComponent, ShowHideElementDirective,
  MouseDownDirective, BounceLoaderComponent, LoadMoreButtonComponent, ComponentSizeDirective, LoadContainerComponent,
  ScrollTrackerDirective, ScrollIntoViewDirective, DelimeterComponent, CommonConstants, UIClass, ILoadContainerLoaderResultModel,
  ILoadContainerParameters,
  PaginationConstants,
  LoadContainerLoadType
} from 'ngx-sfc-common';
import { BehaviorSubject } from 'rxjs';
import { InputConstants } from '../../constants/input.constants';
import { ValidationConstants } from '../../constants/validation.constants';
import { InputReferenceDirective } from '../../directives';
import { SelectItemComponent } from '../no-export-index';
import { ISelectGroupValue } from './models/select-group-value.model';
import { ISelectGroupItemModel } from './parts/item/models/select-group-item.model';
import { SelectItemModel } from './parts/item/select-item.component';
import { SelectInputComponent } from './select-input.component';
import { SelectInputConstants } from './select-input.constants';

describe('Component: SelectInput', () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ShowHideElementDirective, InputReferenceDirective, MouseDownDirective, BounceLoaderComponent, LoadMoreButtonComponent, ComponentSizeDirective,
        LoadContainerComponent, ScrollTrackerDirective, ScrollIntoViewDirective, CheckmarkComponent, DelimeterComponent, SelectItemComponent,
        SelectInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputComponent);
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

    fit('Should have default load on init', () => {
      expect(component.loadOnInit).toBeTrue();
    });

    fit('Should have default size', () => {
      expect(component.size).toEqual(PaginationConstants.DEFAULT_SIZE);
    });

    fit('Should have default pagination', () => {
      expect(component.pagination).toEqual({ size: component.size, page: PaginationConstants.DEFAULT_PAGE });
    });

    fit('Should have default show default item', () => {
      expect(component.showDefaultItem).toBeTrue();
    });

    fit('Should have default item label', () => {
      expect(component.defaultItemLabel).toEqual(SelectInputConstants.DEFAULT_ITEM_VALUE);
    });

    fit('Should have defined default item label', () => {
      component.defaultItemLabel = 'Test default';
      fixture.detectChanges();

      expect(component.defaultItemLabel).toEqual(component.defaultItemLabel);
    });

    fit('Should have default multiple', () => {
      expect(component.multiple).toBeFalse();
    });

    fit('Should have defined load model for container', () => {
      expect(component.loadModel).toBeDefined();
    });

    fit('Should have undefined predicate observable for load model', () => {
      expect(component.loadModel.predicate$).toBeUndefined();
    });

    fit('Should have defined predicate observable for load model', () => {
      component.loadOnInit = false;
      component.ngOnInit();

      expect(component.loadModel.predicate$).toBeDefined();
    });

    fit('Should have defined data observable for load model', () => {
      expect(component.loadModel.data$).toBeDefined();
    });

    fit('Should have undefined filter for load model', () => {
      expect(component.loadModel.filter).toBeUndefined();
    });

    fit('Should have undefined loader for load model', () => {
      expect(component.loadModel.loader).toBeUndefined();
    });

    fit('Should have defined loader for load model', () => {
      initLoader();

      expect(component.loadModel.loader).toBeDefined();
    });

    fit('Should has not initialization class, when load on init is true', () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Initialization);
    });

    fit('Should has not initialization class, when init load already passed', () => {
      component.loadOnInit = false;
      initData(true);

      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Initialization);
    });

    fit('Should has initialization class', () => {
      resetLoadOnInit();

      expect(fixture.nativeElement.className).toContain(UIClass.Initialization);
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

    fit('Should focus text input on click event', () => {
      component.icon = faUser;
      fixture.detectChanges();

      component.ngAfterViewInit();
      fixture.detectChanges();

      const iconEl = fixture.debugElement.query(By.css('.icon'));
      iconEl.triggerEventHandler('click', { target: iconEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector("input[type='text']")).toEqual(document.activeElement);
    });
  });

  describe('Label', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined value', () => {
      const labelAssertValue = 'test label';
      component.label = labelAssertValue;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').innerText).toEqual(labelAssertValue);
    });

    fit('Should be linked to input element', () => {
      const inputEl = fixture.nativeElement.querySelector('input[type=text]');
      expect(inputEl.labels).toBeDefined();
      expect(inputEl.labels.length).toEqual(1);
      expect(inputEl.labels[0].htmlFor).toEqual(inputEl.id);
    });

    fit('Should be active, when placeholder exist', () => {
      component.placeholder = 'test placeholder';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit('Should be active, when value defined', () => {
      component.writeValue({ key: 0, value: 'Test' });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit('Should be active, when input in focus', () => {
      const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });
  });

  describe('Input', () => {
    fit('Should have default id value', () => {
      expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}undefined`);
    });

    fit('Should have defined id value', () => {
      component.id = 'test-id';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('input[type=text]')).nativeElement.id).toEqual(`${InputConstants.ID_PREFIX}test-id`);
    });

    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined value for for single value', () => {
      component.writeValue({ key: 0, value: 'Test' });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('Test');
    });

    fit('Should have defined value for multiple value', () => {
      component.multiple = true;
      component.writeValue([{ key: 0, value: 'Test' }, { key: 1, value: 'Test1' }]);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('Test, Test1');
    });

    fit('Should have defined value for group value', () => {
      initData(true, [{ value: 'Group test', group: true, groupKey: 1 }, { key: 1, groupKey: 1, value: 'Test1' }, { key: 1, groupKey: 2, value: 'Test2' }])
      component.writeValue({ key: 1, groupKey: 1, value: 'Test1' });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual('Test1');
    });

    fit('Should have empty value for group value', () => {
      initData(true, [{ value: 'Group test', group: true }, { key: 1, groupKey: 1 } as ISelectGroupItemModel])
      component.writeValue({ key: 1, groupKey: 1 } as ISelectGroupValue);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should not be disabled', () => {
      expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeFalse();
    });

    fit('Should be disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input[type=text]').disabled).toBeTrue();
    });

    fit('Should be readonly', () => {
      expect(fixture.nativeElement.querySelector('input[type=text]').readOnly).toBeTrue();
    });

    fit('Should add active class for label on focus event', () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(UIClass.Active);
    });

    fit('Should remove active class from label on blur event', () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label').className).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should not set scroll target', () => {
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(component.selectedItem).toBeUndefined();
    });

    fit('Should set scroll target', () => {
      initData(true, [{
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
      component.writeValue({ key: 2, value: 'test 2' });
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      const selectItems = fixture.debugElement.queryAll(By.css('sfc-select-item'));

      expect(component.selectedItem).toEqual(selectItems[3].nativeElement);
    });

    fit('Should init load data on focus', () => {
      resetLoadOnInit()

      initData(true, [{
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

      expect(fixture.debugElement.queryAll(By.css('sfc-select-item')).length)
        .toEqual(1);

      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('sfc-select-item')).length)
        .toEqual(4);
    });
  });

  describe('Placeholder', () => {
    fit('Should be empty by default', () => {
      const inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have value', () => {
      const placeholderAssertValue = 'test placeholder',
        inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      expect(inputEl.nativeElement.placeholder).toEqual(placeholderAssertValue);
    });

    fit('Should not be empty when input focused', () => {
      const placeholderAssertValue = 'test placeholder',
        inputEl = fixture.debugElement.query(By.css('input[type=text]'));
      component.placeholder = placeholderAssertValue;
      fixture.detectChanges();

      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(inputEl.nativeElement.placeholder).toEqual(placeholderAssertValue);
    });
  });

  describe('Helper text', () => {
    fit('Should be empty by default', () => {
      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have value', () => {
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
      expect(loadContainerEl.componentInstance.showEmpty).toBeFalse();
      expect(loadContainerEl.componentInstance.model.loadType).toEqual(LoadContainerLoadType.Button);
      expect(loadContainerEl.componentInstance.model.pagination).toEqual(component.pagination);
    });

    fit('Should have scroll load type', () => {
      component.showLoadMoreButton = false;
      component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-load-container')).componentInstance.model.loadType)
        .toEqual(LoadContainerLoadType.Scroll);
    });

    fit('Should scroll target be undefined', () => {
      expect(fixture.debugElement.query(By.css('sfc-load-container')).componentInstance.scrollTarget)
        .toBeUndefined();
    });

    fit('Should scroll target be defined', () => {
      initData(true, [{
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
      component.writeValue({ key: 2, value: 'test 2' });
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-load-container')).componentInstance.scrollTarget)
        .toBeDefined();
    });

    fit('Should has not initialization class after load complete', () => {
      resetLoadOnInit();

      initData(true);

      expect(fixture.nativeElement.className).toContain(UIClass.Initialization);

      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Initialization);
    });

    describe('Items', () => {
      fit('Should not exist', () => {
        fixture.detectChanges();

        component.showDefaultItem = false;
        component.items = [];
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('sfc-select-item')).length).toEqual(0);
      });

      fit('Should exist', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true);

        expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(1);
      });

      fit('Should have all related attributes', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true);

        const itemEl = fixture.debugElement.query(By.css('sfc-select-item'));

        expect(itemEl.componentInstance.item).toEqual({
          key: 0,
          value: 'test 0'
        });
        expect(itemEl.componentInstance.multiple).toBeFalse();
        expect(itemEl.componentInstance.active).toBeFalse();
        expect(itemEl.componentInstance.hasGroup).toBeFalse();
      });

      fit('Should be active item', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach(item => expect(item.componentInstance.active).toBeFalse());

        component.writeValue({ key: 1, value: 'Test 1' });
        fixture.detectChanges();

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach((item, index) => index === 0
            ? expect(item.componentInstance.active).toBeFalse()
            : expect(item.componentInstance.active).toBeTrue());
      });

      fit('Should be multiple item', () => {
        component.showDefaultItem = false;
        component.items = [];
        component.multiple = true;
        initData(true);

        expect(fixture.debugElement.query(By.css('sfc-select-item')).componentInstance.multiple)
          .toBeTrue();
      });

      fit('Should be active multiple items', () => {
        component.showDefaultItem = false;
        component.items = [];
        component.multiple = true;
        initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach(item => expect(item.componentInstance.active).toBeFalse());

        component.writeValue([{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);
        fixture.detectChanges();

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach(item => expect(item.componentInstance.active).toBeTrue());
      });

      fit('Should be group item', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true, [{ group: true, value: 'group' }, { key: 1, value: 'Test 1' }]);

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach(item => expect(item.componentInstance.hasGroup).toBeTrue());
      });

      fit('Should be active group item', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true, [{ value: 'Group test', group: true, groupKey: 1 }, { key: 1, groupKey: 1, value: 'Test1' }, { key: 1, groupKey: 2, value: 'Test2' }]);

        component.writeValue({ key: 1, groupKey: 2, value: 'Test2' });
        fixture.detectChanges();

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach((item, index) => index === 2
            ? expect(item.componentInstance.active).toBeTrue()
            : expect(item.componentInstance.active).toBeFalse());
      });

      fit('Should hide group item with not existing group key', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true, [{ value: 'Group test', group: true, groupKey: 1 }, { key: 1, groupKey: 1, value: 'Test1' }, { key: 1, groupKey: 3, value: 'Test2' }]);

        expect(fixture.debugElement.queryAll(By.css('sfc-select-item')).length).toEqual(2);
      });

      fit('Should show group without group items', () => {
        component.showDefaultItem = false;
        component.items = [];

        initData(true, [{ value: 'Group test', group: true, groupKey: 2 }, { key: 1, groupKey: 1, value: 'Test1' }, { key: 1, groupKey: 1, value: 'Test2' }]);

        expect(fixture.debugElement.queryAll(By.css('sfc-select-item')).length).toEqual(1);
      });

      fit('Should concat items on load more', () => {
        const data = [
          { key: 0, value: 'test 0' },
          { key: 1, value: 'test 1' },
          { key: 2, value: 'test 3' },
          { key: 3, value: 'test 3' },
          { key: 4, value: 'test 4' },
          { key: 5, value: 'test 5' }
        ],
          loadMoreBtn = fixture.debugElement.query(By.css('sfc-load-more-button div.button'));
        initData(true, data);

        expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(6);

        loadMoreBtn.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(7);
      });

      fit('Should load items depend on size parameter', () => {
        component.size = 2;
        component.showDefaultItem = false;
        component.ngOnInit();

        const data = [
          { key: 0, value: 'test 0' },
          { key: 1, value: 'test 1' },
          { key: 2, value: 'test 3' },
          { key: 3, value: 'test 3' },
          { key: 4, value: 'test 4' },
          { key: 5, value: 'test 5' }
        ];

        initData(true, data);

        expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(2);
      });

      fit('Should prepare group item', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true, [
          { group: true, value: 'group 2', groupKey: 2 },
          { group: true, value: 'group 1', groupKey: 1 },
          { key: 1, value: 'Test 1', groupKey: 2 },
          { key: 1, value: 'Test 1', groupKey: 1 },
          { key: 2, value: 'Test 2', groupKey: 2 }
        ]);

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach((item, index) => {
            switch (index) {
              case 0:
                expect(item.componentInstance.item).toEqual({ group: true, value: 'group 2', groupKey: 2 });
                break;
              case 1:
                expect(item.componentInstance.item).toEqual({ key: 1, value: 'Test 1', groupKey: 2 });
                break;
              case 2:
                expect(item.componentInstance.item).toEqual({ key: 2, value: 'Test 2', groupKey: 2 });
                break;
              case 3:
                expect(item.componentInstance.item).toEqual({ group: true, value: 'group 1', groupKey: 1 });
                break;
              case 4:
                expect(item.componentInstance.item).toEqual({ key: 1, value: 'Test 1', groupKey: 1 });
                break;
            }
          });
      });

      fit('Should not add default item', () => {
        component.showDefaultItem = false;
        component.items = [];
        initData(true);

        const selectItems = fixture.debugElement.queryAll(By.css('sfc-select-item'));

        expect(selectItems.length).toEqual(1);
        expect(selectItems[0].componentInstance.item).toEqual({
          key: 0,
          value: 'test 0'
        });
      });

      fit('Should add default item', () => {
        component.items = [];
        initData(true);

        const selectItems = fixture.debugElement.queryAll(By.css('sfc-select-item'));

        expect(selectItems.length).toEqual(2);
        expect(selectItems[0].componentInstance.item).toEqual({ key: null, value: component.defaultItemLabel });
      });

      fit('Should add default item with defined label', () => {
        component.items = [];
        component.defaultItemLabel = 'Test default item label';
        initData(true);

        const selectItems = fixture.debugElement.queryAll(By.css('sfc-select-item'));

        expect(selectItems.length).toEqual(2);
        expect(selectItems[0].componentInstance.item).toEqual({ key: null, value: 'Test default item label' });
      });

      fit('Should not add default item twice', () => {
        component.items = [];
        initData(true);

        const selectItems = fixture.debugElement.queryAll(By.css('sfc-select-item'));

        expect(selectItems.length).toEqual(2);
        expect(selectItems[0].componentInstance.item).toEqual({ key: null, value: component.defaultItemLabel });

        initData(true);

        fixture.debugElement.queryAll(By.css('sfc-select-item'))
          .forEach((item, index) => index === 0
            ? expect(item.componentInstance.item).toEqual({ key: null, value: component.defaultItemLabel })
            : expect(item.componentInstance.item).toEqual({ key: 0, value: 'test 0' }));
      });

      describe('Select', () => {
        fit('Should select single value', () => {
          initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          const itemEl = fixture.debugElement.queryAll(By.css('sfc-select-item'))[2].query(By.css('div'));
          itemEl.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual({ key: 1, value: 'Test 1' });
        });

        fit('Should not select single value twice', () => {
          spyOn(component.changeValue, 'emit');
          initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          const itemEl = fixture.debugElement.queryAll(By.css('sfc-select-item'))[2].query(By.css('div'));
          itemEl.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.changeValue.emit).toHaveBeenCalledTimes(1);
        });

        fit('Should select multiple values', () => {
          component.multiple = true;
          initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          const itemEl = fixture.debugElement.queryAll(By.css('sfc-select-item')),
            item2El = itemEl[2].query(By.css('div')),
            item1El = itemEl[1].query(By.css('div'));
          item2El.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: 1, value: 'Test 1' }]);

          item1El.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);
        });

        fit('Should remove selected value', () => {
          component.multiple = true;
          initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          fixture.debugElement.queryAll(By.css('sfc-select-item'))[2].query(By.css('div'))
            .triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: 1, value: 'Test 1' }]);

          fixture.debugElement.queryAll(By.css('sfc-select-item'))[2].query(By.css('div'))
            .triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([]);
        });

        fit('Should not remove selected default item value', () => {
          component.multiple = true;
          initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          fixture.debugElement.queryAll(By.css('sfc-select-item'))[0].query(By.css('div'))
            .triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: null, value: component.defaultItemLabel }]);

          fixture.debugElement.queryAll(By.css('sfc-select-item'))[0].query(By.css('div'))
            .triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: null, value: component.defaultItemLabel }]);
        });

        fit('Should remove all selected values on default item select', () => {
          component.multiple = true;
          initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          const itemEl = fixture.debugElement.queryAll(By.css('sfc-select-item')),
            item2El = itemEl[2].query(By.css('div')),
            item1El = itemEl[1].query(By.css('div')),
            defaultItemEl = itemEl[0].query(By.css('div'));
          item2El.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: 1, value: 'Test 1' }]);

          item1El.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          defaultItemEl.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: null, value: component.defaultItemLabel }]);
        });

        fit('Should remove selected default item, when select not default', () => {
          component.multiple = true;
          initData(true, [{ key: 0, value: 'Test 0' }, { key: 1, value: 'Test 1' }]);

          const itemEl = fixture.debugElement.queryAll(By.css('sfc-select-item')),
            item2El = itemEl[2].query(By.css('div')),
            defaultItemEl = itemEl[0].query(By.css('div'));

          defaultItemEl.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: null, value: component.defaultItemLabel }]);

          item2El.triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual([{ key: 1, value: 'Test 1' }]);
        });

        fit('Should select group item', () => {
          initData(true, [
            { value: 'Group test', group: true, groupKey: 1 }, { value: 'Group test 2', group: true, groupKey: 2 },
            { key: 1, groupKey: 1, value: 'Test1' }, { key: 1, groupKey: 2, value: 'Test2' }
          ]);

          fixture.debugElement.queryAll(By.css('sfc-select-item'))[4].query(By.css('div'))
            .triggerEventHandler('mousedown', new MouseEvent('mousedown'));
          fixture.detectChanges();

          expect(component.value).toEqual({ key: 1, groupKey: 2, value: 'Test2' });
        });
      });
    });
  });

  describe('Data', () => {
    fit('Should have valid items count for sync data', () => {
      initData(true);

      expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(2);
    });

    fit('Should have valid items count for async data', () => {
      initData(false);

      expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(2);
    });

    fit('Should have valid items count for loader data', () => {
      initLoader();

      expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(2);
    });

    fit('Should reset items on new data', () => {
      initLoader({ next: true, items: [{ key: 0, value: 'test 0' }, { key: 1, value: 'test 1' }], total: 2 });

      expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(3);

      initLoader({ next: true, items: [{ key: 0, value: 'test 0' }], total: 1 });

      expect(fixture.nativeElement.querySelectorAll('sfc-select-item').length).toEqual(2);
    });
  });

  describe('Inner validation', () => {
    fit('Should raise validation error, when error occurred', () => {
      component.loader = (_: ILoadContainerParameters) => {
        throw { errorMsg: 'Error occurred' }
      };
      component.ngOnInit();
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DATA_VALIDATION[ValidationConstants.DATA_VALIDATOR_KEY]);
    });

    fit('Should hide validation error, when load data successfully', () => {
      component.loader = (_: ILoadContainerParameters) => {
        throw { errorMsg: 'Error occurred' }
      };
      component.ngOnInit();
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(ValidationConstants.DATA_VALIDATION[ValidationConstants.DATA_VALIDATOR_KEY]);

      initLoader();

      expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });
  });

  function initData(isSync: boolean, data: SelectItemModel[] = [{
    key: 0,
    value: 'test 0'
  }]): BehaviorSubject<SelectItemModel[]> | null {
    let dataSubject = null;

    if (isSync) {
      component.data = data;
    } else {
      dataSubject = new BehaviorSubject<SelectItemModel[]>(data);
      component.data$ = dataSubject.asObservable();
    }

    component.ngOnInit();
    fixture.detectChanges();

    return dataSubject;
  }

  function initLoader(model: ILoadContainerLoaderResultModel<SelectItemModel> = { next: true, items: [{ key: 0, value: 'test 0' }], total: 1 })
    : BehaviorSubject<ILoadContainerLoaderResultModel<SelectItemModel>> {
    const dataSubject = new BehaviorSubject<ILoadContainerLoaderResultModel<SelectItemModel>>(model);
    component.loader = (_: ILoadContainerParameters) => dataSubject.asObservable();
    component.ngOnInit();
    component.ngAfterViewInit();
    fixture.detectChanges();

    return dataSubject;
  }

  function resetLoadOnInit() {
    fixture.detectChanges();

    component.loadOnInit = false;
    (component as any)._initialized = false;
    component.ngOnInit();
    fixture.detectChanges();
  }
});
