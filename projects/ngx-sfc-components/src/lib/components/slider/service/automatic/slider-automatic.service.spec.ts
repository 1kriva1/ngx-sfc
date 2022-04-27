import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { nameof } from 'ngx-sfc-common';
import { SliderMoveType } from '../slider/slider-move-type.enum';
import { SliderService } from '../slider/slider.service';
import { SliderAutomaticService } from './slider-automatic.service';

describe('Service: SliderService', () => {
    let service: SliderAutomaticService;
    let sliderServiceSpy: jasmine.SpyObj<SliderService>;

    beforeEach(() => {
        sliderServiceSpy = jasmine.createSpyObj('SliderService', ['move']);

        TestBed.configureTestingModule({
            providers: [{ provide: SliderService, useValue: sliderServiceSpy }, SliderAutomaticService]
        });
        service = TestBed.inject(SliderAutomaticService);
    });

    describe('General', () => {
        fit('Should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('Pause', () => {
        fit('Should pause equal true by default', () => {
            expect(service.pause).toBeTrue();
        });

        fit('Should pause equal false after start', () => {
            service.start();

            expect(service.pause).toBeFalse();
        });

        fit('Should pause equal false after toggle', () => {
            service.toggle();

            expect(service.pause).toBeFalse();
        });

        fit('Should pause equal true after toggle', () => {
            service.start();
            service.toggle();

            expect(service.pause).toBeTrue();
        });
    });

    describe('Start', () => {
        fit('Should call stop method', () => {
            spyOn<any>(service, nameof<SliderAutomaticService>('stop'));

            service.start();

            service.start();

            expect(service.stop).toHaveBeenCalledTimes(1);
        });

        fit('Should not call stop method', () => {
            spyOn<any>(service, nameof<SliderAutomaticService>('stop'));

            service.start();

            expect(service.stop).not.toHaveBeenCalled();
        });

        fit('Should call move method of Slider service', fakeAsync(() => {
            spyOn<any>(service, nameof<SliderAutomaticService>('stop'));

            service.start();

            tick(3000);

            expect(sliderServiceSpy.move).toHaveBeenCalledOnceWith(SliderMoveType.Next);

            discardPeriodicTasks();
        }));

        fit('Should call move method of Slider service 3 times', fakeAsync(() => {
            spyOn<any>(service, nameof<SliderAutomaticService>('stop'));

            service.start();

            tick(9000);

            expect(sliderServiceSpy.move).toHaveBeenCalledTimes(3);

            discardPeriodicTasks();
        }));
    });

    describe('Toggle', () => {
        fit('Should call start method', () => {
            spyOn<any>(service, nameof<SliderAutomaticService>('start'));

            service.toggle();

            expect(service.start).toHaveBeenCalledTimes(1);
        });

        fit('Should call stop method', () => {
            spyOn<any>(service, nameof<SliderAutomaticService>('stop'));

            service.start();

            service.toggle();

            expect(service.stop).toHaveBeenCalledTimes(1);
        });
    });
});
