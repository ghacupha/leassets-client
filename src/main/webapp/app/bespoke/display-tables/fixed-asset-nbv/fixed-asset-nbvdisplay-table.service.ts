import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Observable } from 'rxjs';
import { NBVSummary } from 'app/bespoke/display-tables/fixed-asset-nbv/inbvsummary.model';

export type EntityResponseType = HttpResponse<NBVSummary>;
export type EntityArrayResponseType = HttpResponse<NBVSummary[]>;

@Injectable({
  providedIn: 'root',
})
export class FixedAssetNBVDisplayTableService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset-net-book-values');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<NBVSummary[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
