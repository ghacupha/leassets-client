import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { LeassetsFileTypeComponent } from './list/leassets-file-type.component';
import { LeassetsFileTypeDetailComponent } from './detail/leassets-file-type-detail.component';
import { LeassetsFileTypeUpdateComponent } from './update/leassets-file-type-update.component';
import { LeassetsFileTypeDeleteDialogComponent } from './delete/leassets-file-type-delete-dialog.component';
import { LeassetsFileTypeRoutingModule } from './route/leassets-file-type-routing.module';

@NgModule({
  imports: [SharedModule, LeassetsFileTypeRoutingModule],
  declarations: [
    LeassetsFileTypeComponent,
    LeassetsFileTypeDetailComponent,
    LeassetsFileTypeUpdateComponent,
    LeassetsFileTypeDeleteDialogComponent,
  ],
  entryComponents: [LeassetsFileTypeDeleteDialogComponent],
})
export class LeassetsFileTypeModule {}
