import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TagComponent } from '../no-export-index';
import { TagsComponent } from './tags.component';

describe('Component: TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagComponent, TagsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should create main elements', () => {
      expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.tags')).toBeTruthy();
    });
  });

  describe('Tags', () => {
    fit('Should not have any tag', () => {
      expect(fixture.debugElement.queryAll(By.css('sfc-tag')).length).toEqual(0);
    });

    fit('Should have tag', () => {
      component.tags = [{ label: 'tag one' }, { label: 'tag two' }];
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('sfc-tag')).length).toEqual(2);
    });

    fit('Should tag model reflect tags input', () => {
      component.tags = [{ label: 'tag one', icon: 'fa fa-test' }];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-tag')).componentInstance.model)
        .toEqual(component.tags[0]);
    });
  });
});
