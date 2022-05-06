import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseComponent } from './close.component';

describe('Component: CloseComponent', () => {
  let component: CloseComponent;
  let fixture: ComponentFixture<CloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloseComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit("Should create component", () => {
    expect(component).toBeTruthy();
  });

  fit("Should have main elements", () => {
    expect(fixture.nativeElement.querySelector('div.container')).toBeDefined();
    expect(fixture.nativeElement.querySelector('i.fas.fa-times')).toBeDefined();
  });
});
