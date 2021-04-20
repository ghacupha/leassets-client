import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILeassetsFileType, LeassetsFileType } from '../leassets-file-type.model';
import { LeassetsFileTypeService } from '../service/leassets-file-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'gha-leassets-file-type-update',
  templateUrl: './leassets-file-type-update.component.html',
})
export class LeassetsFileTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    leassetsFileTypeName: [null, [Validators.required]],
    leassetsFileMediumType: [null, [Validators.required]],
    description: [],
    fileTemplate: [],
    fileTemplateContentType: [],
    leassetsfileType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected leassetsFileTypeService: LeassetsFileTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leassetsFileType }) => {
      this.updateForm(leassetsFileType);
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
    const leassetsFileType = this.createFromForm();
    if (leassetsFileType.id !== undefined) {
      this.subscribeToSaveResponse(this.leassetsFileTypeService.update(leassetsFileType));
    } else {
      this.subscribeToSaveResponse(this.leassetsFileTypeService.create(leassetsFileType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeassetsFileType>>): void {
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

  protected updateForm(leassetsFileType: ILeassetsFileType): void {
    this.editForm.patchValue({
      id: leassetsFileType.id,
      leassetsFileTypeName: leassetsFileType.leassetsFileTypeName,
      leassetsFileMediumType: leassetsFileType.leassetsFileMediumType,
      description: leassetsFileType.description,
      fileTemplate: leassetsFileType.fileTemplate,
      fileTemplateContentType: leassetsFileType.fileTemplateContentType,
      leassetsfileType: leassetsFileType.leassetsfileType,
    });
  }

  protected createFromForm(): ILeassetsFileType {
    return {
      ...new LeassetsFileType(),
      id: this.editForm.get(['id'])!.value,
      leassetsFileTypeName: this.editForm.get(['leassetsFileTypeName'])!.value,
      leassetsFileMediumType: this.editForm.get(['leassetsFileMediumType'])!.value,
      description: this.editForm.get(['description'])!.value,
      fileTemplateContentType: this.editForm.get(['fileTemplateContentType'])!.value,
      fileTemplate: this.editForm.get(['fileTemplate'])!.value,
      leassetsfileType: this.editForm.get(['leassetsfileType'])!.value,
    };
  }
}
