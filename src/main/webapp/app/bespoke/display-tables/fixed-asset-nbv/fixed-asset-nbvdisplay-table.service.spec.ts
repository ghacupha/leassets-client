import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FixedAssetNBVDisplayTableService } from './fixed-asset-nbvdisplay-table.service';
import { NBVSummary } from 'app/bespoke/display-tables/fixed-asset-nbv/inbvsummary.model';

describe('FixedAssetNetBookValueDisplayTests', () => {
  let service: FixedAssetNBVDisplayTableService;
  let httpMock: HttpTestingController;
  let returnedFromService: NBVSummary;
  let expectedResult: NBVSummary | NBVSummary[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FixedAssetNBVDisplayTableService);
    httpMock = TestBed.inject(HttpTestingController);

    returnedFromService = Object.assign(
      {
        ...new NBVSummary(),
        serviceOutletCode: 'BBBBBB',
        assetCategory: 'BBBBBB',
        netBookValue: 1,
      },
      {
        ...new NBVSummary(),
        serviceOutletCode: 'AAAAAAA',
        assetCategory: 'AAAAAAA',
        netBookValue: 0,
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
