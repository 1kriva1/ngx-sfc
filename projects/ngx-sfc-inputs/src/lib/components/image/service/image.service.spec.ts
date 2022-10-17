import { TestBed } from '@angular/core/testing';
import { IImageExportEvent } from './image-export.event';
import { ImageService } from './image.service';

describe('Service: Image', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService]
    });
    service = TestBed.inject(ImageService);
  });

  fit('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('File', () => {
    fit('Should to be undefined', () => {
      expect(service.imageFile).toBeUndefined();
    });

    fit('Should not to be undefined', () => {
      service.imageFile = new File([], 'test.png');

      expect(service.imageFile).toBeTruthy();
    });
  });

  describe('Crop', () => {
    fit('Should be defined crop observable', () => {
      expect(service.crop$).toBeTruthy();
    });

    fit('Should emit on crop', done => {
      service.crop$.subscribe(() => {
        expect(true).toBeTrue();
        done();
      });

      service.crop();
    });

  });

  describe('Export', () => {
    fit('Should be defined export observable', () => {
      expect(service.export$).toBeTruthy();
    });

    fit('Should emit on export', done => {
      const eventAssert: IImageExportEvent = { file: new File([], 'test.png'), base64: 'base_64' };

      service.export$.subscribe((event: IImageExportEvent) => {
        expect(event).toEqual(eventAssert);
        done();
      });

      service.export(eventAssert);
    });
  });
});
