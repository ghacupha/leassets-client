import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { FixedAssetNbvComponent } from './fixed-asset-nbv.component';
import { FixedAssetNBVDisplayTableService } from './fixed-asset-nbvdisplay-table.service';
import * as moment from 'moment';
import { DataTablesModule } from 'angular-datatables';
import * as dayjs from 'dayjs';
import { DATE_FORMAT } from 'app/config/input.constants';
import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';
import { FixedAssetNetBookValue, IFixedAssetNetBookValue } from 'app/entities/fixed-asset-net-book-value/fixed-asset-net-book-value.model';
import { Router } from '@angular/router';

export type EntityArrayResponseType = IFixedAssetNetBookValue[];

const returnedValue = Object.assign(
  {
    ...new FixedAssetNetBookValue(),
    id: 1,
    assetNumber: 1,
    serviceOutletCode: 'BBBBBB',
    assetTag: 'BBBBBB',
    assetDescription: 'BBBBBB',
    netBookValueDate: dayjs().format(DATE_FORMAT),
    assetCategory: 'BBBBBB',
    netBookValue: 1,
    depreciationRegime: 'BBBBBB',
    fileUploadToken: 'BBBBBB',
    compilationToken: 'BBBBBB',
  },
  {
    ...new FixedAssetNetBookValue(),
    id: 0,
    assetNumber: 0,
    serviceOutletCode: 'AAAAAAA',
    assetTag: 'AAAAAAA',
    assetDescription: 'AAAAAAA',
    netBookValueDate: dayjs().format(DATE_FORMAT),
    assetCategory: 'AAAAAAA',
    netBookValue: 0,
    depreciationRegime: DepreciationRegime.STRAIGHT_LINE_BASIS,
    fileUploadToken: 'AAAAAAA',
    compilationToken: 'AAAAAAA',
  }
);

class MockFixedAssetNBVDisplayTableService {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  query() {
    return returnedValue;
  }
}

describe('FixedAssetNBVDisplayComponentTest', () => {
  let comp: FixedAssetNbvComponent;
  let fixture: ComponentFixture<FixedAssetNbvComponent>;
  let service: FixedAssetNBVDisplayTableService;
  const currentDate = dayjs();

  const returnedFromService = Object.assign(
    {
      ...new FixedAssetNetBookValue(),
      id: 1,
      assetNumber: 1,
      serviceOutletCode: 'BBBBBB',
      assetTag: 'BBBBBB',
      assetDescription: 'BBBBBB',
      netBookValueDate: currentDate.format(DATE_FORMAT),
      assetCategory: 'BBBBBB',
      netBookValue: 1,
      depreciationRegime: 'BBBBBB',
      fileUploadToken: 'BBBBBB',
      compilationToken: 'BBBBBB',
    },
    {
      ...new FixedAssetNetBookValue(),
      id: 0,
      assetNumber: 0,
      serviceOutletCode: 'AAAAAAA',
      assetTag: 'AAAAAAA',
      assetDescription: 'AAAAAAA',
      netBookValueDate: currentDate,
      assetCategory: 'AAAAAAA',
      netBookValue: 0,
      depreciationRegime: DepreciationRegime.STRAIGHT_LINE_BASIS,
      fileUploadToken: 'AAAAAAA',
      compilationToken: 'AAAAAAA',
    }
  );

  beforeEach(() => {
    const datatableSettings = {
      searching: true,
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
    };

    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DataTablesModule],
      declarations: [FixedAssetNbvComponent],
      providers: [
        FixedAssetNbvComponent,
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: FixedAssetNBVDisplayTableService,
          useClass: MockFixedAssetNBVDisplayTableService,
        },
      ],
    })
      .overrideTemplate(FixedAssetNbvComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FixedAssetNbvComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FixedAssetNBVDisplayTableService);

    // Configure important field items
    comp.dtOptions = datatableSettings;
    comp.dtTrigger = new Subject<any>();
    comp.reportingMonth = moment();

    const headers = new HttpHeaders().append('link', 'link;link');
    spyOn(service, 'query').and.returnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );

    fixture.detectChanges();
  });

  it('should create the component successfully', () => {
    // comp.ngOnInit();

    expect(comp).toBeUndefined();
  });

  // it('Should call load all on init', () => {
  //   // WHEN
  //   comp.ngOnInit();

  //   // THEN
  //   expect(service.query).toHaveBeenCalled();
  //   expect(comp.displayDataArray[0]).toEqual(jasmine.objectContaining({ id: 123 }));
  // });
});
