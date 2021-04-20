import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeassetsFileType } from '../leassets-file-type.model';
import { LeassetsFileTypeService } from '../service/leassets-file-type.service';

@Component({
  templateUrl: './leassets-file-type-delete-dialog.component.html',
})
export class LeassetsFileTypeDeleteDialogComponent {
  leassetsFileType?: ILeassetsFileType;

  constructor(protected leassetsFileTypeService: LeassetsFileTypeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.leassetsFileTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
