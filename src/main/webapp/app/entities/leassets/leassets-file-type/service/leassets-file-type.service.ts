import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILeassetsFileType, getLeassetsFileTypeIdentifier } from '../leassets-file-type.model';

export type EntityResponseType = HttpResponse<ILeassetsFileType>;
export type EntityArrayResponseType = HttpResponse<ILeassetsFileType[]>;

@Injectable({ providedIn: 'root' })
export class LeassetsFileTypeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/leassets-file-types');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(leassetsFileType: ILeassetsFileType): Observable<EntityResponseType> {
    return this.http.post<ILeassetsFileType>(this.resourceUrl, leassetsFileType, { observe: 'response' });
  }

  update(leassetsFileType: ILeassetsFileType): Observable<EntityResponseType> {
    return this.http.put<ILeassetsFileType>(
      `${this.resourceUrl}/${getLeassetsFileTypeIdentifier(leassetsFileType) as number}`,
      leassetsFileType,
      { observe: 'response' }
    );
  }

  partialUpdate(leassetsFileType: ILeassetsFileType): Observable<EntityResponseType> {
    return this.http.patch<ILeassetsFileType>(
      `${this.resourceUrl}/${getLeassetsFileTypeIdentifier(leassetsFileType) as number}`,
      leassetsFileType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILeassetsFileType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILeassetsFileType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLeassetsFileTypeToCollectionIfMissing(
    leassetsFileTypeCollection: ILeassetsFileType[],
    ...leassetsFileTypesToCheck: (ILeassetsFileType | null | undefined)[]
  ): ILeassetsFileType[] {
    const leassetsFileTypes: ILeassetsFileType[] = leassetsFileTypesToCheck.filter(isPresent);
    if (leassetsFileTypes.length > 0) {
      const leassetsFileTypeCollectionIdentifiers = leassetsFileTypeCollection.map(
        leassetsFileTypeItem => getLeassetsFileTypeIdentifier(leassetsFileTypeItem)!
      );
      const leassetsFileTypesToAdd = leassetsFileTypes.filter(leassetsFileTypeItem => {
        const leassetsFileTypeIdentifier = getLeassetsFileTypeIdentifier(leassetsFileTypeItem);
        if (leassetsFileTypeIdentifier == null || leassetsFileTypeCollectionIdentifiers.includes(leassetsFileTypeIdentifier)) {
          return false;
        }
        leassetsFileTypeCollectionIdentifiers.push(leassetsFileTypeIdentifier);
        return true;
      });
      return [...leassetsFileTypesToAdd, ...leassetsFileTypeCollection];
    }
    return leassetsFileTypeCollection;
  }
}
