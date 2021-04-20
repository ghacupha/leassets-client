import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILeassetsFileUpload } from '../leassets-file-upload.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'gha-leassets-file-upload-detail',
  templateUrl: './leassets-file-upload-detail.component.html',
})
export class LeassetsFileUploadDetailComponent implements OnInit {
  leassetsFileUpload: ILeassetsFileUpload | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leassetsFileUpload }) => {
      this.leassetsFileUpload = leassetsFileUpload;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
