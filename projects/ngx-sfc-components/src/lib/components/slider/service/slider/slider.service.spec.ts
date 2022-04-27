import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { SliderMoveType } from './slider-move-type.enum';
import { ISliderMoveModel } from './slider-move.model';
import { SliderService } from './slider.service';

describe('Service: SliderService', () => {
  let service: SliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SliderService]
    });
    service = TestBed.inject(SliderService);
  });

  fit('Should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('Should be defined model observable', () => {
    service.init(of(3));

    expect(service.model$).toBeTruthy();
  });

  fit('Should have default model', done => {
    service.init(of());
    service.model$.subscribe((model: ISliderMoveModel) => {
      expect(model).toEqual({ index: 0, count: 0 });
      done();
    });
  });

  fit('Should have defined count', fakeAsync(() => {
    service.init(of(2));
    let assertModel!: ISliderMoveModel;
    service.model$.subscribe((model: ISliderMoveModel) => assertModel = model);

    tick();

    expect(assertModel.count).toEqual(2);
  }));

  fit('Should emit on move next', fakeAsync(() => {
    service.init(of(4));
    let assertModel!: ISliderMoveModel;
    service.model$.subscribe((model: ISliderMoveModel) => assertModel = model);

    service.move(SliderMoveType.Next);
    tick();

    expect(assertModel).toEqual({ index: 1, count: 4 });
  }));

  fit('Should emit on move previous', fakeAsync(() => {
    service.init(of(4));
    let assertModel!: ISliderMoveModel;
    service.model$.subscribe((model: ISliderMoveModel) => assertModel = model);

    service.move(SliderMoveType.Next);
    tick();

    service.move(SliderMoveType.Previous);
    tick();

    expect(assertModel).toEqual({ index: 0, count: 4 });
  }));

  fit('Should have last index, when index less than 0', fakeAsync(() => {
    service.init(of(4));
    let assertModel!: ISliderMoveModel;
    service.model$.subscribe((model: ISliderMoveModel) => assertModel = model);

    service.move(SliderMoveType.Previous);
    tick();

    expect(assertModel).toEqual({ index: 3, count: 4 });
  }));

  fit('Should have first index, when index is equal count', fakeAsync(() => {
    service.init(of(2));
    let assertModel!: ISliderMoveModel;
    service.model$.subscribe((model: ISliderMoveModel) => assertModel = model);

    service.move(SliderMoveType.Next);
    tick();

    service.move(SliderMoveType.Next);
    tick();

    expect(assertModel).toEqual({ index: 0, count: 2 });
  }));

  fit('Should emit on select', fakeAsync(() => {
    service.init(of(4));
    let assertModel!: ISliderMoveModel;
    service.model$.subscribe((model: ISliderMoveModel) => assertModel = model);

    service.select(2);
    tick();

    expect(assertModel).toEqual({ index: 2, count: 4 });
  }));
});
