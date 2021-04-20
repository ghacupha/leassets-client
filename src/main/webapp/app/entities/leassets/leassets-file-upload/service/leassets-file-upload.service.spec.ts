import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILeassetsFileUpload, LeassetsFileUpload } from '../leassets-file-upload.model';

import { LeassetsFileUploadService } from './leassets-file-upload.service';

describe('Service Tests', () => {
  describe('LeassetsFileUpload Service', () => {
    let service: LeassetsFileUploadService;
    let httpMock: HttpTestingController;
    let elemDefault: ILeassetsFileUpload;
    let expectedResult: ILeassetsFileUpload | ILeassetsFileUpload[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LeassetsFileUploadService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        description: 'AAAAAAA',
        fileName: 'AAAAAAA',
        periodFrom: currentDate,
        periodTo: currentDate,
        leassetsFileTypeId: 0,
        dataFileContentType: 'image/png',
        dataFile: 'AAAAAAA',
        uploadSuccessful: false,
        uploadProcessed: false,
        uploadToken: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            periodFrom: currentDate.format(DATE_FORMAT),
            periodTo: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LeassetsFileUpload', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            periodFrom: currentDate.format(DATE_FORMAT),
            periodTo: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            periodFrom: currentDate,
            periodTo: currentDate,
          },
          returnedFromService
        );

        service.create(new LeassetsFileUpload()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LeassetsFileUpload', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            description: 'BBBBBB',
            fileName: 'BBBBBB',
            periodFrom: currentDate.format(DATE_FORMAT),
            periodTo: currentDate.format(DATE_FORMAT),
            leassetsFileTypeId: 1,
            dataFile: 'BBBBBB',
            uploadSuccessful: true,
            uploadProcessed: true,
            uploadToken: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            periodFrom: currentDate,
            periodTo: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LeassetsFileUpload', () => {
        const patchObject = Object.assign(
          {
            description: 'BBBBBB',
            fileName: 'BBBBBB',
            periodTo: currentDate.format(DATE_FORMAT),
            leassetsFileTypeId: 1,
            uploadProcessed: true,
          },
          new LeassetsFileUpload()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            periodFrom: currentDate,
            periodTo: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LeassetsFileUpload', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            description: 'BBBBBB',
            fileName: 'BBBBBB',
            periodFrom: currentDate.format(DATE_FORMAT),
            periodTo: currentDate.format(DATE_FORMAT),
            leassetsFileTypeId: 1,
            dataFile: 'BBBBBB',
            uploadSuccessful: true,
            uploadProcessed: true,
            uploadToken: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            periodFrom: currentDate,
            periodTo: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a LeassetsFileUpload', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLeassetsFileUploadToCollectionIfMissing', () => {
        it('should add a LeassetsFileUpload to an empty array', () => {
          const leassetsFileUpload: ILeassetsFileUpload = { id: 123 };
          expectedResult = service.addLeassetsFileUploadToCollectionIfMissing([], leassetsFileUpload);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(leassetsFileUpload);
        });

        it('should not add a LeassetsFileUpload to an array that contains it', () => {
          const leassetsFileUpload: ILeassetsFileUpload = { id: 123 };
          const leassetsFileUploadCollection: ILeassetsFileUpload[] = [
            {
              ...leassetsFileUpload,
            },
            { id: 456 },
          ];
          expectedResult = service.addLeassetsFileUploadToCollectionIfMissing(leassetsFileUploadCollection, leassetsFileUpload);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a LeassetsFileUpload to an array that doesn't contain it", () => {
          const leassetsFileUpload: ILeassetsFileUpload = { id: 123 };
          const leassetsFileUploadCollection: ILeassetsFileUpload[] = [{ id: 456 }];
          expectedResult = service.addLeassetsFileUploadToCollectionIfMissing(leassetsFileUploadCollection, leassetsFileUpload);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(leassetsFileUpload);
        });

        it('should add only unique LeassetsFileUpload to an array', () => {
          const leassetsFileUploadArray: ILeassetsFileUpload[] = [{ id: 123 }, { id: 456 }, { id: 90761 }];
          const leassetsFileUploadCollection: ILeassetsFileUpload[] = [{ id: 123 }];
          expectedResult = service.addLeassetsFileUploadToCollectionIfMissing(leassetsFileUploadCollection, ...leassetsFileUploadArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const leassetsFileUpload: ILeassetsFileUpload = { id: 123 };
          const leassetsFileUpload2: ILeassetsFileUpload = { id: 456 };
          expectedResult = service.addLeassetsFileUploadToCollectionIfMissing([], leassetsFileUpload, leassetsFileUpload2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(leassetsFileUpload);
          expect(expectedResult).toContain(leassetsFileUpload2);
        });

        it('should accept null and undefined values', () => {
          const leassetsFileUpload: ILeassetsFileUpload = { id: 123 };
          expectedResult = service.addLeassetsFileUploadToCollectionIfMissing([], null, leassetsFileUpload, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(leassetsFileUpload);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
