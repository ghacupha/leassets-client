import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILeassetsFileUpload, getLeassetsFileUploadIdentifier } from '../leassets-file-upload.model';

export type EntityResponseType = HttpResponse<ILeassetsFileUpload>;
export type EntityArrayResponseType = HttpResponse<ILeassetsFileUpload[]>;

@Injectable({ providedIn: 'root' })
export class LeassetsFileUploadService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/app/file-uploads');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(leassetsFileUpload: ILeassetsFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leassetsFileUpload);
    return this.http
      .post<ILeassetsFileUpload>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(leassetsFileUpload: ILeassetsFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leassetsFileUpload);
    return this.http
      .put<ILeassetsFileUpload>(`${this.resourceUrl}/${getLeassetsFileUploadIdentifier(leassetsFileUpload) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(leassetsFileUpload: ILeassetsFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leassetsFileUpload);
    return this.http
      .patch<ILeassetsFileUpload>(`${this.resourceUrl}/${getLeassetsFileUploadIdentifier(leassetsFileUpload) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILeassetsFileUpload>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILeassetsFileUpload[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLeassetsFileUploadToCollectionIfMissing(
    leassetsFileUploadCollection: ILeassetsFileUpload[],
    ...leassetsFileUploadsToCheck: (ILeassetsFileUpload | null | undefined)[]
  ): ILeassetsFileUpload[] {
    const leassetsFileUploads: ILeassetsFileUpload[] = leassetsFileUploadsToCheck.filter(isPresent);
    if (leassetsFileUploads.length > 0) {
      const leassetsFileUploadCollectionIdentifiers = leassetsFileUploadCollection.map(
        leassetsFileUploadItem => getLeassetsFileUploadIdentifier(leassetsFileUploadItem)!
      );
      const leassetsFileUploadsToAdd = leassetsFileUploads.filter(leassetsFileUploadItem => {
        const leassetsFileUploadIdentifier = getLeassetsFileUploadIdentifier(leassetsFileUploadItem);
        if (leassetsFileUploadIdentifier == null || leassetsFileUploadCollectionIdentifiers.includes(leassetsFileUploadIdentifier)) {
          return false;
        }
        leassetsFileUploadCollectionIdentifiers.push(leassetsFileUploadIdentifier);
        return true;
      });
      return [...leassetsFileUploadsToAdd, ...leassetsFileUploadCollection];
    }
    return leassetsFileUploadCollection;
  }

  protected convertDateFromClient(leassetsFileUpload: ILeassetsFileUpload): ILeassetsFileUpload {
    return Object.assign({}, leassetsFileUpload, {
      periodFrom: leassetsFileUpload.periodFrom?.isValid() ? leassetsFileUpload.periodFrom.format(DATE_FORMAT) : undefined,
      periodTo: leassetsFileUpload.periodTo?.isValid() ? leassetsFileUpload.periodTo.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.periodFrom = res.body.periodFrom ? dayjs(res.body.periodFrom) : undefined;
      res.body.periodTo = res.body.periodTo ? dayjs(res.body.periodTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((leassetsFileUpload: ILeassetsFileUpload) => {
        leassetsFileUpload.periodFrom = leassetsFileUpload.periodFrom ? dayjs(leassetsFileUpload.periodFrom) : undefined;
        leassetsFileUpload.periodTo = leassetsFileUpload.periodTo ? dayjs(leassetsFileUpload.periodTo) : undefined;
      });
    }
    return res;
  }
}
