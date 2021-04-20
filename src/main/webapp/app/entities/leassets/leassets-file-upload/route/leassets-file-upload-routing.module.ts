import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LeassetsFileUploadComponent } from '../list/leassets-file-upload.component';
import { LeassetsFileUploadDetailComponent } from '../detail/leassets-file-upload-detail.component';
import { LeassetsFileUploadUpdateComponent } from '../update/leassets-file-upload-update.component';
import { LeassetsFileUploadRoutingResolveService } from './leassets-file-upload-routing-resolve.service';

const leassetsFileUploadRoute: Routes = [
  {
    path: '',
    component: LeassetsFileUploadComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LeassetsFileUploadDetailComponent,
    resolve: {
      leassetsFileUpload: LeassetsFileUploadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LeassetsFileUploadUpdateComponent,
    resolve: {
      leassetsFileUpload: LeassetsFileUploadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LeassetsFileUploadUpdateComponent,
    resolve: {
      leassetsFileUpload: LeassetsFileUploadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(leassetsFileUploadRoute)],
  exports: [RouterModule],
})
export class LeassetsFileUploadRoutingModule {}
