import { TestBed } from '@angular/core/testing';
import { DateTimeView } from '../../datetime-input-view.enum';
import { DateTimeViewService } from './datetime-view.service';
import { DateTimeState } from './enums/datetime-state.enum';
import { DateTimeViewActionType } from './enums/datetime-view.enum';
import { IDateTimeViewInitModel } from './models/datetime-view-init.model';
import { IDateTimeViewModel } from './models/datetime-view.model';

describe('Service: DateTimeView', () => {
  let service: DateTimeViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeViewService]
    });
    service = TestBed.inject(DateTimeViewService);
  });

  describe('General', () => {
    fit('Should be created', () => {
      expect(service).toBeTruthy();
    });

    fit('Should return default view', () => {
      expect(service.view).toEqual(DateTimeView.Calendar);
    });

    fit('Should view observable be undefined by default', () => {
      expect(service.view$).toBeUndefined();
    });
  });

  describe('Init', () => {
    fit('Should view observable has value', () => {
      service.init();
      expect(service.view$).toBeTruthy();
    });

    fit('Should emit default model', done => {
      subscribeToExpect(model => {
        expect(model).toEqual({
          currentView: DateTimeView.Calendar,
          previousView: null,
          state: DateTimeState.Undefined,
          event: undefined
        });

        done();
      });
    });

    fit('Should emit model for time only', done => {
      subscribeToExpect(model => {
        expect(model).toEqual({
          currentView: DateTimeView.Hours,
          previousView: null,
          state: DateTimeState.Undefined,
          event: undefined
        });
        done();
      }, { date: false, time: true });
    });

    fit('Should emit model for years', done => {
      subscribeToExpect(model => {
        expect(model).toEqual({
          currentView: DateTimeView.Years,
          previousView: null,
          state: DateTimeState.Undefined,
          event: undefined
        });
        done();
      }, { date: false, time: false });
    });
  });

  describe('Update', () => {
    fit('Should emit model on Date for time', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: DateTimeView.Hours,
            previousView: null,
            state: DateTimeState.Undefined,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Date });
    });

    fit('Should emit model on Date for not time', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: DateTimeView.Calendar,
            previousView: null,
            state: DateTimeState.Update,
            event: undefined
          });
          done();
        }
      }, { time: false, date: true });

      service.update({ type: DateTimeViewActionType.Date });
    });

    fit('Should emit model on Hour', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: DateTimeView.Minutes,
            previousView: null,
            state: DateTimeState.Undefined,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Hour });
    });

    fit('Should emit model on Minute for date', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: DateTimeView.Calendar,
            previousView: null,
            state: DateTimeState.Update,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Minute });
    });

    fit('Should emit model on Minute not for date', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: DateTimeView.Hours,
            previousView: null,
            state: DateTimeState.Update,
            event: undefined
          });
          done();
        }
      }, { time: true, date: false });

      service.update({ type: DateTimeViewActionType.Minute });
    });


    fit('Should emit model on Year', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: null as any,
            previousView: null,
            state: DateTimeState.Undefined,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Year });
    });

    fit('Should emit model on Year with previous view', done => {
      subscribeToExpect((model, index) => {
        if (index > 1) {
          expect(model).toEqual({
            currentView: DateTimeView.Calendar,
            previousView: DateTimeView.Calendar,
            state: DateTimeState.Undefined,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Years });

      service.update({ type: DateTimeViewActionType.Year });
    });

    fit('Should emit model on Years for years', done => {
      subscribeToExpect((model, index) => {
        if (index > 1) {
          expect(model).toEqual({
            currentView: DateTimeView.Calendar,
            previousView: DateTimeView.Calendar,
            state: DateTimeState.Undefined,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Years });

      service.update({ type: DateTimeViewActionType.Years });
    });

    fit('Should emit model on Years not for years', done => {
      subscribeToExpect((model, index) => {
        if (index > 1) {
          expect(model).toEqual({
            currentView: DateTimeView.Years,
            previousView: DateTimeView.Hours,
            state: DateTimeState.Undefined,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Date });

      service.update({ type: DateTimeViewActionType.Years });
    });

    fit('Should emit model on RefreshState', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: DateTimeView.Calendar,
            previousView: null,
            state: DateTimeState.Undefined,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.RefreshState });
    });

    fit('Should emit model on Hide', done => {
      subscribeToExpect((model, index) => {
        if (index > 0) {
          expect(model).toEqual({
            currentView: DateTimeView.Calendar,
            previousView: null,
            state: DateTimeState.Hide,
            event: undefined
          });
          done();
        }
      });

      service.update({ type: DateTimeViewActionType.Hide });
    });

    describe('OK', () => {
      fit('Should emit model on Ok for calendar view', done => {
        subscribeToExpect((model, index) => {
          if (index > 0) {
            expect(model).toEqual({
              currentView: DateTimeView.Hours,
              previousView: null,
              state: DateTimeState.Undefined,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Ok });
      });

      fit('Should emit model on Ok for hour view', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: DateTimeView.Minutes,
              previousView: null,
              state: DateTimeState.Undefined,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Date });

        service.update({ type: DateTimeViewActionType.Ok });
      });

      fit('Should emit model on Ok for minute view', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: DateTimeView.Calendar,
              previousView: null,
              state: DateTimeState.Update,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Hour });

        service.update({ type: DateTimeViewActionType.Ok });
      });

      fit('Should emit model on Ok for years', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: DateTimeView.Calendar,
              previousView: DateTimeView.Calendar,
              state: DateTimeState.Undefined,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Years });

        service.update({ type: DateTimeViewActionType.Ok });
      });

      fit('Should emit model on Ok for not defined current view', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: null as unknown as any,
              previousView: null,
              state: DateTimeState.Update,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Year });

        service.update({ type: DateTimeViewActionType.Ok });
      });
    });

    describe('Cancel', () => {
      fit('Should emit model on Cancel for calendar view', done => {
        subscribeToExpect((model, index) => {
          if (index > 0) {
            expect(model).toEqual({
              currentView: DateTimeView.Calendar,
              previousView: null,
              state: DateTimeState.Hide,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Cancel });
      });

      fit('Should emit model on Cancel for hour view with date', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: DateTimeView.Calendar,
              previousView: null,
              state: DateTimeState.Undefined,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Date });

        service.update({ type: DateTimeViewActionType.Cancel });
      });

      fit('Should emit model on Cancel for hour view without date', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: DateTimeView.Hours,
              previousView: null,
              state: DateTimeState.Hide,
              event: undefined
            });
            done();
          }
        }, { date: false, time: true });

        service.update({ type: DateTimeViewActionType.Date });

        service.update({ type: DateTimeViewActionType.Cancel });
      });

      fit('Should emit model on Cancel for minute view', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: DateTimeView.Hours,
              previousView: null,
              state: DateTimeState.Undefined,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Hour });

        service.update({ type: DateTimeViewActionType.Cancel });
      });

      fit('Should emit model on Cancel for years view', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: DateTimeView.Calendar,
              previousView: DateTimeView.Calendar,
              state: DateTimeState.Undefined,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Years });

        service.update({ type: DateTimeViewActionType.Cancel });
      });

      fit('Should emit model on Cancel for not defined current view', done => {
        subscribeToExpect((model, index) => {
          if (index > 1) {
            expect(model).toEqual({
              currentView: null as unknown as any,
              previousView: null,
              state: DateTimeState.Hide,
              event: undefined
            });
            done();
          }
        });

        service.update({ type: DateTimeViewActionType.Year });

        service.update({ type: DateTimeViewActionType.Cancel });
      });
    });
  });

  function subscribeToExpect(expectFunc: (model: IDateTimeViewModel, index: number) => void,
    initModel: IDateTimeViewInitModel = { date: true, time: true }) {
    service.init(initModel);

    let index = 0;

    service.view$.subscribe(model => {
      expectFunc(model, index);
      index++;
    });
  }
});
