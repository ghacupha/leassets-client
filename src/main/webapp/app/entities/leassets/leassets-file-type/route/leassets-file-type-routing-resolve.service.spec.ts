jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ILeassetsFileType, LeassetsFileType } from '../leassets-file-type.model';
import { LeassetsFileTypeService } from '../service/leassets-file-type.service';

import { LeassetsFileTypeRoutingResolveService } from './leassets-file-type-routing-resolve.service';

describe('Service Tests', () => {
  describe('LeassetsFileType routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: LeassetsFileTypeRoutingResolveService;
    let service: LeassetsFileTypeService;
    let resultLeassetsFileType: ILeassetsFileType | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(LeassetsFileTypeRoutingResolveService);
      service = TestBed.inject(LeassetsFileTypeService);
      resultLeassetsFileType = undefined;
    });

    describe('resolve', () => {
      it('should return ILeassetsFileType returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLeassetsFileType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLeassetsFileType).toEqual({ id: 123 });
      });

      it('should return new ILeassetsFileType if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLeassetsFileType = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultLeassetsFileType).toEqual(new LeassetsFileType());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLeassetsFileType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLeassetsFileType).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
