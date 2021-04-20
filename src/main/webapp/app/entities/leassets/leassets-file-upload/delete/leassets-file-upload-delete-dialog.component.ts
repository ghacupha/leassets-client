import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeassetsFileUpload } from '../leassets-file-upload.model';
import { LeassetsFileUploadService } from '../service/leassets-file-upload.service';

@Component({
  templateUrl: './leassets-file-upload-delete-dialog.component.html',
})
export class LeassetsFileUploadDeleteDialogComponent {
  leassetsFileUpload?: ILeassetsFileUpload;

  constructor(protected leassetsFileUploadService: LeassetsFileUploadService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.leassetsFileUploadService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
