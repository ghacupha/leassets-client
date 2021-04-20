import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LeassetsFileMediumTypes } from 'app/entities/enumerations/leassets-file-medium-types.model';
import { LeassetsFileModelType } from 'app/entities/enumerations/leassets-file-model-type.model';
import { ILeassetsFileType, LeassetsFileType } from '../leassets-file-type.model';

import { LeassetsFileTypeService } from './leassets-file-type.service';

describe('Service Tests', () => {
  describe('LeassetsFileType Service', () => {
    let service: LeassetsFileTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: ILeassetsFileType;
    let expectedResult: ILeassetsFileType | ILeassetsFileType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LeassetsFileTypeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        leassetsFileTypeName: 'AAAAAAA',
        leassetsFileMediumType: LeassetsFileMediumTypes.EXCEL,
        description: 'AAAAAAA',
        fileTemplateContentType: 'image/png',
        fileTemplate: 'AAAAAAA',
        leassetsfileType: LeassetsFileModelType.CURRENCY_LIST,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LeassetsFileType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LeassetsFileType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LeassetsFileType', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            leassetsFileTypeName: 'BBBBBB',
            leassetsFileMediumType: 'BBBBBB',
            description: 'BBBBBB',
            fileTemplate: 'BBBBBB',
            leassetsfileType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LeassetsFileType', () => {
        const patchObject = Object.assign(
          {
            leassetsFileTypeName: 'BBBBBB',
            description: 'BBBBBB',
            fileTemplate: 'BBBBBB',
          },
          new LeassetsFileType()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LeassetsFileType', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            leassetsFileTypeName: 'BBBBBB',
            leassetsFileMediumType: 'BBBBBB',
            description: 'BBBBBB',
            fileTemplate: 'BBBBBB',
            leassetsfileType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a LeassetsFileType', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLeassetsFileTypeToCollectionIfMissing', () => {
        it('should add a LeassetsFileType to an empty array', () => {
          const leassetsFileType: ILeassetsFileType = { id: 123 };
          expectedResult = service.addLeassetsFileTypeToCollectionIfMissing([], leassetsFileType);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(leassetsFileType);
        });

        it('should not add a LeassetsFileType to an array that contains it', () => {
          const leassetsFileType: ILeassetsFileType = { id: 123 };
          const leassetsFileTypeCollection: ILeassetsFileType[] = [
            {
              ...leassetsFileType,
            },
            { id: 456 },
          ];
          expectedResult = service.addLeassetsFileTypeToCollectionIfMissing(leassetsFileTypeCollection, leassetsFileType);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a LeassetsFileType to an array that doesn't contain it", () => {
          const leassetsFileType: ILeassetsFileType = { id: 123 };
          const leassetsFileTypeCollection: ILeassetsFileType[] = [{ id: 456 }];
          expectedResult = service.addLeassetsFileTypeToCollectionIfMissing(leassetsFileTypeCollection, leassetsFileType);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(leassetsFileType);
        });

        it('should add only unique LeassetsFileType to an array', () => {
          const leassetsFileTypeArray: ILeassetsFileType[] = [{ id: 123 }, { id: 456 }, { id: 63037 }];
          const leassetsFileTypeCollection: ILeassetsFileType[] = [{ id: 123 }];
          expectedResult = service.addLeassetsFileTypeToCollectionIfMissing(leassetsFileTypeCollection, ...leassetsFileTypeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const leassetsFileType: ILeassetsFileType = { id: 123 };
          const leassetsFileType2: ILeassetsFileType = { id: 456 };
          expectedResult = service.addLeassetsFileTypeToCollectionIfMissing([], leassetsFileType, leassetsFileType2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(leassetsFileType);
          expect(expectedResult).toContain(leassetsFileType2);
        });

        it('should accept null and undefined values', () => {
          const leassetsFileType: ILeassetsFileType = { id: 123 };
          expectedResult = service.addLeassetsFileTypeToCollectionIfMissing([], null, leassetsFileType, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(leassetsFileType);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
