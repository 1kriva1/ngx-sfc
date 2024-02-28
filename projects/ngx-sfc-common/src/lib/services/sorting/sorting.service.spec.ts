import { TestBed } from '@angular/core/testing';
import { SortingDirection } from '../../enums/sorting-direction.enum';
import { ISortingModel } from './sorting.model';
import { SortingService } from './sorting.service';

describe('Service: Sorting', () => {
    let service: SortingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SortingService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should be defined open observable', () => {
        expect(service.sorting$).toBeTruthy();
    });

    fit('Should emit on open', done => {
        const assertModel: ISortingModel = { id: 'id', direction: SortingDirection.Ascending };

        service.sorting$.subscribe((event: any) => {
            expect(event).toEqual(assertModel);
            done();
        });

        service.sort(assertModel);
    });
});
