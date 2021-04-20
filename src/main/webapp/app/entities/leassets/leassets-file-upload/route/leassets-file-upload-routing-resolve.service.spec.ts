jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ILeassetsFileUpload, LeassetsFileUpload } from '../leassets-file-upload.model';
import { LeassetsFileUploadService } from '../service/leassets-file-upload.service';

import { LeassetsFileUploadRoutingResolveService } from './leassets-file-upload-routing-resolve.service';

describe('Service Tests', () => {
  describe('LeassetsFileUpload routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: LeassetsFileUploadRoutingResolveService;
    let service: LeassetsFileUploadService;
    let resultLeassetsFileUpload: ILeassetsFileUpload | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(LeassetsFileUploadRoutingResolveService);
      service = TestBed.inject(LeassetsFileUploadService);
      resultLeassetsFileUpload = undefined;
    });

    describe('resolve', () => {
      it('should return ILeassetsFileUpload returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLeassetsFileUpload = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLeassetsFileUpload).toEqual({ id: 123 });
      });

      it('should return new ILeassetsFileUpload if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLeassetsFileUpload = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultLeassetsFileUpload).toEqual(new LeassetsFileUpload());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLeassetsFileUpload = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLeassetsFileUpload).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
