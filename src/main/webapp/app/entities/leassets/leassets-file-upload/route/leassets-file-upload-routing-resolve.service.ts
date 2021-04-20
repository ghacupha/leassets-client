import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILeassetsFileUpload, LeassetsFileUpload } from '../leassets-file-upload.model';
import { LeassetsFileUploadService } from '../service/leassets-file-upload.service';

@Injectable({ providedIn: 'root' })
export class LeassetsFileUploadRoutingResolveService implements Resolve<ILeassetsFileUpload> {
  constructor(protected service: LeassetsFileUploadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILeassetsFileUpload> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((leassetsFileUpload: HttpResponse<LeassetsFileUpload>) => {
          if (leassetsFileUpload.body) {
            return of(leassetsFileUpload.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LeassetsFileUpload());
  }
}
