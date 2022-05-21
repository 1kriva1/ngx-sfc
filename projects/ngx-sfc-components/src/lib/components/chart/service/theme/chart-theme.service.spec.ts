import { TestBed } from '@angular/core/testing';
import { ChartThemeModel } from './chart-theme.model';
import { ChartThemeService } from './chart-theme.service';

describe('Service: ChartTheme', () => {
  let service: ChartThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartThemeService);
  });

  fit('Should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('Should be defined colors observable', () => {
    expect(service.colors$).toBeTruthy();
  });

  fit('Should emit on colors', done => {
    const assertModel: ChartThemeModel = { dataSetColors: [{ borderColor: 'red' }], options: {} };

    service.colors$.subscribe((model: ChartThemeModel) => {
      expect(model).toEqual(assertModel);
      done();
    });

    service.setColors(assertModel);
  });

  fit('Should return undefined colors', () => {
    expect(service.getColors()).toBeUndefined();
  });

  fit('Should return defined colors', () => {
    const assertModel: ChartThemeModel = { dataSetColors: [{ borderColor: 'red' }], options: {} };

    service.setColors(assertModel);

    expect(service.getColors()).toEqual(assertModel);
  });
});
