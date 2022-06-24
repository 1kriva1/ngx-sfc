import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloseComponent } from './close.component';

describe('Component: CloseComponent', () => {
  let component: CloseComponent;
  let fixture: ComponentFixture<CloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
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
    expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('fa-icon svg.fa-xmark')).toBeTruthy();
  });
});
