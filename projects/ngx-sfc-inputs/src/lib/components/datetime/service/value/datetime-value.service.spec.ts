import { TestBed } from '@angular/core/testing';
import { CommonConstants, DateTimeConstants, getNextDate, setDefaultSecondsAndMiliseconds } from 'ngx-sfc-common';
import { DateTimeFormatsConstants } from '../../constants/formats.constants';
import { DateTimeValueActionType } from './datetime-value.enum';
import { DateTimeValueService } from './datetime-value.service';
import { IDateTimeValueInitModel } from './models/datetime-value-init.model';
import { IDateTimeValueModel } from './models/datetime-value.model';

describe('Service: DateTimeValueService', () => {
  let service: DateTimeValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeValueService]
    });
    service = TestBed.inject(DateTimeValueService);
  });

  describe('General', () => {
    fit('Should be created', () => {
      expect(service).toBeTruthy();
    });

    fit('Should return default value', () => {
      expect(service.value).toBeUndefined();
    });

    fit('Should value observable be undefined by default', () => {
      expect(service.value$).toBeUndefined();
    });

    fit('Should return defined value', () => {
      service.value = new Date();
      expect(service.value.getSeconds()).toEqual(0);
      expect(service.value.getMilliseconds()).toEqual(0);
    });
  });

  describe('Init', () => {
    fit('Should view observable has value', () => {
      const initModel: IDateTimeValueInitModel = {
        date: true,
        time: true,
        shortTime: false,
        value: new Date(),
        format: CommonConstants.EMPTY_STRING,
        locale: DateTimeConstants.DEFAULT_LOCALE,
        currentValue: new Date(),
        disabledDays: []
      };
      service.init(initModel);

      expect(service.value$).toBeTruthy();
    });

    fit('Should emit default model', done => {
      const assertValue = setDefaultSecondsAndMiliseconds(new Date());
      subscribeToExpect(model => {
        expect(model.value).toEqual(assertValue);
        done();
      }, assertValue);
    });

    fit('Should emit default model, when now is disabled', done => {
      const assertValue = setDefaultSecondsAndMiliseconds(new Date()),
        initModel: IDateTimeValueInitModel = {
          date: true,
          time: true,
          shortTime: false,
          value: new Date(),
          currentValue: new Date(),
          format: CommonConstants.EMPTY_STRING,
          locale: DateTimeConstants.DEFAULT_LOCALE,
          disabledDays: [new Date()]
        };
      subscribeToExpect(model => {
        expect(model.value).toEqual(getNextDate(assertValue));
        done();
      }, assertValue, initModel);
    });

    fit('Should emit default model, when now is not disabled', done => {
      const assertValue = setDefaultSecondsAndMiliseconds(new Date()),
        initModel: IDateTimeValueInitModel = {
          date: true,
          time: true,
          shortTime: false,
          value: new Date(),
          currentValue: new Date(),
          format: CommonConstants.EMPTY_STRING,
          locale: DateTimeConstants.DEFAULT_LOCALE,
          disabledDays: [getNextDate(new Date())]
        };
      subscribeToExpect(model => {
        expect(model.value).toEqual(assertValue);
        done();
      }, assertValue, initModel);
    });
  });

  describe('Value', () => {
    fit('Should have defined day', done => {
      const assertValue = setDefaultSecondsAndMiliseconds(new Date(2022, 9, 22));
      subscribeToExpect(model => {
        expect(model.day).toEqual('Saturday');
        done();
      }, assertValue);
    });

    fit('Should set current value', () => {
      const assertValue = new Date(2022, 9, 22);
      service.currentValue = assertValue;

      expect((service as any).model.currentValue).toEqual(assertValue)
    });

    fit('Should get current value', () => {
      const assertValue = new Date(2022, 9, 22);
      (service as any).model.currentValue = assertValue;

      expect(service.currentValue).toEqual(assertValue)
    });

    fit('Should have defined day without date', done => {
      const assertValue = new Date(2022, 9, 22),
        initModel: IDateTimeValueInitModel = {
          date: false,
          time: true,
          shortTime: false,
          value: new Date(),
          currentValue: new Date(),
          format: CommonConstants.EMPTY_STRING,
          locale: DateTimeConstants.DEFAULT_LOCALE,
          disabledDays: []
        };
      subscribeToExpect(model => {
        expect(model.day).toEqual(CommonConstants.EMPTY_STRING);
        done();
      }, assertValue, initModel);
    });

    fit('Should have defined day without date and time', done => {
      const assertValue = new Date(2022, 9, 22),
        initModel: IDateTimeValueInitModel = {
          date: false,
          time: false,
          shortTime: false,
          value: new Date(),
          currentValue: new Date(),
          format: DateTimeFormatsConstants.DEFAULT_DATE_TIME_FORMAT,
          locale: DateTimeConstants.DEFAULT_LOCALE,
          disabledDays: []
        };
      subscribeToExpect(model => {
        expect(model.day).toEqual('22/10/2022');
        done();
      }, assertValue, initModel);
    });

    fit('Should have defined day number', done => {
      const assertValue = new Date(2022, 9, 22);
      subscribeToExpect(model => {
        expect(model.dayNumber).toEqual(22);
        done();
      }, assertValue);
    });

    fit('Should have defined month', done => {
      const assertValue = new Date(2022, 9, 22);
      subscribeToExpect(model => {
        expect(model.month).toEqual('Oct');
        done();
      }, assertValue);
    });

    fit('Should have defined year', done => {
      const assertValue = new Date(2022, 9, 22);
      subscribeToExpect(model => {
        expect(model.year).toEqual('2022');
        done();
      }, assertValue);
    });

    fit('Should have defined yearNumber', done => {
      const assertValue = new Date(2022, 9, 22);
      subscribeToExpect(model => {
        expect(model.yearNumber).toEqual(2022);
        done();
      }, assertValue);
    });

    fit('Should have defined time', done => {
      const assertValue = new Date(2022, 9, 22, 21, 37);
      subscribeToExpect(model => {
        expect(model.time).toEqual('21:37');
        done();
      }, assertValue);
    });

    fit('Should have defined short time', done => {
      const assertValue = new Date(2022, 9, 22, 21, 37),
        initModel: IDateTimeValueInitModel = {
          date: true,
          time: true,
          shortTime: true,
          value: new Date(),
          currentValue: new Date(),
          format: DateTimeFormatsConstants.DEFAULT_DATE_TIME_FORMAT,
          locale: DateTimeConstants.DEFAULT_LOCALE,
          disabledDays: []
        };
      subscribeToExpect(model => {
        expect(model.time).toEqual('9:37 PM');
        done();
      }, assertValue, initModel);
    });

    fit('Should have defined time with minutes less than 10', done => {
      const assertValue = new Date(2022, 9, 22, 21, 4);
      subscribeToExpect(model => {
        expect(model.time).toEqual('21:04');
        done();
      }, assertValue);
    });

    fit('Should have defined hour', done => {
      const assertValue = new Date(2022, 9, 22, 21, 37);
      subscribeToExpect(model => {
        expect(model.hour).toEqual(21);
        done();
      }, assertValue);
    });

    fit('Should have defined shortHour', done => {
      const assertValue = new Date(2022, 9, 22, 21, 37);
      subscribeToExpect(model => {
        expect(model.shortHour).toEqual('9');
        done();
      }, assertValue);
    });

    fit('Should have defined prefixHour', done => {
      const assertValue = new Date(2022, 9, 22, 21, 37);
      subscribeToExpect(model => {
        expect(model.prefixHour).toEqual('21');
        done();
      }, assertValue);
    });

    fit('Should have defined minute', done => {
      const assertValue = new Date(2022, 9, 22, 21, 37);
      subscribeToExpect(model => {
        expect(model.minute).toEqual(37);
        done();
      }, assertValue);
    });

    fit('Should have defined period', done => {
      const assertValue = new Date(2022, 9, 22, 21, 37);
      subscribeToExpect(model => {
        expect(model.period).toEqual('PM');
        done();
      }, assertValue);
    });
  });

  describe('Update', () => {
    fit('Should emit model on Date for time', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getMinutes()).toBeGreaterThan(0);
          expect(model.value.getFullYear()).toEqual(2022);
          expect(model.value.getMonth()).toEqual(9);
          expect(model.value.getDate()).toEqual(30);
          done();
        }
      });

      service.update({ type: DateTimeValueActionType.Date, value: new Date(2022, 9, 30) });
    });

    fit('Should emit model on Date without time', done => {
      const initModel: IDateTimeValueInitModel = {
        date: true,
        time: false,
        shortTime: false,
        value: new Date(),
        currentValue: new Date(),
        format: CommonConstants.EMPTY_STRING,
        locale: DateTimeConstants.DEFAULT_LOCALE,
        disabledDays: []
      };
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getMinutes()).toEqual(0);
          expect(model.value.getFullYear()).toEqual(2022);
          expect(model.value.getMonth()).toEqual(9);
          expect(model.value.getDate()).toEqual(30);
          done();
        }
      }, new Date, initModel);

      service.update({ type: DateTimeValueActionType.Date, value: new Date(2022, 9, 30) });
    });

    fit('Should emit model on Hour', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getHours()).toEqual(23);
          done();
        }
      });

      service.update({ type: DateTimeValueActionType.Hour, parameter: 23 });
    });

    fit('Should emit model on Minute', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getMinutes()).toEqual(51);
          done();
        }
      });

      service.update({ type: DateTimeValueActionType.Minute, parameter: 51 });
    });

    fit('Should emit model on Year', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getFullYear()).toEqual(2034);
          done();
        }
      });

      service.update({ type: DateTimeValueActionType.Year, parameter: 2034 });
    });

    fit('Should emit model on MonthAfter', done => {
      const assertValue = new Date(2032, 9, 30);
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getMonth()).toEqual(10);
          done();
        }
      }, assertValue);

      service.update({ type: DateTimeValueActionType.MonthAfter });
    });

    fit('Should emit model on MonthBefore', done => {
      const assertValue = new Date(2032, 9, 30);
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getMonth()).toEqual(8);
          done();
        }
      }, assertValue);

      service.update({ type: DateTimeValueActionType.MonthBefore });
    });

    fit('Should emit model on YearAfter', done => {
      const assertValue = new Date(2032, 9, 30);
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getFullYear()).toEqual(2033);
          done();
        }
      }, assertValue);

      service.update({ type: DateTimeValueActionType.YearAfter });
    });

    fit('Should emit model on YearBefore', done => {
      const assertValue = new Date(2032, 9, 30);
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model.value.getFullYear()).toEqual(2031);
          done();
        }
      }, assertValue);

      service.update({ type: DateTimeValueActionType.YearBefore });
    });
  });

  function subscribeToExpect(expectFunc: (model: IDateTimeValueModel, index: number) => void,
    value: Date = new Date(),
    initModel: IDateTimeValueInitModel = {
      date: true,
      time: true,
      shortTime: false,
      value: new Date(),
      currentValue: new Date(),
      format: CommonConstants.EMPTY_STRING,
      locale: DateTimeConstants.DEFAULT_LOCALE,
      disabledDays: []
    }) {
    initModel.value = value;
    service.init(initModel);

    let index = 0;

    service.value$.subscribe(model => {
      expectFunc(model, index);
      index++;
    });
  }
});
