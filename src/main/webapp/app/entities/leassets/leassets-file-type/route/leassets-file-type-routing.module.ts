import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LeassetsFileTypeComponent } from '../list/leassets-file-type.component';
import { LeassetsFileTypeDetailComponent } from '../detail/leassets-file-type-detail.component';
import { LeassetsFileTypeUpdateComponent } from '../update/leassets-file-type-update.component';
import { LeassetsFileTypeRoutingResolveService } from './leassets-file-type-routing-resolve.service';

const leassetsFileTypeRoute: Routes = [
  {
    path: '',
    component: LeassetsFileTypeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LeassetsFileTypeDetailComponent,
    resolve: {
      leassetsFileType: LeassetsFileTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LeassetsFileTypeUpdateComponent,
    resolve: {
      leassetsFileType: LeassetsFileTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LeassetsFileTypeUpdateComponent,
    resolve: {
      leassetsFileType: LeassetsFileTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(leassetsFileTypeRoute)],
  exports: [RouterModule],
})
export class LeassetsFileTypeRoutingModule {}
