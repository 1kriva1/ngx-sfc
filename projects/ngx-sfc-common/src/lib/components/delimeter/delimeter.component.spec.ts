import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Direction } from '../../enums';
import { DelimeterComponent } from './delimeter.component';

describe('Component: Delimeter', () => {
  let component: DelimeterComponent;
  let fixture: ComponentFixture<DelimeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelimeterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelimeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit("Should create component", () => {
    expect(component).toBeTruthy();
  });

  fit("Should have default direction", () => {
    expect(fixture.nativeElement.className).toEqual(Direction.Horizontal);
  });

  fit("Should have defined direction", () => {
    component.direction = Direction.Vertical;
    fixture.detectChanges();

    expect(fixture.nativeElement.className).toEqual(Direction.Vertical);
  });
});
