import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILeassetsFileType, LeassetsFileType } from '../leassets-file-type.model';
import { LeassetsFileTypeService } from '../service/leassets-file-type.service';

@Injectable({ providedIn: 'root' })
export class LeassetsFileTypeRoutingResolveService implements Resolve<ILeassetsFileType> {
  constructor(protected service: LeassetsFileTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILeassetsFileType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((leassetsFileType: HttpResponse<LeassetsFileType>) => {
          if (leassetsFileType.body) {
            return of(leassetsFileType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LeassetsFileType());
  }
}
