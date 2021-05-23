/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { FixedAssetNbvComponent } from './fixed-asset-nbv.component';
import { FixedAssetNBVDisplayTableService } from './fixed-asset-nbvdisplay-table.service';
import * as moment from 'moment';
import { DataTablesModule } from 'angular-datatables';
import * as dayjs from 'dayjs';
import { DATE_FORMAT } from 'app/config/input.constants';
import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';
import { FixedAssetNetBookValue, IFixedAssetNetBookValue } from 'app/entities/fixed-asset-net-book-value/fixed-asset-net-book-value.model';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { RouteStateService } from 'app/bespoke/route-state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule } from '@angular/core';
import { NBVSummary } from 'app/bespoke/display-tables/fixed-asset-nbv/inbvsummary.model';
import { FixedAssetNBVSummaryService } from 'app/bespoke/display-tables/fixed-asset-nbv/fixed-asset-nbv-summary.service';

export type EntityArrayResponseType = NBVSummary[];
const ROUTER_NAV_PATH = 'fixed-asset-net-book-value';

/**
 * Fake values returned by the list-service into the component
 */
const returnedValue = [
  {
    ...new FixedAssetNetBookValue(),
    // id: 123,
    // assetNumber: 1,
    serviceOutletCode: 'BBBBBB',
    // assetTag: 'BBBBBB',
    // assetDescription: 'BBBBBB',
    // netBookValueDate: dayjs().format(DATE_FORMAT),
    assetCategory: 'BBBBBB',
    netBookValue: 1,
    // depreciationRegime: 'BBBBBB',
    // fileUploadToken: 'BBBBBB',
    // compilationToken: 'BBBBBB',
  },
  {
    ...new FixedAssetNetBookValue(),
    // id: 0,
    // assetNumber: 0,
    serviceOutletCode: 'AAAAAAA',
    // assetTag: 'AAAAAAA',
    // assetDescription: 'AAAAAAA',
    // netBookValueDate: dayjs().format(DATE_FORMAT),
    assetCategory: 'AAAAAAA',
    netBookValue: 0,
    // depreciationRegime: DepreciationRegime.STRAIGHT_LINE_BASIS,
    // fileUploadToken: 'AAAAAAA',
    // compilationToken: 'AAAAAAA',
  },
];

const nbv_entries: NBVSummary[] = [
  { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 1000 },
  { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 1000 },
  { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 1000 },
  { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
  { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
  { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
  { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 3000 },
  { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
  { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
  { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
  { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 2000 },
  { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 4000 },
  { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 4000 },
  { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 4000 },
];

const expected_nbv_entries: NBVSummary[] = [
  { serviceOutletCode: 'AAA', assetCategory: 'CC', netBookValue: 3000 },
  { serviceOutletCode: 'AAA', assetCategory: 'dd', netBookValue: 12000 },
  { serviceOutletCode: 'BBB', assetCategory: 'CC', netBookValue: 8000 },
  { serviceOutletCode: 'AAA', assetCategory: 'ee', netBookValue: 12000 },
];

/**
 * Mock service for returning a list of values from the backend into the
 * component
 */
class MockFixedAssetNBVDisplayTableService {
  query(): Observable<EntityArrayResponseType> {
    return new Observable(() => {
      returnedValue;
    });
  }
}

/**
 * Simple do-nothing mock for the NGXLogger
 */
class LoggerMock {
  debug(): void {}
  info(): void {}
  error(): void {}
}

/**
 * Mock for the route state service as used in the component
 */
class RouteStateServiceMock {
  data: { reportingPeriod: moment.Moment } = { reportingPeriod: moment() };
  reset(): void {
    this.data.reportingPeriod = moment();
  }
}

/**
 * Mock for navigation object create on-error
 */
class NavigationMock {
  then(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

/**
 * Random do-nothing module to represent DataTablesModule since the actual implementation
 * just doesn't work
 */
@NgModule({})
class DataTablesMockModule {}

describe('FixedAssetNBVDisplayComponentTest', () => {
  let comp: FixedAssetNbvComponent;
  let fixture: ComponentFixture<FixedAssetNbvComponent>;
  let service: FixedAssetNBVDisplayTableService;
  let summaryService: FixedAssetNBVSummaryService;
  // let mockRouter;

  const returnedFromService = Object.assign(returnedValue);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FixedAssetNbvComponent],
      providers: [
        FixedAssetNbvComponent,
        {
          provide: DataTablesModule,
          useClass: DataTablesMockModule,
        },
        {
          provide: NGXLogger,
          useClass: LoggerMock,
        },
        {
          provide: FixedAssetNBVDisplayTableService,
          useClass: MockFixedAssetNBVDisplayTableService,
        },
        {
          provide: RouteStateService,
          useClass: RouteStateServiceMock,
        },
      ],
    })
      .overrideTemplate(FixedAssetNbvComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FixedAssetNbvComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FixedAssetNBVDisplayTableService);
    summaryService = TestBed.inject(FixedAssetNBVSummaryService);

    const headers = new HttpHeaders().append('link', 'link;link');
    spyOn(service, 'query').and.returnValue(
      of(
        new HttpResponse({
          body: [returnedFromService],
          headers,
        })
      )
    );

    spyOn(summaryService, 'summarize').and.returnValue(expected_nbv_entries);

    fixture.detectChanges();
  });

  describe('FixedAssetNBVDisplayComponentTest-creation', () => {
    it('should create the component successfully', () => {
      comp.ngOnInit();
      expect(comp).toBeDefined();
    });
  });

  describe('FixedAssetNBVDisplayComponentTest-data', () => {
    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(summaryService.summarize).toHaveBeenCalled();

      const serviceValues = summaryService.summarize(Object.assign(returnedFromService));

      expect(comp.displayDataArray).toEqual(jasmine.objectContaining(serviceValues));
    });
  });

  describe('FixedAssetNBVDisplayComponentTest-on-error', () => {
    it('Should navigate to fixed-asset-net-book-value on error', () => {
      const router: Router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigate').and.returnValue(new NavigationMock());

      comp.onError('Fake error');

      expect(navigateSpy).toHaveBeenCalledWith([ROUTER_NAV_PATH]);
    });
  });
});
