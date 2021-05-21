import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DATE_FORMAT } from 'app/config/input.constants';
import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';
import { IFixedAssetNetBookValue } from 'app/entities/fixed-asset-net-book-value/fixed-asset-net-book-value.model';
import * as dayjs from 'dayjs';

import { FixedAssetNBVDisplayTableService } from './fixed-asset-nbvdisplay-table.service';
import { NBVSummary } from 'app/bespoke/display-tables/fixed-asset-nbv/inbvsummary.model';

describe('FixedAssetNetBookValueDisplayTests', () => {
  let service: FixedAssetNBVDisplayTableService;
  let httpMock: HttpTestingController;
  let returnedFromService: NBVSummary;
  let expectedResult: NBVSummary | NBVSummary[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FixedAssetNBVDisplayTableService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    returnedFromService = Object.assign(
      {
        // id: 1,
        // assetNumber: 1,
        serviceOutletCode: 'BBBBBB',
        // assetTag: 'BBBBBB',
        // assetDescription: 'BBBBBB',
        // netBookValueDate: currentDate.format(DATE_FORMAT),
        assetCategory: 'BBBBBB',
        netBookValue: 1,
        // depreciationRegime: 'BBBBBB',
        // fileUploadToken: 'BBBBBB',
        // compilationToken: 'BBBBBB',
      },
      {
        // id: 0,
        // assetNumber: 0,
        serviceOutletCode: 'AAAAAAA',
        // assetTag: 'AAAAAAA',
        // assetDescription: 'AAAAAAA',
        // netBookValueDate: currentDate,
        assetCategory: 'AAAAAAA',
        netBookValue: 0,
        // depreciationRegime: DepreciationRegime.STRAIGHT_LINE_BASIS,
        // fileUploadToken: 'AAAAAAA',
        // compilationToken: 'AAAAAAA',
      }
    );
  });

  it('should return a list of FixedAssetNetBookValue', () => {
    const expected = Object.assign(returnedFromService);

    service.query().subscribe(resp => (expectedResult = resp.body));

    const req = httpMock.expectOne({ method: 'GET' });
    req.flush([returnedFromService]);
    httpMock.verify();
    expect(expectedResult).toContainEqual(expected);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
