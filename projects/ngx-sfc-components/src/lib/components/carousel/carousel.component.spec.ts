import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT, WINDOW } from 'ngx-sfc-common';
import { CarouselStageComponent } from '../no-export-index';
import { CarouselComponent } from './carousel.component';

describe('Component: Carousel', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let windowMock: any = <any>{};
  let documentMock: any = <any>{};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselStageComponent, CarouselComponent],
      providers: [
        { provide: WINDOW, useFactory: (() => { return windowMock; }) },
        { provide: DOCUMENT, useFactory: (() => { return documentMock; }) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
