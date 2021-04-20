import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILeassetsFileType } from '../leassets-file-type.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'gha-leassets-file-type-detail',
  templateUrl: './leassets-file-type-detail.component.html',
})
export class LeassetsFileTypeDetailComponent implements OnInit {
  leassetsFileType: ILeassetsFileType | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leassetsFileType }) => {
      this.leassetsFileType = leassetsFileType;
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
