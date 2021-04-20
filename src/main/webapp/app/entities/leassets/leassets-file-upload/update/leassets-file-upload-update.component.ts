import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILeassetsFileUpload, LeassetsFileUpload } from '../leassets-file-upload.model';
import { LeassetsFileUploadService } from '../service/leassets-file-upload.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'gha-leassets-file-upload-update',
  templateUrl: './leassets-file-upload-update.component.html',
})
export class LeassetsFileUploadUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    fileName: [null, [Validators.required]],
    periodFrom: [],
    periodTo: [],
    leassetsFileTypeId: [null, [Validators.required]],
    dataFile: [null, [Validators.required]],
    dataFileContentType: [],
    uploadSuccessful: [],
    uploadProcessed: [],
    uploadToken: [null, []],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected leassetsFileUploadService: LeassetsFileUploadService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leassetsFileUpload }) => {
      this.updateForm(leassetsFileUpload);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('leassetsClientApp.error', { message: err.message })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leassetsFileUpload = this.createFromForm();
    if (leassetsFileUpload.id !== undefined) {
      this.subscribeToSaveResponse(this.leassetsFileUploadService.update(leassetsFileUpload));
    } else {
      this.subscribeToSaveResponse(this.leassetsFileUploadService.create(leassetsFileUpload));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeassetsFileUpload>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(leassetsFileUpload: ILeassetsFileUpload): void {
    this.editForm.patchValue({
      id: leassetsFileUpload.id,
      description: leassetsFileUpload.description,
      fileName: leassetsFileUpload.fileName,
      periodFrom: leassetsFileUpload.periodFrom,
      periodTo: leassetsFileUpload.periodTo,
      leassetsFileTypeId: leassetsFileUpload.leassetsFileTypeId,
      dataFile: leassetsFileUpload.dataFile,
      dataFileContentType: leassetsFileUpload.dataFileContentType,
      uploadSuccessful: leassetsFileUpload.uploadSuccessful,
      uploadProcessed: leassetsFileUpload.uploadProcessed,
      uploadToken: leassetsFileUpload.uploadToken,
    });
  }

  protected createFromForm(): ILeassetsFileUpload {
    return {
      ...new LeassetsFileUpload(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      fileName: this.editForm.get(['fileName'])!.value,
      periodFrom: this.editForm.get(['periodFrom'])!.value,
      periodTo: this.editForm.get(['periodTo'])!.value,
      leassetsFileTypeId: this.editForm.get(['leassetsFileTypeId'])!.value,
      dataFileContentType: this.editForm.get(['dataFileContentType'])!.value,
      dataFile: this.editForm.get(['dataFile'])!.value,
      uploadSuccessful: this.editForm.get(['uploadSuccessful'])!.value,
      uploadProcessed: this.editForm.get(['uploadProcessed'])!.value,
      uploadToken: this.editForm.get(['uploadToken'])!.value,
    };
  }
}
