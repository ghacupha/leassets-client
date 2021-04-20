import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { LeassetsFileUploadComponent } from './list/leassets-file-upload.component';
import { LeassetsFileUploadDetailComponent } from './detail/leassets-file-upload-detail.component';
import { LeassetsFileUploadUpdateComponent } from './update/leassets-file-upload-update.component';
import { LeassetsFileUploadDeleteDialogComponent } from './delete/leassets-file-upload-delete-dialog.component';
import { LeassetsFileUploadRoutingModule } from './route/leassets-file-upload-routing.module';

@NgModule({
  imports: [SharedModule, LeassetsFileUploadRoutingModule],
  declarations: [
    LeassetsFileUploadComponent,
    LeassetsFileUploadDetailComponent,
    LeassetsFileUploadUpdateComponent,
    LeassetsFileUploadDeleteDialogComponent,
  ],
  entryComponents: [LeassetsFileUploadDeleteDialogComponent],
})
export class LeassetsFileUploadModule {}
