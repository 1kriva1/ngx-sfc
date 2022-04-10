import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonConstants } from 'ngx-sfc-common';
import { TagComponent } from './tag.component';

describe('Component: TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('a.tag')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
    });
  });

  describe('Label', () => {
    fit('Should have default value', () => {
      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have defined value', () => {
      component.model.label = 'Test label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('span').innerText).toEqual(component.model.label);
    });
  });

  describe('Icon', () => {
    fit('Should not exist', () => {
      expect(fixture.nativeElement.querySelector('i')).toBeNull();
    });

    fit('Should exist', () => {
      component.model.icon = 'fa fa-test';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('i.fa.fa-test')).toBeTruthy();
    });
  });
});
