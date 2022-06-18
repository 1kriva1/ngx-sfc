import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselStageComponent } from './carousel-stage.component';

describe('Component: CarouselStage', () => {
  let component: CarouselStageComponent;
  let fixture: ComponentFixture<CarouselStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselStageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
