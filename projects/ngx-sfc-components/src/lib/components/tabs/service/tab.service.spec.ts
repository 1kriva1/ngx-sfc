import { TestBed } from '@angular/core/testing';
import { TabService } from './tab.service';

describe('Service: Tab', () => {
    let service: TabService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TabService]
        });
        service = TestBed.inject(TabService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should be defined selected observable', () => {
        expect(service.selected$).toBeTruthy();
    });

    fit('Should emit on select', done => {
        const indexAssert = 100;

        service.selected$.subscribe((event: number) => {
            expect(event).toEqual(indexAssert);
            done();
        });

        service.select(indexAssert);
    });
});
