import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants, DelimeterComponent } from 'ngx-sfc-common';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';

describe('Component: DropdownMenuItemComponent', () => {
  let component: DropdownMenuItemComponent;
  let fixture: ComponentFixture<DropdownMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelimeterComponent, DropdownMenuItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('li')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('li a')).toBeTruthy();
    });

    fit('Should be default item value', () => {
      expect(component.item).toEqual({ label: CommonConstants.EMPTY_STRING });
    });

    fit('Should be defined item value', () => {
      component.item = { label: 'Test label', icon: 'fa fa-test' };
      fixture.detectChanges();

      expect(component.item).toEqual({ label: 'Test label', icon: 'fa fa-test' });
    });

    fit('Should call item click action', () => {
      component.item = { label: 'Test label', click: () => { } };
      fixture.detectChanges();

      spyOn<any>(component.item, 'click');

      fixture.debugElement.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(component.item.click).toHaveBeenCalledOnceWith(component.item);
    });
  });

  describe('Label', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('li a').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined value', () => {
      component.item.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('li a').innerText).toEqual(component.item.label);
    });
  });

  describe('Icon', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('i')).toBeNull();
    });

    fit('Should exist', () => {
      component.item.icon = 'fa fa-test';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('i.fa.fa-test')).toBeTruthy();
    });
  });

  describe('Delimeter', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
    });

    fit('Should exist', () => {
      component.item.delimeter = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
    });
  });
});
