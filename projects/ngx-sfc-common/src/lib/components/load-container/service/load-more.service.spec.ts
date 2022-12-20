import { TestBed } from '@angular/core/testing';
import { LoadMoreService } from './load-more.service';

describe('Service: LoadMore', () => {
    let service: LoadMoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoadMoreService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should have constant value for start page', () => {
        expect(service.START_PAGE).toEqual(1);
    });

    fit('Should be defined more observable', () => {
        expect(service.more$).toBeTruthy();
    });

    fit('Should emit on more', done => {
        service.more$.subscribe((event: any) => {
            expect(event).toEqual(2);
            done();        
        });

        service.more();
    });

    fit('Should increase page on more', done => {
        let page = service.START_PAGE;

        service.more$.subscribe((event: any) => {
            expect(event).toEqual(page + 1);            
        });

        service.more();

        page += 1;

        service.more();

        page += 1;

        service.more();

        done();
    });

    fit('Should reset page', done => {
        let page = service.START_PAGE;

        service.more$.subscribe((event: any) => {
            expect(event).toEqual(page + 1);
        });

        service.more();

        page += 1;

        service.reset();

        page = service.START_PAGE;

        service.more();

        done();
    });
});
